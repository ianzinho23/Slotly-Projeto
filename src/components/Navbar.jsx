import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, userType, userName, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // volta pra home ao sair
  };

  return (
    <nav className="bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4 sm:gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold hover:opacity-80 transition flex items-center gap-2"
        >
          <span>📅</span> Slotly
        </Link>

        {/* Menu */}
        <ul className="hidden lg:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-slate-200 transition">
              Início
            </Link>
          </li>
          <li>
            <Link to="/empresas" className="hover:text-slate-200 transition">
              Empresas
            </Link>
          </li>
          <li>
            <Link
              to="/agendamentos"
              className="hover:text-slate-200 transition"
            >
              Agendamentos
            </Link>
          </li>
          <li>
            <Link to="/sobre" className="hover:text-slate-200 transition">
              Sobre
            </Link>
          </li>
          <li>
            <Link to="/contato" className="hover:text-slate-200 transition">
              Contato
            </Link>
          </li>
        </ul>

        {/* Se NÃO estiver logado */}
        {!isLoggedIn ? (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <Link
              to="/login"
              className="w-full sm:w-auto text-center bg-white text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition"
            >
              Login
            </Link>
            <Link
              to="/cadastro"
              className="w-full sm:w-auto text-center bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg font-semibold transition"
            >
              Cadastre-se
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="bg-slate-600 px-3 sm:px-4 py-2 rounded-lg text-sm w-full sm:w-auto">
              <div className="text-slate-200 text-xs sm:text-sm">
                {userType === "cliente" ? "👤 Cliente" : "🏢 Empresa"}
              </div>
              <div className="text-sm font-semibold truncate">{userName}</div>
            </div>
            {userType === "empresa" && (
              <Link
                to="/minha-empresa"
                className="w-full sm:w-auto text-center bg-slate-600 hover:bg-slate-500 px-3 sm:px-4 py-2 rounded-lg font-semibold transition text-sm"
              >
                Painel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-2 rounded-lg font-semibold transition text-sm"
            >
              Sair
            </button>
          </div>
        )}
      </div>

      {/* Menu Mobile */}
      <div className="lg:hidden border-t border-slate-600 px-4 py-3">
        <ul className="flex flex-wrap gap-3 text-sm">
          <li>
            <Link to="/" className="hover:text-slate-200 transition">
              Início
            </Link>
          </li>
          <li>
            <Link to="/empresas" className="hover:text-slate-200 transition">
              Empresas
            </Link>
          </li>
          <li>
            <Link
              to="/agendamentos"
              className="hover:text-slate-200 transition"
            >
              Agendamentos
            </Link>
          </li>
          <li>
            <Link to="/sobre" className="hover:text-slate-200 transition">
              Sobre
            </Link>
          </li>
          <li>
            <Link to="/contato" className="hover:text-slate-200 transition">
              Contato
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
