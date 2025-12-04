import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const BookingModal = ({ isOpen, onClose, service, company }) => {
  const { user, isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Selecione data e horário");
      return;
    }
    if (!isAuthenticated) {
      alert("Você precisa estar logado");
      return;
    }
    setLoading(true);
    try {
      const booking = {
        id: Date.now(),
        serviceTitle: service.title,
        businessName: company.name,
        duration: service.duration,
        price: service.price,
        dateTime: `${selectedDate} ${selectedTime}`,
        userId: user.id,
      };
      const raw = localStorage.getItem("slotly_bookings");
      const bookings = raw ? JSON.parse(raw) : [];
      bookings.push(booking);
      localStorage.setItem("slotly_bookings", JSON.stringify(bookings));
      alert("Reserva confirmada!");
      setSelectedDate("");
      setSelectedTime("");
      onClose();
    } catch (err) {
      alert("Erro ao criar reserva: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !service || !company) return null;
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-bold">{service.title}</h2>
          <p className="text-sm text-orange-100">{company.name}</p>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Duração:</span>
              <span>{service.duration} min</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Valor:</span>
              <span className="text-orange-600 font-bold">
                R$ {service.price.toFixed(2)}
              </span>
            </div>
          </div>
          <form onSubmit={handleBook} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Data *</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                max={maxDateString}
                disabled={loading}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Horário *
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Selecione um horário</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || !selectedDate || !selectedTime}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? "Reservando..." : "Confirmar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
