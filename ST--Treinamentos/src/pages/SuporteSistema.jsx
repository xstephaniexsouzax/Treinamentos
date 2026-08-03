import React, { useState } from 'react';
import { mascararData, dataEhValida } from '../hooks/useMascaraData';
import { CHAVES_WEB3FORMS, IMGBB_API_KEY } from '../config/integracoes';

export default function SuporteSistema() {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    produto: '',
    responsavel: '',
    data: '',
    descricao: '',
    printErro: null
  });

  const handleDateChange = (e) => {
    setFormData((prev) => ({ ...prev, data: mascararData(e.target.value) }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.produto || !formData.responsavel || !formData.data || !formData.descricao || !formData.printErro) {
      setStatus('⚠️ Por favor, preencha todos os campos e anexe o print.');
      return;
    }

    if (/\d/.test(formData.nome) || /\d/.test(formData.responsavel)) {
      setStatus('⚠️ O nome completo e o nome do responsável não podem conter números.');
      return;
    }

    if (!dataEhValida(formData.data)) {
      setStatus('⚠️ Digite uma data válida no formato DD/MM/AAAA.');
      return;
    }

    // Roteia para a chave do produto selecionado, igual ao formulário de Contato com o Instrutor.
    const selectedKey = CHAVES_WEB3FORMS[formData.produto];

    if (!selectedKey) {
      setStatus('⚠️ Produto não possui uma chave de e-mail configurada.');
      return;
    }

    if (!IMGBB_API_KEY) {
      setStatus('⚠️ Upload de imagem não configurado. Contate o time técnico.');
      return;
    }

    setIsSubmitting(true);

    try {
      setStatus('⏳ Enviando imagem do print...');

      const imgData = new FormData();
      imgData.append('image', formData.printErro);

      const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: imgData
      });

      const imgResult = await imgResponse.json();

      if (!imgResult.success) {
        setStatus('❌ Falha ao enviar a imagem do print. Tente outro arquivo.');
        return;
      }

      const imageUrl = imgResult.data.url;

      setStatus('⏳ Enviando chamado técnico...');

      const web3Data = new FormData();
      web3Data.append('access_key', selectedKey);
      web3Data.append('subject', `[SUPORTE TÉCNICO] - ${formData.produto} - ${formData.nome}`);
      web3Data.append('from_name', formData.nome);

      web3Data.append('Nome Operador', formData.nome);
      web3Data.append('Produto / Operação', formData.produto);
      web3Data.append('Responsável / Supervisor', formData.responsavel);
      web3Data.append('Data da Ocorrência', formData.data);
      web3Data.append('Descrição da Solicitação', formData.descricao);
      web3Data.append('Print (Link)', imageUrl);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3Data
      });

      const resData = await response.json();

      if (resData.success) {
        setStatus('✅ Chamado de suporte enviado com sucesso!');
        setFormData({
          nome: '',
          produto: '',
          responsavel: '',
          data: '',
          descricao: '',
          printErro: null
        });
        e.target.reset();
      } else {
        setStatus(`❌ ${resData.message || 'Erro ao enviar chamado.'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Falha de conexão ao tentar enviar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/80 antialiased">
      <h2 className="text-2xl font-bold tracking-normal text-slate-800 dark:text-slate-100 flex items-center gap-2">
        🛠️ Suporte Técnico
      </h2>
      <p className="text-sm font-normal text-slate-600 dark:text-slate-300 mt-1 mb-6">
        Relate falhas, dúvidas ou qualquer solicitação técnica sobre a plataforma.
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
            Data da Ocorrência: <span className="text-red-500 font-bold">*</span>
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
            Descrição da Solicitação: <span className="text-red-500 font-bold">*</span>
          </label>
          <textarea
            name="descricao"
            rows="4"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva em detalhes o problema, dúvida ou solicitação..."
            required
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600/80 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            Anexar Print (Obrigatório): <span className="text-red-500 font-bold">*</span>
          </label>
          <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mb-2">
            Pode ser um print do erro, de uma tela com dúvida, ou qualquer imagem relevante para o seu chamado.
          </p>
          <input
            type="file"
            name="printErro"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full p-2 text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand/10 file:text-brand dark:file:bg-brand/20 dark:file:text-brand hover:file:bg-brand/20 transition-all cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full py-3.5 bg-brand hover:opacity-90 disabled:opacity-50 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-sm cursor-pointer"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Chamado Técnico'}
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
