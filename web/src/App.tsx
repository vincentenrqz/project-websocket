import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  socket,
  WebsocketContext,
  WebsocketProvider,
} from "./context/WebsocketContext";

interface UserProp {
  _id: string;
  name: string;
  email: string;
}

interface MessageProp {
  msg: string;
  content: string;
}

const App = () => {
  const [admin, setAdmin] = useState<UserProp | null>(null);
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [value, setValue] = useState("");
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    const id = "661174ffe29edef4616a8872";

    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`);
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAdmin();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to live gateway");
    });

    socket.on("onMessage", (data) => {
      console.log("onMessage Received!");
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      console.log("Unregistered Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  const handleOnSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  };

  return (
    <WebsocketProvider value={socket}>
      <div className="App">
        <h1>Admin</h1>
        <p>
          {admin?.name} - {admin?.email}
        </p>

        <h1>Messages</h1>
        <div>
          {messages.length === 0
            ? "No messages"
            : messages.map((item) => (
                <div>
                  <p>{item.content}</p>
                </div>
              ))}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleOnSubmit}>Submit</button>
      </div>
    </WebsocketProvider>
  );
};

export default App;
