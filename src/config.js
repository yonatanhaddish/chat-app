// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvator from "./component/BotAvator/BotAvator";

const config = {
  initialMessages: [createChatBotMessage(`Hello world`)],
  botName: "Lion Bot",
  customComponents: {
    botAvatar: (props) => <BotAvator {...props} />,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "red",
    },
    chatButton: {
      backgroundColor: "green",
    },
  },
  state: {
    moviesList: ["The lion King", "Spiderman", "Avengers"],
  },
};
export default config;
