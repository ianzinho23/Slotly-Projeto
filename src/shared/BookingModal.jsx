import React, { useState, useEffect } from "react";
import { format, addMinutes, setHours, startOfDay, isBefore } from "date-fns";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

/**
 * BookingModal simula um fluxo de agendamento:
 * - Permite escolher data (padrão amanhã)
 * - Gera slots entre 9:00 e 18:00 com passo de 30min
 * - Marca como agendado localmente (localStorage)
 */
export default function BookingModal({ business, service, onClose }) {
  const { isLoggedIn, userType } = useAuth();
  const navigate = useNavigate();
  const { success, error, info } = useNotification();
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });
  const [slots, setSlots] = useState([]);
  const [booked, setBooked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("slotly_bookings")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    computeSlots();
  }, [date]);

  function computeSlots() {
    const dayStart = setHours(startOfDay(date), 9);
    const dayEnd = setHours(startOfDay(date), 18);
    const duration = service.duration;
    const temp = [];
    let current = dayStart;
    while (isBefore(addMinutes(current, duration), addMinutes(dayEnd, 1))) {
      temp.push({
        start: new Date(current),
        end: addMinutes(current, duration),
      });
      current = addMinutes(current, 30);
    }
    setSlots(temp);
  }

  function handleBook(slot) {
    // Verifica se o usuário está logado como cliente
    if (!isLoggedIn) {
      info(
        "Login necessário",
        "Você precisa fazer login para agendar um serviço."
      );
      onClose();
      navigate("/login");
      return;
    }

    if (userType !== "cliente") {
      error("Acesso negado", "Apenas clientes podem agendar serviços.");
      return;
    }

    const entry = {
      id: Date.now(),
      businessId: business._id,
      businessName: business.name,
      serviceId: service._id,
      serviceTitle: service.title,
      dateTime: format(slot.start, "dd/MM/yyyy HH:mm"),
    };
    const next = [...booked, entry];
    setBooked(next);
    localStorage.setItem("slotly_bookings", JSON.stringify(next));
    success(
      "Agendamento confirmado",
      `Agendamento confirmado para ${entry.dateTime}`
    );
    onClose();
  }

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Login Necessário
          </h2>
          <p className="text-gray-600 mb-6">
            Para agendar um serviço, você precisa estar logado como cliente.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                onClose();
                navigate("/login");
              }}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Fazer Login
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (userType !== "cliente") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Acesso Negado
          </h2>
          <p className="text-gray-600 mb-6">
            Sua conta é do tipo Empresa. Apenas clientes podem agendar serviços.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">Agendar: {service.title}</h2>
            <div className="text-sm text-gray-600">
              {business.name} • {business.phone}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500">
            Fechar
          </button>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Escolha a data</label>
            <input
              type="date"
              className="border rounded p-2 mt-1"
              value={date.toISOString().slice(0, 10)}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
            <div className="mt-4">
              <h4 className="font-medium mb-2">Horários disponíveis</h4>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((s, i) => {
                  const busy = booked.some(
                    (b) => b.dateTime === format(s.start, "dd/MM/yyyy HH:mm")
                  );
                  const past = isBefore(s.start, new Date());
                  return (
                    <button
                      key={i}
                      disabled={busy || past}
                      onClick={() => handleBook(s)}
                      className={`p-2 rounded text-sm border ${
                        busy
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "hover:bg-primary/10"
                      }`}
                    >
                      {format(s.start, "HH:mm")}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium">Detalhes do serviço</h4>
            <p className="mt-2">{service.title}</p>
            <p className="text-sm text-gray-600">
              Duração: {service.duration} min
            </p>
            <p className="text-sm text-gray-600">Preço: R$ {service.price}</p>

            <div className="mt-6">
              <h5 className="font-medium">Seus agendamentos (simulado)</h5>
              <ul className="mt-2 text-sm">
                {booked.length === 0 && (
                  <li className="text-gray-500">Nenhum agendamento salvo.</li>
                )}
                {booked.map((b) => (
                  <li key={b.id}>
                    {b.dateTime} • {b.serviceTitle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
