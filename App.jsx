import { useState } from "react";
import "./App.css";

const usernames = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const reactionEmojis = ["❤️", "😂", "👍", "😍", "😢", "😮", "😡", "🎉"];

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [openReactionId, setOpenReactionId] = useState(null);

  const sendMessage = () => {
    if (!message.trim()) return;

    const randomUsername =
      usernames[Math.floor(Math.random() * usernames.length)];

    const newMessage = {
      id: crypto.randomUUID(),
      username: randomUsername,
      text: message.trim(),
      reactions: {},
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  const addReaction = (id, emoji) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              reactions: {
                ...msg.reactions,
                [emoji]: (msg.reactions[emoji] || 0) + 1,
              },
            }
          : msg
      )
    );

    setOpenReactionId(null);
  };

  return (
    <div className="chat-app">
      <header className="chat-header">
        <h1>Chat App</h1>
      </header>

      <main className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <h2>Welcome to the Chat</h2>
            <p>Send a message to get started.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div className="message" key={msg.id}>
              <div className="message-content">
                <strong>{msg.username}</strong>
                <p>{msg.text}</p>
              </div>

              <div className="message-actions">
                <button
                  className="reaction-button"
                  onClick={() =>
                    setOpenReactionId(
                      openReactionId === msg.id ? null : msg.id
                    )
                  }
                >
                  😊 React
                </button>

                {openReactionId === msg.id && (
                  <div className="reaction-picker">
                    {reactionEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        className="emoji-option"
                        onClick={() => addReaction(msg.id, emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="reaction-list">
                {Object.entries(msg.reactions).map(([emoji, count]) => (
                  <button
                    key={emoji}
                    className="reaction-count"
                    onClick={() => addReaction(msg.id, emoji)}
                  >
                    {emoji} {count}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
