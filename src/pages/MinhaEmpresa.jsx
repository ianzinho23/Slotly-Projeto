import React, { useState, useEffect } from "react";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import empresas from "../data/empresas.json";

export default function MinhaEmpresa() {
  const { isLoggedIn, userType, userName, logout } = useAuth();
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [novoServico, setNovoServico] = useState({
    title: "",
    duration: 30,
    price: 0,
  });
  const { success, error, info } = useNotification();

  // Simula encontrar a empresa do usuário
  useEffect(() => {
    if (!isLoggedIn || userType !== "empresa") {
      navigate("/login");
      return;
    }

    // Simula encontrar empresa pelo nome
    const empresaUsuario = empresas[0]; // Simula que o primeiro usuário é dono da primeira empresa
    setEmpresa(empresaUsuario);

    // Carrega serviços do localStorage ou usa os padrão
    const servicosNoLocal = localStorage.getItem(
      `empresa_${empresaUsuario._id}`
    );
    if (servicosNoLocal) {
      const dados = JSON.parse(servicosNoLocal);
      setServicos(dados.services || empresaUsuario.services);
    } else {
      setServicos(empresaUsuario.services || []);
    }
  }, [isLoggedIn, userType, navigate]);

  const handleAddServico = (e) => {
    e.preventDefault();

    if (!novoServico.title || novoServico.price === 0) {
      error("Erro", "Preencha todos os campos!");
      return;
    }

    const servico = {
      _id: `s${Date.now()}`,
      title: novoServico.title,
      duration: parseInt(novoServico.duration),
      price: parseFloat(novoServico.price),
    };

    const novoServicos = [...servicos, servico];
    setServicos(novoServicos);

    // Salva no localStorage com a chave correta para sincronizar com Empresas
    localStorage.setItem(
      `empresa_${empresa._id}`,
      JSON.stringify({
        services: novoServicos,
      })
    );

    setNovoServico({ title: "", duration: 30, price: 0 });
    setShowForm(false);
    success(
      "Serviço adicionado",
      "Serviço adicionado com sucesso! Aparecerá em 'Empresas' em instantes."
    );
  };

  const handleRemoverServico = (id) => {
    if (window.confirm("Tem certeza que deseja remover este serviço?")) {
      const novoServicos = servicos.filter((s) => s._id !== id);
      setServicos(novoServicos);

      // Atualiza localStorage com a chave correta
      localStorage.setItem(
        `empresa_${empresa._id}`,
        JSON.stringify({
          services: novoServicos,
        })
      );
      success("Serviço removido", "O serviço foi removido com sucesso.");
    }
  };

  if (!empresa) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 sm:p-6 lg:p-8 rounded-2xl mb-6 sm:mb-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Painel da Empresa
            </h1>
            <p className="text-slate-200 mt-2 text-base sm:text-lg">
              {empresa.name}
            </p>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Logado como: <span className="font-semibold">{userName}</span>
            </p>
          </div>
          <button
            onClick={logout}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-600 to-slate-700 text-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="text-3xl sm:text-4xl font-bold">
            {servicos.length}
          </div>
          <p className="text-slate-200 mt-2 text-sm sm:text-base">
            Serviços Cadastrados
          </p>
        </div>
        <div className="bg-gradient-to-br from-stone-600 to-stone-700 text-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="text-3xl sm:text-4xl font-bold">
            R$ {servicos.reduce((sum, s) => sum + s.price, 0).toFixed(2)}
          </div>
          <p className="text-stone-200 mt-2 text-sm sm:text-base">
            Valor Total de Serviços
          </p>
        </div>
        <div className="bg-gradient-to-br from-zinc-600 to-zinc-700 text-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="text-2xl sm:text-3xl font-bold break-all">
            {empresa.phone}
          </div>
          <p className="text-zinc-200 mt-2 text-sm sm:text-base">Contato</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Seus Serviços
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base"
          >
            {showForm ? "Cancelar" : "+ Adicionar Serviço"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleAddServico}
            className="bg-slate-50 p-4 sm:p-6 rounded-xl mb-6 border border-slate-200"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Novo Serviço
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Nome do Serviço
                </label>
                <input
                  type="text"
                  value={novoServico.title}
                  onChange={(e) =>
                    setNovoServico({ ...novoServico, title: e.target.value })
                  }
                  placeholder="Ex: Corte Masculino"
                  className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Duração (minutos)
                </label>
                <input
                  type="number"
                  value={novoServico.duration}
                  onChange={(e) =>
                    setNovoServico({
                      ...novoServico,
                      duration: e.target.value,
                    })
                  }
                  min="15"
                  step="15"
                  className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  value={novoServico.price}
                  onChange={(e) =>
                    setNovoServico({ ...novoServico, price: e.target.value })
                  }
                  placeholder="0.00"
                  step="0.01"
                  className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 sm:mt-6 w-full sm:w-auto bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base"
            >
              Adicionar Serviço
            </button>
          </form>
        )}

        <div className="space-y-2 sm:space-y-3">
          {servicos.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm sm:text-base">
              Nenhum serviço cadastrado. Comece adicionando um! 👇
            </p>
          ) : (
            servicos.map((servico) => (
              <div
                key={servico._id}
                className="bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 hover:bg-slate-100 transition"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {servico.title}
                  </h4>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                    {servico.duration} minutos • R$ {servico.price.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoverServico(servico._id)}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
                >
                  Remover
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="font-semibold text-emerald-900 mb-2 text-sm sm:text-base">
          ✅ Como funciona:
        </h3>
        <p className="text-emerald-800 text-xs sm:text-sm">
          Os serviços que você adicionar aqui aparecerão automaticamente na
          página de "Empresas" e estarão disponíveis para que clientes façam
          agendamentos. Recarregue a página de Empresas para ver as alterações.
        </p>
      </div>
    </div>
  );
}
