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
  Paper,
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

interface ReceiverProp {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const App = () => {
  const [inbox, setInbox] = useState<InboxProp[]>([]);
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [receiver, setReceiver] = useState<ReceiverProp | null>(null);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");
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

  const handleOnClick = (i: any) => {
    const { participants } = i;
    const receiverObj = participants.find((item: any) => item._id !== userId);

    setReceiver(receiverObj);
    setSelected(i._id);
  };

  const handleOnSubmit = () => {
    try {
      const newMessage = {
        messages: [{ sender: userId, content: value }],
      };

      // setMessages((currentMessages) => {
      //   return {
      //     ...currentMessages,
      //     messages: [...currentMessages, newMessage.messages],
      //   };
      // });

      socket.emit("newMessage", {
        participants: [userId, receiver?._id],
        messages: newMessage.messages,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("messages", messages);

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
                    console.log(participants);
                    return (
                      <>
                        <ListItem>
                          <Button onClick={() => handleOnClick(i)}>
                            {participants.map((user: any, index: any) => (
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
          <Grid item xs={8} style={{ marginTop: 40 }}>
            <Box
              style={{
                backgroundColor: "white",
                height: "100%",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
              }}>
              {messages &&
                messages.map((i, _) => {
                  const { messages } = i;
                  return (
                    <>
                      {messages.map((message: any) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent:
                                userId === message.sender
                                  ? "flex-end"
                                  : "flex-start",
                            }}>
                            <Paper
                              variant="outlined"
                              sx={{
                                p: 1,
                                backgroundColor:
                                  userId === message.sender
                                    ? "#3578E5"
                                    : "#606770",
                                borderRadius: 15,
                                marginTop: 2,
                                color: "white",
                              }}>
                              <Typography variant="body1">
                                {message.content}
                              </Typography>
                            </Paper>
                          </div>
                        );
                      })}
                    </>
                  );
                })}
            </Box>
            <Box
              style={{
                backgroundColor: "white",
                marginTop: 20,
                padding: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}>
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button onClick={handleOnSubmit}>Submit</Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </WebsocketProvider>
  );
};

export default App;
