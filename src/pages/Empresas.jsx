import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookingModal from "../shared/BookingModal";
import empresasData from "../data/empresas.json";

const Empresas = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleBook = (service, company) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user && user.role === "empresa") {
      alert("Empresas não podem fazer reservas");
      return;
    }
    setSelectedService(service);
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setSelectedCompany(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          Nossas Empresas
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Confira os serviços disponíveis
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {empresasData.map((company) => (
            <div
              key={company._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-32 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold text-center px-4">
                  {company.name}
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">
                  {company.description}
                </p>
                <div className="space-y-3">
                  {company.services.map((service, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {service.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {service.duration} minutos
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-orange-600 font-bold">
                            R$ {service.price.toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleBook(service, company)}
                            className="mt-2 px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
                          >
                            Agendar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
        company={selectedCompany}
      />
    </div>
  );
};

export default Empresas;
