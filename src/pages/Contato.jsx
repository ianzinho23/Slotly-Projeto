import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "feedback",
    mensagem: "",
  });
  const [enviado, setEnviado] = useState(false);
  const { success, error, info } = useNotification();

  const assuntos = [
    { value: "feedback", label: "📝 Feedback" },
    { value: "bug", label: "🐛 Reportar Problema" },
    { value: "sugestao", label: "💡 Sugestão" },
    { value: "duvida", label: "❓ Dúvida" },
    { value: "outro", label: "📞 Outro" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.nome || !formData.email || !formData.mensagem) {
      error("Erro", "Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    // Simula envio - armazena no localStorage
    const mensagens = JSON.parse(localStorage.getItem("slotly_feedback")) || [];
    const novaMensagem = {
      id: Date.now(),
      ...formData,
      data: new Date().toLocaleDateString("pt-BR"),
      hora: new Date().toLocaleTimeString("pt-BR"),
    };

    mensagens.push(novaMensagem);
    localStorage.setItem("slotly_feedback", JSON.stringify(mensagens));

    setEnviado(true);
    success("Mensagem enviada", "Recebemos sua mensagem. Obrigado!");
    setTimeout(() => {
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "feedback",
        mensagem: "",
      });
      setEnviado(false);
    }, 3000);
  };

  if (enviado) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-400 rounded-xl p-6 sm:p-8 text-center shadow-lg">
          <div className="text-5xl sm:text-6xl mb-4">✅</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-2">
            Obrigado pelo seu feedback!
          </h2>
          <p className="text-emerald-600 mb-4 text-sm sm:text-base">
            Recebemos sua mensagem com sucesso. Você é muito importante para
            nós! 💚
          </p>
          <p className="text-xs sm:text-sm text-emerald-500">
            Redirecionando em alguns instantes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Card de informações */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-2xl p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Informações
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="text-2xl sm:text-3xl mb-2">📧</div>
                <h3 className="font-semibold text-sm sm:text-base mb-1">
                  E-mail
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">
                  contato@slotly.com
                </p>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl mb-2">📞</div>
                <h3 className="font-semibold text-sm sm:text-base mb-1">
                  Telefone
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">
                  (71) 3333-3333
                </p>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl mb-2">🕐</div>
                <h3 className="font-semibold text-sm sm:text-base mb-1">
                  Horário
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Seg-Sex: 9h às 18h
                </p>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl mb-2">📍</div>
                <h3 className="font-semibold text-sm sm:text-base mb-1">
                  Localização
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Salvador, Bahia
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6 shadow-sm">
            <p className="text-xs sm:text-sm text-amber-800">
              💡 <span className="font-semibold">Dica:</span> Responderemos sua
              mensagem em até 24 horas!
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
              Fale Conosco
            </h1>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Sua opinião é muito importante! Compartilhe seus comentários,
              dúvidas ou sugestões.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Nome */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className="w-full border-2 border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition text-sm"
                />
              </div>

              {/* Email e Telefone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full border-2 border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Telefone (opcional)
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(71) 9999-9999"
                    className="w-full border-2 border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition text-sm"
                  />
                </div>
              </div>

              {/* Assunto */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  Assunto *
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {assuntos.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-2 p-2 sm:p-3 rounded-lg border-2 cursor-pointer transition text-xs sm:text-sm ${
                        formData.assunto === option.value
                          ? "border-slate-600 bg-slate-100"
                          : "border-slate-300 bg-slate-50 hover:border-slate-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="assunto"
                        value={option.value}
                        checked={formData.assunto === option.value}
                        onChange={handleChange}
                        className="w-3 sm:w-4 h-3 sm:h-4 cursor-pointer"
                      />
                      <span className="font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Sua Mensagem *
                </label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem aqui..."
                  rows="5"
                  className="w-full border-2 border-slate-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition resize-none text-sm"
                />
                <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                  {formData.mensagem.length}/500 caracteres
                </p>
              </div>

              {/* Botão Enviar */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-bold py-2 sm:py-3 rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>📤</span> Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
