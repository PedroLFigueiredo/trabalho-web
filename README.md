# Relatório de Entrega – Projeto OldVillage

**Grupo:**  
- Adhemar Molon Neto (14687681)
- Pedro Lucas Figueiredo Bahiense (14675458)

---

## 1) Requisitos do Enunciado e Status de Implementação

- **Dois tipos de usuários: Clientes e Administradores**  
  - ✅ **Clientes:** telas de login (`login.html`) e cadastro (`cadastro.html`) implementadas em HTML/CSS.  
  - ✅ **Administradores:** painel administrativo (`PainelAdmin.html`) implementado em HTML/CSS (dashboard estático).

- **Administração de registros (admins, clientes, produtos/serviços)**  
  - ✅ Dashboard de métricas no painel admin.  
  - ✅ Mockups estáticos para CRUD de clientes e produtos (`CRUDimage.png`), conforme permitido.

- **Fluxo de compra (catálogo → detalhe → carrinho → pagamento)**  
  - ✅ Catálogo de produtos (`paginaProdutos.html`), detalhe (`DetalhesProduto.html`) e carrinho (`CarrinhoDecompras.html`) em HTML/CSS.  
  - ✅ Mockup estático da tela de pagamento (`TelaPagamento.png`), conforme enunciado.

- **Campos mínimos nos registros**  
  - **Administrador:** ícone e nome exibidos no painel.  
  - **Cliente:** formulário de cadastro com nome, sobrenome, endereço e e-mail (senha e confirmação).  
  - **Produto/Serviço:** nome, foto, descrição e preço nas páginas; estatísticas de estoque no painel.

- **Pagamento via cartão e atualização de estoque**  
  - ✅ Fluxo ilustrado estaticamente nos mockups.

- **Funcionalidade adicional**  
  - ✅ Não implementada (opcional, não obrigatória).

- **Acessibilidade e responsividade**  
  - ✅ HTML5 semântico e atributos `alt` em imagens.  
  - ✅ Layout responsivo básico sem media-queries específicas (atende ao escopo).

- **Mockups estáticos**  
  - ✅ Telas principais e pelo menos duas adicionais em HTML/CSS.  
  - ✅ Demais telas fornecidas como imagens estáticas.

---


## 2) Descrição do Projeto

Nesta seção explicamos como cada requisito do enunciado foi atendido no nosso projeto:

1. **Dois tipos de usuários (Clientes e Administradores)**  
   - **Clientes**: telas de **login** (`login.html`) e **cadastro** (`cadastro.html`) implementadas em HTML/CSS.  
   - **Administradores**: painel administrativo (`PainelAdmin.html`) implementado em HTML/CSS como mockup estático.

2. **Administração de registros**  
   - No **Painel Admin** há um mockup estático para CRUD de clientes e produtos (`CRUDimage.png`), com botões “Adicionar”, “Editar” e “Excluir”.  
   - Todos os elementos (tabelas, botões e formulários) estão prontos em HTML/CSS para futura integração.

3. **Fluxo de compra (catálogo → detalhe → carrinho → pagamento)**  
   - **Catálogo** (`paginaProdutos.html`): cards com foto, nome e preço de carros clássicos.  
   - **Detalhes** (`DetalhesProduto.html`): descrição, seleção de quantidade e botão “Adicionar ao Carrinho”.  
   - **Carrinho** (`CarrinhoDecompras.html`): tabela de itens, quantidades, preços e total, com botão “Finalizar Compra”.  
   - **Pagamento**: mockup estático em `TelaPagamento.png`, mostrando campos de cartão (número, validade, CVV) e botão “Realizar Pagamento”.

4. **Campos mínimos nos registros**  
   - **Administrador**: ícone e nome exibidos no painel.  
   - **Cliente**: formulário com nome, sobrenome, endereço, e-mail, senha e confirmação de senha.  
   - **Produto/Serviço**: nome, foto, descrição e preço aparecem nas páginas; métricas de estoque são exibidas no painel.

5. **Pagamento e atualização de estoque**  
   - O fluxo de pagamento é ilustrado estaticamente (aceita qualquer número de cartão).  
   - A lógica de subtração de estoque e esvaziamento de carrinho está documentada no relatório para implementação futura.

6. **Funcionalidade adicional**  
   - Não implementada (opcional, não obrigatória).

7. **Acessibilidade e responsividade**  
   - Uso de HTML5 semântico, atributos `alt` em imagens e CSS que se adapta a diferentes larguras de tela.

---

## 6) Build Procedures

1. **Primeiramente, recomendo que utilize o VSCode como editor de código, para facilitar a utilização**
   No Windows:
Baixar o instalador em: https://code.visualstudio.com/
Executar o instalador e seguir o processo de instalação padrão.

No Linux (Ubuntu/Debian):
`sudo apt update`


Segue o diagrama de navegação que reúne, de forma clara, o fluxo do cliente (Home → Loja → Detalhes → Carrinho → Pagamento) e do administrador (Login → Dashboard → CRUD).

[Diagrama no figma](https://www.figma.com/board/pZDPqv7UvFYghKqv8pcshm/Welcome-to-FigJam?node-id=0-1&t=n6sKGRS8saUAXC7s-1)
