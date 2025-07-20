# 🧪 Teste Automatizado - Healing App

**Autor:** [@brenorcunha](https://github.com/brenorcunha)  
**Data de criação:** 09/07/2025  
**Descrição:** Projeto de testes automatizados com WebDriverIO para simular o login e navegação em um do sistema de telemedicina, hospedado em [`brenorcunha.pythonanywhere.com`](https://brenorcunha.pythonanywhere.com), gerado a partir do Selenium IDE.

---

## 🚀 Tecnologias utilizadas

- **Node.js v20**
- **WebDriverIO**  
- **Firefox (Geckodriver)**
- **Mocha Framework**
- **expect-webdriverio** (asserções visuais e funcionais)
- **@wdio/firefox-profile-service**

---

## 📂 Estrutura do projeto

TesteAutomatizado/
├── test
└── login.test.js

## Script com 5 execuções de login, navegação e logout

├── wdio.conf.js

## Configuração manual do WebDriverIO

├── package.json
└── README.md

## Documentação do projeto

# 📦 Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

Ou, se estiver comçando do zero:

```bash
npm install --save-dev \
@wdio/cli \
webdriverio \
@wdio/local-runner \
@wdio/mocha-framework \
@wdio/firefox-profile-service \
geckodriver \
expect-webdriverio
```

# ⚙️ Execução dos testes

npm run wdio
OU
npx wdio run wdio.conf.js

# 🤝 Licença

Este projeto está aberto para estudos e aprimoramentos em ambiente de QA. Sinta-se à vontade para contribuir, adaptar ou incluir em pipelines reais.
