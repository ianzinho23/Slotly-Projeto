import React, { useEffect, useState } from 'react';

export default function Agendamentos(){
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('slotly_bookings');
    if (raw) setBookings(JSON.parse(raw));
  }, []);

  function handleCancel(id) {
    const next = bookings.filter(b => b.id !== id);
    setBookings(next);
    localStorage.setItem('slotly_bookings', JSON.stringify(next));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Meus Agendamentos</h1>
      {bookings.length===0 && <div className="bg-white p-6 rounded shadow">Você não possui agendamentos.</div>}
      <div className="space-y-4 mt-4">
        {bookings.map(b => (
          <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{b.serviceTitle} • {b.businessName}</div>
              <div className="text-sm text-gray-600">{b.dateTime}</div>
            </div>
            <div>
              <button onClick={()=>handleCancel(b.id)} className="px-3 py-1 border rounded">Cancelar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
