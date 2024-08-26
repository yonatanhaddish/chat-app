// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvator from "./component/BotAvator/BotAvator";
import Todos from "./component/Todos/Todos";

const config = {
  initialMessages: [
    createChatBotMessage(`Hello world`, {
      widget: "todos",
    }),
  ],
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
    todos: [],
  },
  widgets: [
    {
      widgetName: "todos",
      widgetFunc: (props) => <Todos {...props} />,
      mapStateToProps: ["todos"],
    },
  ],
};
export default config;
