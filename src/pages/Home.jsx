import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [notificacao, setNotificacao] = useState("");

  useEffect(() => {
    const hoje = new Date().toLocaleDateString();
    const ultimaNotificacao = localStorage.getItem("slotly_notificacao");

    // Só aparece 1 vez por dia
    if (ultimaNotificacao !== hoje) {
      const mensagens = [
        "📅 Não esqueça de revisar seus agendamentos de hoje!",
        "✨ Dica do dia: agende seus serviços com antecedência!",
        "⏳ Horários disponíveis atualizados — confira agora!",
        "🔔 Lembrete: melhores horários esgotam rápido. Garanta o seu!",
        "📌 Organização é tudo — veja seus serviços salvos!",
      ];

      const aleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];

      setNotificacao(aleatoria);
      localStorage.setItem("slotly_notificacao", hoje);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {notificacao && (
        <div className="col-span-1 md:col-span-3">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg mb-4 text-center font-medium animate-fade-in text-sm sm:text-base">
            {notificacao}
          </div>
        </div>
      )}
      <div className="col-span-1 md:col-span-2">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-lg sm:text-xl font-bold text-slate-700 flex-shrink-0">
              🔔
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                Notificações Diárias
              </h3>
              <p className="mt-1 sm:mt-2 text-gray-600 text-sm sm:text-base">
                Receba lembretes e notícias importantes sobre seus agendamentos.
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-3 sm:p-4 rounded-lg hover:bg-amber-100 transition">
              <p className="text-xs sm:text-sm text-amber-900 font-medium">
                📅 Não esqueça de revisar seus agendamentos de hoje!
              </p>
            </div>
            <div className="bg-slate-100 border-l-4 border-slate-400 p-3 sm:p-4 rounded-lg hover:bg-slate-200 transition">
              <p className="text-xs sm:text-sm text-slate-900 font-medium">
                ✨ Dica do dia: agende seus serviços com antecedência!
              </p>
            </div>
            <div className="bg-stone-100 border-l-4 border-stone-400 p-3 sm:p-4 rounded-lg hover:bg-stone-200 transition">
              <p className="text-xs sm:text-sm text-stone-900 font-medium">
                ⏳ Horários disponíveis atualizados — confira agora!
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Link
              to="/agendamentos"
              className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-center font-semibold hover:from-slate-700 hover:to-slate-800 transition text-sm sm:text-base"
            >
              📋 Meus Agendamentos
            </Link>
            <Link
              to="/empresas"
              className="flex-1 bg-gradient-to-r from-slate-200 to-slate-300 text-slate-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-center font-semibold hover:from-slate-300 hover:to-slate-400 transition text-sm sm:text-base"
            >
              🔍 Explorar Serviços
            </Link>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition min-h-64 sm:min-h-80 flex flex-col justify-between">
          <div>
            <div className="uppercase text-xs sm:text-sm opacity-70 font-semibold">
              📚 Conheça mais
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mt-2 sm:mt-3">
              Entenda mais sobre quem nós somos
            </h2>
            <p className="mt-3 sm:mt-4 text-slate-200 text-sm sm:text-base">
              Slotly simplifica agendamentos para pequenos negócios.
            </p>
          </div>
          <div className="mt-6">
            <Link
              to="/sobre"
              className="inline-block bg-white text-slate-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-slate-100 transition text-sm sm:text-base"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </div>

      <div className="col-span-1 md:col-span-3 mt-2 sm:mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-slate-600 to-slate-700 text-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
            <div className="text-3xl sm:text-4xl font-bold">8+</div>
            <p className="text-slate-200 mt-2 text-xs sm:text-sm font-medium">
              Empresas Parceiras
            </p>
            <p className="text-slate-300 text-xs mt-1">Melhores serviços</p>
          </div>

          <div className="bg-gradient-to-br from-stone-600 to-stone-700 text-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
            <div className="text-3xl sm:text-4xl font-bold">24/7</div>
            <p className="text-stone-200 mt-2 text-xs sm:text-sm font-medium">
              Disponível
            </p>
            <p className="text-stone-300 text-xs mt-1">Quando quiser</p>
          </div>

          <div className="bg-gradient-to-br from-zinc-600 to-zinc-700 text-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
            <div className="text-3xl sm:text-4xl font-bold">✨</div>
            <p className="text-zinc-200 mt-2 text-xs sm:text-sm font-medium">
              Fácil e Rápido
            </p>
            <p className="text-zinc-300 text-xs mt-1">Poucos cliques</p>
          </div>

          <div className="bg-gradient-to-br from-slate-500 to-slate-600 text-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
            <div className="text-3xl sm:text-4xl font-bold">🎯</div>
            <p className="text-slate-100 mt-2 text-xs sm:text-sm font-medium">
              Organizado
            </p>
            <p className="text-slate-200 text-xs mt-1">Sem conflitos</p>
          </div>
        </div>
      </div>

      <div className="col-span-1 md:col-span-3 mt-4 sm:mt-6">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            Por que escolher o Slotly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-slate-600 text-white font-bold text-sm sm:text-base">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Mais Organização
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Diga adeus aos papéis e mensagens confusas
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-slate-600 text-white font-bold text-sm sm:text-base">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Sem Conflitos
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Sistema inteligente evita agendamentos duplicados
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-slate-600 text-white font-bold text-sm sm:text-base">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Para Todos
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Simples para clientes e poderoso para negócios
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-slate-600 text-white font-bold text-sm sm:text-base">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Tecnologia Eficiente
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Plataforma moderna e responsiva
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/empresas"
              className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-slate-800 hover:to-slate-900 transition text-center text-sm sm:text-base"
            >
              Explorar Empresas
            </Link>
            <Link
              to="/sobre"
              className="flex-1 bg-white text-slate-700 px-6 py-3 rounded-lg font-semibold border-2 border-slate-700 hover:bg-slate-50 transition text-center text-sm sm:text-base"
            >
              Saiba Mais Sobre Nós
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
