// MessageParser starter code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("aa")) {
      console.log("hello");
      this.actionProvider.handleReplyBot();
    }
  }
}
export default MessageParser;
