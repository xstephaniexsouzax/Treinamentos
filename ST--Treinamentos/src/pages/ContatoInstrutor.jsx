import React, { useState } from 'react';
import { mascararData, dataEhValida } from '../hooks/useMascaraData';
import { CHAVES_WEB3FORMS } from '../config/integracoes';

export default function ContatoInstrutor() {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    produto: '',
    responsavel: '',
    data: '',
    duvida: ''
  });

  const handleDateChange = (e) => {
    setFormData((prev) => ({ ...prev, data: mascararData(e.target.value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.produto || !formData.responsavel || !formData.data || !formData.duvida) {
      setStatus('⚠️ Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!dataEhValida(formData.data)) {
      setStatus('⚠️ Digite uma data válida no formato DD/MM/AAAA.');
      return;
    }

    const selectedKey = CHAVES_WEB3FORMS[formData.produto];

    if (!selectedKey) {
      setStatus('⚠️ Produto não possui uma chave de e-mail configurada.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Enviando dúvida...');

    const payload = {
      access_key: selectedKey,
      subject: `[DÚVIDA CONTEÚDO - ${formData.produto}] - ${formData.nome}`,
      from_name: formData.nome,
      'Nome Operador': formData.nome,
      'Produto / Operação': formData.produto,
      'Responsável / Supervisor': formData.responsavel,
      Data: formData.data,
      Dúvida: formData.duvida
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (resData.success) {
        setStatus(`✅ Dúvida enviada com sucesso para a equipe de ${formData.produto}!`);
        setFormData({ nome: '', produto: '', responsavel: '', data: '', duvida: '' });
      } else {
        setStatus(`❌ ${resData.message || 'Ocorreu um erro ao enviar. Tente novamente.'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Falha na conexão ao enviar a dúvida.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/80 antialiased">
      <h2 className="text-2xl font-bold tracking-normal text-slate-800 dark:text-slate-100 flex items-center gap-2">
        🎓 Contato com o Instrutor(a)
      </h2>
      <p className="text-sm font-normal text-slate-600 dark:text-slate-300 mt-1 mb-6">
        Tire suas dúvidas sobre conteúdos das aulas, procedimentos e fluxos operacionais.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            Nome Completo: <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
            required
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600/80 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              Produto / Operação: <span className="text-red-500 font-bold">*</span>
            </label>
            <select
              name="produto"
              value={formData.produto}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600/80 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-sm"
            >
              <option value="" disabled>-- Selecione o Produto --</option>
              <option value="TELEBRAS">TELEBRAS</option>
              <option value="DPE">DPE</option>
              <option value="DETRAN">DETRAN</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              Responsável / Supervisor: <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              name="responsavel"
              value={formData.responsavel}
              onChange={handleChange}
              placeholder="Nome do supervisor"
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600/80 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            Data: <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            name="data"
            value={formData.data}
            onChange={handleDateChange}
            placeholder="DD/MM/AAAA"
            maxLength={10}
            required
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600/80 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            Descreva sua Dúvida: <span className="text-red-500 font-bold">*</span>
          </label>
          <textarea
            name="duvida"
            rows="5"
            value={formData.duvida}
            onChange={handleChange}
            placeholder="Qual dúvida você gostaria de tirar sobre o procedimento ou aula?"
            required
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600/80 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full py-3.5 bg-brand hover:opacity-90 disabled:opacity-50 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-sm cursor-pointer"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Dúvida ao Instrutor'}
        </button>
      </form>

      {status && (
        <div className="mt-4 p-3 rounded-xl text-center font-semibold text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
          {status}
        </div>
      )}
    </div>
  );
}
