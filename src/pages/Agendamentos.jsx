import React, { useEffect, useState } from "react";
import { bookingsAPI } from "../services/api";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Agendamentos() {
  const { isLoggedIn, userType } = useAuth();
  const navigate = useNavigate();
  const { success, error } = useNotification();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Se for empresa, redireciona para MinhaEmpresa
    if (userType === "empresa") {
      navigate("/minha-empresa");
      return;
    }

    const loadBookings = async () => {
      try {
        setLoading(true);
        const response = await bookingsAPI.getAll();
        setBookings(response.data.bookings || []);
      } catch (err) {
        error("Erro", "Falha ao carregar agendamentos");
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [isLoggedIn, userType, navigate, error]);

  const handleCancelBooking = async (id) => {
    if (window.confirm("Deseja cancelar este agendamento?")) {
      try {
        await bookingsAPI.cancel(id);
        setBookings(bookings.filter((b) => b._id !== id));
        success("Sucesso", "Agendamento cancelado com sucesso");
      } catch (err) {
        const msg =
          err.response?.data?.message || "Erro ao cancelar agendamento";
        error("Erro", msg);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
      </div>
    );
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

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-gray-500 text-lg">Você não possui agendamentos.</p>
          <p className="text-gray-400 text-sm mt-2">
            Visite a página de Empresas para agendar um serviço!
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
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg transition"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    {booking.service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-2">
                    📍 Empresa:{" "}
                    <span className="font-semibold">
                      {booking.company.name}
                    </span>
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    🕐 Horário:{" "}
                    <span className="font-semibold">
                      {new Date(booking.startTime).toLocaleDateString("pt-BR")}{" "}
                      às{" "}
                      {new Date(booking.startTime).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    ⏱️ Duração:{" "}
                    <span className="font-semibold">
                      {booking.service.duration} minutos
                    </span>
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-4 rounded-lg text-center">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Valor do Serviço
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-700 mt-1">
                      R$ {booking.service.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-auto">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status === "confirmed"
                        ? "✓ Confirmado"
                        : booking.status === "completed"
                        ? "✓ Concluído"
                        : "Cancelado"}
                    </span>
                  </div>
                </div>
              </div>

              {booking.status === "confirmed" && (
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="mt-4 w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
                >
                  Cancelar Agendamento
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
