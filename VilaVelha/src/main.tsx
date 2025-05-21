// Importa o React (necessário se você for usar hooks ou outras APIs do React neste arquivo)
import React from 'react'

// Importa o ReactDOM para renderizar o app na tela do navegador
import ReactDOM from 'react-dom/client'

// Importa o componente principal da sua aplicação, que contém as rotas e estrutura geral
import App from './App'

// Importa o componente que habilita o sistema de rotas usando URLs reais
import { BrowserRouter } from 'react-router-dom'

import './index.css'


// Cria a "raiz" da aplicação dentro da <div id="root"> que existe no index.html
const root = ReactDOM.createRoot(document.getElementById('root')!)

// Renderiza a aplicação dentro da raiz
root.render(
  <React.StrictMode> {/* Ativa verificações extras no modo de desenvolvimento */}
    <BrowserRouter>   {/* Envolve o App para ativar navegação entre páginas (rotas) */}
      <App />         {/* Renderiza o componente principal da aplicação */}
    </BrowserRouter>
  </React.StrictMode>
)
