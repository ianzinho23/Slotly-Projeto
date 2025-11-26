import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold" style={{color:'#FF7A59'}}>Slotly</div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link to="/agendamentos" className="hover:text-gray-900">Agendamentos</Link>
            <Link to="/empresas" className="hover:text-gray-900">Empresas</Link>
            <Link to="/contato" className="hover:text-gray-900">Contatos</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 border rounded-full text-sm">Entrar Na Conta</Link>
          <Link to="/login" className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm">Cadastre-se</Link>
        </div>
      </div>
    </header>
  );
}
