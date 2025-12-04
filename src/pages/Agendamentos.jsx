import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function Agendamentos() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { success } = useNotification();
  const [bookings, setBookings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupBooking, setPopupBooking] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Se for empresa, vai para MinhaEmpresa
    if (user?.role === "empresa") {
      navigate("/minha-empresa");
      return;
    }

    const raw = localStorage.getItem("slotly_bookings");
    const parsedBookings = raw ? JSON.parse(raw) : [];
    setBookings(parsedBookings);

    // Mostra popup se há agendamentos e ainda não foi mostrado
    if (parsedBookings.length > 0 && !showPopup) {
      const lastBooking = parsedBookings[parsedBookings.length - 1];
      setPopupBooking(lastBooking);
      setShowPopup(true);
    }
  }, [isAuthenticated, user, navigate]);

  function handleCancel(id) {
    const next = bookings.filter((b) => b.id !== id);
    setBookings(next);
    localStorage.setItem("slotly_bookings", JSON.stringify(next));
  }

  if (!isAuthenticated) {
    return <div className="p-4">Carregando...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 sm:p-6 lg:p-8 rounded-2xl mb-6 sm:mb-8 shadow-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Meus Agendamentos
        </h1>
        <p className="text-slate-200 mt-2 text-sm sm:text-base">
          Acompanhe seus compromissos agendados
        </p>
      </div>

      {showPopup && popupBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <h2 className="text-2xl font-bold">Agendamento Confirmado</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {popupBooking.serviceTitle}
                </h3>
                <p className="text-sm text-gray-700">
                  <strong>Empresa:</strong> {popupBooking.businessName}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Data e Hora:</strong> {popupBooking.dateTime}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Duração:</strong> {popupBooking.duration} minutos
                </p>
                <p className="text-lg font-bold text-emerald-600 mt-3">
                  R$ {popupBooking.price?.toFixed(2) || "0.00"}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Seu agendamento foi confirmado com sucesso! Você receberá um
                lembrete antes do horário.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-700 text-lg font-semibold">
            Nenhum agendamento ainda
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Visite a página de Empresas para agendar um serviço.
          </p>
          <a
            href="/empresas"
            className="inline-block mt-6 bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Ir para Empresas
          </a>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg transition"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    {b.serviceTitle}
                  </h3>
                  <div className="space-y-2 mt-3">
                    <p className="text-sm sm:text-base text-gray-600">
                      <strong>Empresa:</strong> {b.businessName}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      <strong>Horário:</strong> {b.dateTime}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      <strong>Duração:</strong> {b.duration} minutos
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-4 rounded-lg text-center">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Valor do Serviço
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-700 mt-1">
                      R$ {b.price?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-auto flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Confirmado
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCancel(b.id)}
                className="mt-4 w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
              >
                Cancelar Agendamento
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
