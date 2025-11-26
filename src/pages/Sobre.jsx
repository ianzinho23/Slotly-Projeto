import React from "react";
export default function Sobre() {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-md">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
        Sobre Slotly
      </h1>

      <p className="mt-4 sm:mt-6 text-gray-700 leading-relaxed text-sm sm:text-base">
        O Slotly nasceu com o propósito de simplificar a forma como pessoas e
        pequenos negócios organizam seus agendamentos. Percebemos que muitos
        estabelecimentos ainda dependem de métodos manuais, como anotações em
        papel ou conversas por mensagens, o que pode gerar atrasos, conflitos de
        horários e até perda de clientes.
      </p>

      <p className="mt-4 sm:mt-6 text-gray-700 leading-relaxed text-sm sm:text-base">
        Pensando nisso, desenvolvemos uma plataforma intuitiva, rápida e
        acessível, onde qualquer usuário pode visualizar serviços, comparar
        opções e agendar horários com poucos cliques. Nossa proposta é oferecer
        uma experiência prática tanto para quem agenda quanto para quem oferece
        serviços.
      </p>

      <div className="mt-6 sm:mt-8 bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 rounded-xl border border-slate-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
          💡 Nosso foco é:
        </h2>
        <ul className="mt-4 sm:mt-6 space-y-3 text-gray-700 text-sm sm:text-base">
          <li className="flex gap-3">
            <span className="font-semibold text-slate-600 flex-shrink-0">
              ✓
            </span>
            <span>Tornar o processo de agendamento mais organizado</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-slate-600 flex-shrink-0">
              ✓
            </span>
            <span>Reduzir falhas e desencontros de horários</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-slate-600 flex-shrink-0">
              ✓
            </span>
            <span>Ajudar pequenos negócios a se digitalizarem</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-slate-600 flex-shrink-0">
              ✓
            </span>
            <span>
              Melhorar a experiência do usuário com tecnologia simples e
              eficiente
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-6 sm:mt-8 border-l-4 border-slate-600 pl-4 sm:pl-6 py-4 bg-slate-50 rounded">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
          📌 Protótipo Funcional
        </h2>
        <p className="mt-3 sm:mt-4 text-gray-700 leading-relaxed text-sm sm:text-base">
          O Slotly foi projetado como um protótipo funcional para demonstrar
          como a tecnologia pode transformar o atendimento e a rotina de
          empreendedores. Acreditamos que soluções digitais devem ser
          acessíveis, objetivas e realmente úteis no dia a dia.
        </p>
      </div>
    </div>
  );
}
