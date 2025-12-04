import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { success, error } = useNotification();
  const [userType, setUserType] = useState("cliente");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [empresaNome, setEmpresaNome] = useState("");
  const [empresaTelefone, setEmpresaTelefone] = useState("");
  const [empresaDescricao, setEmpresaDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha || !nome) {
      error("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    if (userType === "empresa") {
      if (!empresaNome || !empresaTelefone) {
        error("Erro", "Preencha os dados da empresa!");
        return;
      }
    }

    setLoading(true);

    try {
      const companyData =
        userType === "empresa"
          ? {
              phone: empresaTelefone,
              description: empresaDescricao || "Serviços de qualidade",
            }
          : null;

      const result = await register(nome, email, senha, userType, companyData);

      if (result.success) {
        success(
          "Cadastro concluído",
          `Bem-vindo ${nome}! Seu cadastro foi realizado com sucesso.`
        );

        setTimeout(() => {
          if (userType === "empresa") {
            navigate("/minha-empresa");
          } else {
            navigate("/");
          }
        }, 500);
      } else {
        error("Erro", result.error);
      }
    } catch (err) {
      error("Erro", "Erro ao registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4 sm:px-6 py-6 sm:py-0">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-1 sm:mb-2 text-slate-700">
          Junte-se ao Slotly
        </h2>
        <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          Crie sua conta em segundos
        </p>

        <div className="mb-6 flex gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setUserType("cliente")}
            disabled={loading}
            className={`flex-1 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
              userType === "cliente"
                ? "bg-gradient-to-r from-slate-600 to-slate-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Cliente
          </button>
          <button
            type="button"
            onClick={() => setUserType("empresa")}
            disabled={loading}
            className={`flex-1 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
              userType === "empresa"
                ? "bg-gradient-to-r from-stone-600 to-stone-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Empresa
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Campos comuns */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              {userType === "cliente" ? "Seu Nome" : "Seu Nome Completo"}
            </label>
            <input
              type="text"
              placeholder={userType === "cliente" ? "João Silva" : "João Silva"}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={loading}
              className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={loading}
              className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm disabled:bg-slate-100"
            />
          </div>

          {/* Campos específicos para empresa */}
          {userType === "empresa" && (
            <>
              <div className="border-t border-slate-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                  Dados da Empresa
                </h3>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Barbearia do João"
                  value={empresaNome}
                  onChange={(e) => setEmpresaNome(e.target.value)}
                  disabled={loading}
                  className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 text-sm disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  placeholder="(71) 99999-0000"
                  value={empresaTelefone}
                  onChange={(e) => setEmpresaTelefone(e.target.value)}
                  disabled={loading}
                  className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 text-sm disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Descrição (opcional)
                </label>
                <textarea
                  placeholder="Descreva seu negócio..."
                  value={empresaDescricao}
                  onChange={(e) => setEmpresaDescricao(e.target.value)}
                  disabled={loading}
                  rows="3"
                  className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 resize-none text-sm disabled:bg-slate-100"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-white transition text-sm sm:text-base ${
              userType === "cliente"
                ? "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                : "bg-gradient-to-r from-stone-600 to-stone-700 hover:from-stone-700 hover:to-stone-800"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading
              ? "Criando conta..."
              : `Criar Conta como ${
                  userType === "cliente" ? "Cliente" : "Empresa"
                }`}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs sm:text-sm mt-4 sm:mt-6">
          Já tem conta?{" "}
          <a
            href="/login"
            className="text-slate-700 font-semibold hover:underline"
          >
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
