import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { success, error, info } = useNotification();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [userType, setUserType] = useState("cliente"); // "cliente" ou "empresa"

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação simples
    if (email && senha) {
      const name = email.split("@")[0]; // Usa o nome de usuário do email
      login(userType, name);

      // Redireciona conforme o tipo de usuário
      if (userType === "empresa") {
        navigate("/minha-empresa");
      } else {
        navigate("/");
      }
    } else {
      const { error } = useNotification();
      error("Erro", "Preencha todos os campos!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4 sm:px-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-1 sm:mb-2 text-slate-700">
          Bem-vindo ao Slotly
        </h2>
        <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          Faça login para continuar
        </p>

        {/* Seletor de Tipo de Usuário */}
        <div className="mb-6 flex gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setUserType("cliente")}
            className={`flex-1 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
              userType === "cliente"
                ? "bg-gradient-to-r from-slate-600 to-slate-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            👤 Cliente
          </button>
          <button
            type="button"
            onClick={() => setUserType("empresa")}
            className={`flex-1 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
              userType === "empresa"
                ? "bg-gradient-to-r from-stone-600 to-stone-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            🏢 Empresa
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
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
              className="w-full border border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-white transition text-sm sm:text-base ${
              userType === "cliente"
                ? "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                : "bg-gradient-to-r from-stone-600 to-stone-700 hover:from-stone-700 hover:to-stone-800"
            }`}
          >
            Entrar como {userType === "cliente" ? "Cliente" : "Empresa"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs sm:text-sm mt-4 sm:mt-6">
          Não tem conta?{" "}
          <a
            href="/cadastro"
            className="text-slate-700 font-semibold hover:underline"
          >
            Crie uma agora
          </a>
        </p>
      </div>
    </div>
  );
}
