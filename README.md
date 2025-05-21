Copy
Edit
# 👗 Looksy – Moda com Inteligência e Personalização

Looksy é um aplicativo React Native que te ajuda a montar looks personalizados com base no seu estilo, clima, ocasião e preferências. Com uma interface clean, modo escuro, sugestões da IA "Sky", e integração com fotos e categorias, Looksy é sua stylist digital de bolso. 💅✨

---

## 📱 Funcionalidades principais

- 🔐 Login com Google/Facebook (Firebase Auth)
- 📸 Upload de peças com imagem, categoria, subtipo e descrição
- 🧠 Questionário interativo estilo carrossel para mapear seu estilo
- 🧥 Guarda-roupa virtual dividido por tipos de peça
- 🧾 Lista de looks sugeridos e favoritos
- ☀️ Integração com clima e localização para sugestão de looks
- 🌙 Alternância entre tema claro e escuro
- 🔔 Lembretes diários para gerar seu look
- 📊 Integração futura com back-end Flask + SQLite

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase Auth](https://firebase.google.com/)
- [SQLite (via back-end)](https://www.sqlite.org/index.html)
- [React Navigation](https://reactnavigation.org/)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

---

## 🔧 Estrutura de pastas

src/
├── assets/ # Imagens, ícones e ilustrações
├── components/ # Componentes reutilizáveis (NavBar, LookCard, etc.)
├── context/ # ThemeContext (modo claro/escuro)
├── screens/ # Telas principais (Home, Explore, Form, etc.)
├── services/ # Serviços de API (clima, back-end Flask)
└── styles/ # Arquivos de estilos separados

---

## 🚀 Como rodar o projeto

1. Instale as dependências:

<pre>
npm install
</pre>

2. Inicie com Expo:

<pre>
npx expo start
</pre>

Escaneie o QR Code com o app do Expo no seu celular (ou use emulador)

---

🧪 Testes
Testes visuais realizados via Expo Go

Simulações de respostas de IA e clima feitas via dados mockados

📌 Próximos passos
 Integração com API Flask

 Cadastro real de usuários

 Favoritar peças/looks

 Animações de transição

 Histórico de sugestões

---

📝 Licença
Este projeto é para fins acadêmicos e não possui fins comerciais. Sinta-se livre para usar como referência!

---
