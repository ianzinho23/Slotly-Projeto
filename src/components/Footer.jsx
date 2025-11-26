import React from "react";
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-slate-200 mt-8 sm:mt-12 border-t border-slate-700">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h4 className="font-semibold text-white text-sm sm:text-base mb-3">
                Slotly
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Simplificando agendamentos para pequenos negócios.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm sm:text-base mb-3">
                Links
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a
                    href="/"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/empresas"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Empresas
                  </a>
                </li>
                <li>
                  <a
                    href="/sobre"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Sobre
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm sm:text-base mb-3">
                Suporte
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a
                    href="/contato"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Registrar
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm sm:text-base mb-3">
                Redes Sociais
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Em breve mais novidades!
              </p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-400">
            © {new Date().getFullYear()} Slotly. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
