import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MinhaEmpresa = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: "",
    duration: 30,
    price: 0,
  });

  if (!isAuthenticated || user?.role !== "empresa") {
    navigate("/login");
    return null;
  }

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newService.title || !newService.price) {
      alert("Preencha o título e preço");
      return;
    }
    const service = {
      _id: Date.now(),
      ...newService,
      price: parseFloat(newService.price),
    };
    setServices([...services, service]);
    setNewService({ title: "", duration: 30, price: 0 });
    setShowForm(false);
  };

  const handleRemoveService = (id) => {
    setServices(services.filter((s) => s._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Minha Empresa
              </h1>
              <p className="text-gray-600 mt-2">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Meus Serviços</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              {showForm ? "Cancelar" : "+ Adicionar"}
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleAddService}
              className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) =>
                    setNewService({ ...newService, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duração (min)
                  </label>
                  <input
                    type="number"
                    value={newService.duration}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        duration: parseInt(e.target.value),
                      })
                    }
                    min="15"
                    step="15"
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    value={newService.price}
                    onChange={(e) =>
                      setNewService({ ...newService, price: e.target.value })
                    }
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Adicionar Serviço
              </button>
            </form>
          )}

          <div className="space-y-3">
            {services.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhum serviço ainda
              </p>
            ) : (
              services.map((service) => (
                <div
                  key={service._id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {service.duration} min • R$ {service.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveService(service._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Remover
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinhaEmpresa;
