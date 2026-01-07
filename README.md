# Flexo Tools 2.0 - Calculadora de Metragem

Este projeto é uma modernização da calculadora de metragem para materiais flexíveis, reconstruída do zero utilizando tecnologias modernas de desenvolvimento web.

## Tecnologias Utilizadas

- **React 19**: Biblioteca para interface de usuário moderna e reativa.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática para maior segurança e manutenibilidade.
- **Vite**: Build tool extremamente rápida para desenvolvimento web moderno.
- **Tailwind CSS 4**: Framework CSS utility-first para estilização rápida e responsiva.
- **Vite PWA**: Suporte para Progressive Web App, permitindo instalação no desktop e mobile, além de funcionamento offline.
- **Lucide React**: Biblioteca de ícones moderna e leve.

## Funcionalidades

- Cálculo de metragem para diversos materiais (BOPP, PET, PP, PE).
- Suporte para bobina única ou corte específico.
- Interface responsiva e adaptada para dispositivos móveis.
- Instalação como aplicativo (PWA).
- Validação de formulários e feedback visual.

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Para construir para produção:
   ```bash
   npm run build
   ```

4. Para visualizar a build de produção:
   ```bash
   npm run preview
   ```

## Estrutura do Projeto

- `src/components`: Componentes da interface (Header, Form, Results, etc).
- `src/utils`: Lógica de cálculo e definição de materiais.
- `public`: Assets estáticos (ícones, manifest).

## Materiais Suportados

- BOPP (30µ, 20µ, 17µ, Pérola 22µ)
- PET (12µ)
- PP (Polipropileno)
- PE (Polietileno)
