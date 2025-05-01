import { Card, CardContent, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import "./Reader.css";
import { useDispatch, useSelector } from "react-redux";
import { PostUserQues_Request } from "../../../../Redux/Action/UserAction/ChatAction";

function ChatBot({ bookId }) {
  const [chatBotOpen, setchatBotOpen] = useState(true);
  const [userQuestion, setUserQuestion] = useState("");
  const [QusAsked, setQusAsked] = useState(false);
  const dispatch = useDispatch();
  const { Response, loading } = useSelector((state) => state.ChatBot_Res);
  const [messages, setMessages] = useState([
    {
      text: "Hello! How may I assist you?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ]);
  const handleChatOpen = () => {
    setchatBotOpen(!chatBotOpen);
  };
  const handleSendQuestion = () => {
    if (userQuestion) {
      setQusAsked(true);
      const timenow = new Date();
      setMessages([
        ...messages,
        {
          text: userQuestion,
          sender: "user",
          timestamp: timenow.toISOString(),
        },
      ]);
      dispatch(
        PostUserQues_Request({ book_id: bookId, question: userQuestion })
      );
      setUserQuestion("");
    }
  };
  useEffect(() => {
    if (Response && Object.keys(Response).length && QusAsked) {
      setMessages([
        ...messages,
        { text: Response, sender: "bot", timestamp: new Date().toISOString() },
      ]);
      setQusAsked(false);
    } else {
      return;
    }
  }, [Response]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // const isDragging = useRef(false);
  // const offset = useRef({ x: 0, y: 0 });

  // const handleMouseDown = (e) => {
  //   isDragging.current = true;
  //   offset.current = {
  //     x: e.clientX - position.x,
  //     y: window.innerHeight - e.clientY - position.y,
  //   };
  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);
  // };

  // const handleMouseMove = (e) => {
  //   if (!isDragging.current) return;

  //   const newX = window.innerWidth - e.clientX - offset.current.x;
  //   const newY = window.innerHeight - e.clientY - offset.current.y;

  //   setPosition({ x: newX, y: newY });
  // };

  // const handleMouseUp = () => {
  //   isDragging.current = false;
  //   document.removeEventListener("mousemove", handleMouseMove);
  //   document.removeEventListener("mouseup", handleMouseUp);
  // };

  return (
    <>
      {chatBotOpen && (
        <div className="chat-bot">
          <Card className="chat-container" sx={{ padding: 0 }}>
            <CardContent
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "0",
                paddingBottom: "0",
              }}
            >
              <div className="chatbot-header d-flex justify-content-between align-items-center">
                <h6
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                  className="mb-0"
                >
                  Chat with Us! 💬 We're Here to Assist You.
                </h6>
                <div
                  role="button"
                  onClick={() => setchatBotOpen(false)}
                  style={{ cursor: "pointer" }}
                >
                  <RxCross2 />
                </div>
              </div>

              <div
                className="chats my-2"
                style={{ flexGrow: 1, overflowY: "auto" }}
              >
                {messages.map((msg, index) => (
                  <div className="row" key={index}>
                    <div className="col-12 mt-2">
                      <div
                        className={`d-inline-block px-2 py-2 ${
                          msg.sender === "user"
                            ? "float-right user-chat-bubble"
                            : "bot-chat-bubble"
                        } `}
                      >
                        <p className="mb-0">{msg.text}</p>
                      </div>
                    </div>
                    <small
                      className="text-muted d-block text-end"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </div>
                ))}
                {loading && (
                  <div className="d-inline-block px-2 py-2 bot-chat-bubble">
                    {" "}
                    <p className="mb-0 typing-text">Typing<span></span></p>
                  </div>
                )}
                <div ref={messagesEndRef}></div>
              </div>
              <div className="notes-field" style={{ marginTop: "auto" }}>
                <TextField
                  id="standard-textarea"
                  fullWidth
                  label="Ask me Your Question..."
                  placeholder="Ask me Your Question..."
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  multiline
                  size="small"
                  rows={1}
                  variant="outlined"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendQuestion();
                    }
                  }}
                  sx={{
                    marginBottom: "7px",
                    marginTop: "7px",
                    backgroundColor: "#fff",
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ cursor: "pointer" }}
                        >
                          <IoSend
                            size={22}
                            style={{ color: "#1d57e5" }}
                            className="me-1"
                            onClick={handleSendQuestion}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div
        className="chat-icon"
        role="button"
        onClick={handleChatOpen}
        // onMouseDown={handleMouseDown}
      >
        <div
          style={{
            backgroundColor: "blue",
            borderRadius: "50%",
            padding: "10px 11px",
          }}
        >
          <IoChatboxOutline size={25} style={{ color: "#fff" }} fill="#fff" />
        </div>
      </div>
    </>
  );
}

export default ChatBot;
