import { useState } from "react";
import "./App.css";

const usernames = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const randomUsername =
      usernames[Math.floor(Math.random() * usernames.length)];

    const newMessage = {
      id: crypto.randomUUID(),
      username: randomUsername,
      text: message.trim(),
      likes: 0,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  const likeMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id
          ? { ...msg, likes: msg.likes + 1 }
          : msg
      )
    );
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

              <button
                className="like-button"
                onClick={() => likeMessage(msg.id)}
              >
                ❤️ {msg.likes}
              </button>
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