import React, { useState } from 'react';

interface FormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const FormAdicionarCarro = ({ onSuccess, onCancel }: FormProps) => {
  const [formData, setFormData] = useState({
    modelo: '',
    ano: new Date().getFullYear(),
    descricao: '',
    descricaoDetalhada: '',
    preco: '',
    estoque: 1,
    seloDilvan: false,
    audio: '',
  });
  const [imagem, setImagem] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, (formData as any)[key]);
    });
    if (imagem) {
      data.append('imagem', imagem);
    }

    try {
      const response = await fetch('http://localhost:3001/api/carros', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Falha ao enviar dados.');
      
      alert('Carro adicionado com sucesso!');
      onSuccess();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#5e3a1f] mb-6">Cadastrar Novo Carro</h2>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          
          {/* --- Campos do Formulário Preenchidos --- */}

          <div>
            <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">Modelo do Veículo</label>
            <input type="text" name="modelo" id="modelo" value={formData.modelo} onChange={handleTextChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="ano" className="block text-sm font-medium text-gray-700">Ano</label>
              <input type="number" name="ano" id="ano" value={formData.ano} onChange={handleTextChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
            </div>
            <div>
              <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
              <input type="number" name="preco" id="preco" step="0.01" value={formData.preco} onChange={handleTextChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
            </div>
            <div>
              <label htmlFor="estoque" className="block text-sm font-medium text-gray-700">Estoque</label>
              <input type="number" name="estoque" id="estoque" value={formData.estoque} onChange={handleTextChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
            </div>
          </div>
          
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição Curta (para o card)</label>
            <textarea name="descricao" id="descricao" value={formData.descricao} onChange={handleTextChange} rows={2} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
          </div>

          <div>
            <label htmlFor="descricaoDetalhada" className="block text-sm font-medium text-gray-700">Descrição Detalhada (para a página do produto)</label>
            <textarea name="descricaoDetalhada" id="descricaoDetalhada" value={formData.descricaoDetalhada} onChange={handleTextChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
          </div>

          <div>
            <label htmlFor="audio" className="block text-sm font-medium text-gray-700">Caminho para o Áudio do Motor (opcional)</label>
            <input type="text" name="audio" id="audio" placeholder="/audio/motor-padrao.mp3" value={formData.audio} onChange={handleTextChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>
          
          <div className="flex items-center pt-2">
            <input type="checkbox" name="seloDilvan" id="seloDilvan" checked={formData.seloDilvan} onChange={handleTextChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
            <label htmlFor="seloDilvan" className="ml-2 block text-sm text-gray-900">Selo Dilvan de Qualidade</label>
          </div>
          
          <div>
            <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">Imagem do Carro</label>
            <input type="file" name="imagem" id="imagem" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
          </div>

          {/* --- Fim dos Campos do Formulário --- */}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="bg-[#3e2f2f] text-white px-4 py-2 rounded-md hover:bg-[#5e3a1f] disabled:bg-gray-400">
              {isLoading ? 'Salvando...' : 'Salvar Carro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAdicionarCarro;