import React, { useState, useEffect } from "react";
import empresas from "../data/empresas.json";
import BookingModal from "../shared/BookingModal";

export default function Empresas() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [empresasComServiços, setEmpresasComServiços] = useState([]);

  // Sincroniza as empresas com os serviços salvos no localStorage
  useEffect(() => {
    const empresasAtualizadas = empresas.map((empresa) => {
      const empresaNoLocal = localStorage.getItem(`empresa_${empresa._id}`);
      if (empresaNoLocal) {
        const dados = JSON.parse(empresaNoLocal);
        return { ...empresa, services: dados.services || empresa.services };
      }
      return empresa;
    });
    setEmpresasComServiços(empresasAtualizadas);
  }, []);

  const empresasFiltradas = empresasComServiços.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gradients = [
    "from-slate-500 to-slate-600",
    "from-stone-500 to-stone-600",
    "from-zinc-500 to-zinc-600",
    "from-slate-600 to-slate-700",
    "from-stone-600 to-stone-700",
    "from-zinc-600 to-zinc-700",
    "from-slate-500 to-slate-600",
    "from-stone-500 to-stone-600",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-8 px-4 sm:px-6 lg:px-8 mb-8 rounded-b-2xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          🏢 Empresas e Serviços
        </h1>
        <p className="text-slate-200 text-sm sm:text-base">
          Descubra os melhores serviços disponíveis perto de você
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Busca */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Pesquisar empresas ou serviços..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 sm:px-6 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-300 transition shadow-sm bg-white text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Grid de Empresas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {empresasFiltradas.map((b, index) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105 transform"
            >
              {/* Header Card */}
              <div
                className={`bg-gradient-to-r ${gradients[index]} h-20 sm:h-24`}
              ></div>

              {/* Conteúdo */}
              <div className="p-4 sm:p-5 -mt-8 sm:-mt-12 relative z-10">
                {/* Empresa Info - Compacto */}
                <div className="mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-white truncate">
                    {b.name}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">📞 {b.phone}</p>
                </div>

                {/* Serviços - Prioridade */}
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-700 text-xs mb-2 flex items-center gap-2">
                    <span>⭐</span> Serviços ({b.services.length})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {b.services.map((s) => (
                      <div
                        key={s._id}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 p-2 rounded-lg border-l-4 border-slate-500 hover:border-slate-700 hover:from-slate-50 hover:to-slate-100 transition"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold text-gray-800 text-xs truncate">
                            {s.title}
                          </div>
                          <div className="text-xs text-slate-600 flex items-center justify-between">
                            <span>
                              ⏱️ {s.duration} min • 💰 R$ {s.price}
                            </span>
                            <button
                              onClick={() => {
                                setSelectedBusiness(b);
                                setSelectedService(s);
                              }}
                              className="ml-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white px-2 py-1 rounded text-xs font-semibold hover:from-slate-700 hover:to-slate-800 transition whitespace-nowrap"
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
            </div>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {empresasFiltradas.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
              Nenhuma empresa encontrada
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Tente pesquisar com outro termo
            </p>
          </div>
        )}
      </div>

      {selectedService && (
        <BookingModal
          business={selectedBusiness}
          service={selectedService}
          onClose={() => {
            setSelectedService(null);
            setSelectedBusiness(null);
          }}
        />
      )}
    </div>
  );
}
