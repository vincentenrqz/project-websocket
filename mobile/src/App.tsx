import React, { useEffect, useState } from "react";
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
  content: {
    tenant: string;
    senderId: string;
    receiverId: string;
    message: string;
  };
}

const App = () => {
  const [user, setUser] = useState<UserProp | null>(null);
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const id = "66138ffa18493ba30b0b6ca0";

    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`);
        setUser(response.data);
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
      if (data.content.receiverId === user?._id) {
        console.log("onMessage Received!");
        setMessages((messages) => [...messages, data]);
      }
    });

    return () => {
      console.log("Unregistered Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, [user]);

  const handleOnSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  };

  console.log(user);

  return (
    <>
      <div className="App">
        <h1>Client</h1>
        <p>
          {user?.name} - {user?.email}
        </p>

        <h1>Messages</h1>
        <div>
          {messages.length === 0
            ? "No messages"
            : messages.map((item, index) => (
                <div key={index}>
                  <p>{item.content.message}</p>
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
    </>
  );
};

export default App;
