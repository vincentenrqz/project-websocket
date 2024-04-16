import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  socket,
  WebsocketContext,
  WebsocketProvider,
} from "./context/WebsocketContext";
import {
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";

interface UserProp {
  _id: string;
  name: string;
  email: string;
}

interface MessageProp {
  _id: string;
  sender: string;
  content: string;
  timestamp: Date;
  createdAt: Date;
  messages: [];
}

interface ConversationProp {
  participants: [];
  messages: [
    {
      sender: string;
      content: string;
    }
  ];
}

interface InboxProp {
  _id: string;
  participants: [];
}

const App = () => {
  const [inbox, setInbox] = useState<InboxProp[]>([]);
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = "661174ffe29edef4616a8872";

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/inboxes/${userId}`
        );
        const data = await response.data;
        setInbox(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInbox();
  }, []);

  // const [user, setUser] = useState<UserProp | null>(null);
  // const [messages, setMessages] = useState<MessageProp[]>([]);
  // const [conversations, setConversations] = useState<ConversationProp[]>([]);
  // const [value, setValue] = useState("");
  // const socket = useContext(WebsocketContext);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to live gateway");
  //   });

  //   socket.on("onMessage", (data: any) => {});

  //   return () => {
  //     console.log("Unregistered Events...");
  //     socket.off("connect");
  //     socket.off("onMessage");
  //   };
  // }, [user]);

  // const handleOnSubmit = () => {
  //   const newMessage = {
  //     messages: [{ sender: user?._id, content: value }],
  //   };
  //   socket.emit("newMessage", {
  //     participants: [user?._id, "661174ffe29edef4616a8872"],
  //     messages: newMessage.messages,
  //   });

  //   setValue("");
  // };

  const handleOnClick = (i: any) => {
    setSelected(i);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (selected) {
          const response = await axios.get(
            `http://localhost:4000/inboxes/messages/${selected}`
          );

          const data = await response.data;
          setMessages(data);
        }
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchMessages();
  }, [selected]);

  return (
    <WebsocketProvider value={socket}>
      <div className="App">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <>
              Inbox
              <List>
                {inbox &&
                  inbox.map((i, _) => {
                    const { participants } = i;
                    return (
                      <>
                        <ListItem>
                          <Button onClick={() => handleOnClick(i._id)}>
                            {participants.map((user: any, _: any) => (
                              <ListItemText>{user.name}</ListItemText>
                            ))}
                          </Button>
                        </ListItem>
                        <Divider
                          variant="middle"
                          component="li"
                          style={{ background: "white" }}
                        />
                      </>
                    );
                  })}
              </List>
            </>
          </Grid>
          <Grid item xs={10}>
            Inbox
            <Box>
              {messages &&
                messages.map((i, _) => {
                  const { messages } = i;
                  return (
                    <Typography variant="caption" display="block" gutterBottom>
                      {messages.map((message: any) => message.content)}
                    </Typography>
                  );
                })}
            </Box>
          </Grid>
        </Grid>
        {/* <h1>Admin</h1>
        <p>
          {user?.name} - {user?.email}
        </p>

        <h1>Messages</h1>
        <div>
          {conversations.length === 0
            ? "No messages"
            : conversations.map((item, index) => {
                const { participants, messages } = item;
                return (
                  <ul key={index}>
                    {messages.map((message, i) => (
                      <li key={i}>{message.content}</li>
                    ))}
                  </ul>
                );
              })}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleOnSubmit}>Submit</button> */}
      </div>
    </WebsocketProvider>
  );
};

export default App;
