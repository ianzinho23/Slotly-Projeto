import React from "react";
import { Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import Notifications from "./components/Notifications";

import Home from "./pages/Home";
import Empresas from "./pages/Empresas";
import Agendamentos from "./pages/Agendamentos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MinhaEmpresa from "./pages/MinhaEmpresa";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <NotificationProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800">
        {/* Navbar no topo */}
        <Navbar />

        {/* Conteúdo principal */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/empresas" element={<Empresas />} />
              <Route path="/agendamentos" element={<Agendamentos />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/minha-empresa" element={<MinhaEmpresa />} />
            </Routes>
          </div>
        </main>

        {/* Rodapé */}
        <Footer />

        {/* Notifications UI (fixed) */}
        <Notifications />
      </div>
    </NotificationProvider>
  );
}
