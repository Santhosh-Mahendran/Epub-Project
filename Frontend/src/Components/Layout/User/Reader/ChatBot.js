import { Card, CardContent, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import "./Reader.css";
import { useDispatch, useSelector } from "react-redux";
import { PostUserQues_Request } from "../../../../Redux/Action/UserAction/ChatAction";

function ChatBot() {
  const [chatBotOpen, setchatBotOpen] = useState(true);
  const [userQuestion, setUserQuestion] = useState("");
  const [QusAsked, setQusAsked] = useState(false);
  const dispatch = useDispatch();
  const { Response } = useSelector((state) => state.ChatBot_Res);
  const [messages, setMessages] = useState([
    { text: "Hello! How may I assist you?", sender: "bot" },
  ]);
  const handleChatOpen = () => {
    setchatBotOpen(!chatBotOpen);
  };
  const handleSendQuestion = () => {
    if (userQuestion) {
      setQusAsked(true);
      setMessages([...messages, { text: userQuestion, sender: "user" }]);
      dispatch(PostUserQues_Request(userQuestion));
      setUserQuestion("");
    }
  };
  useEffect(() => {
    if (Response && Object.keys(Response).length && QusAsked) {
      setMessages([...messages, Response]);
      setQusAsked(false);
    } else {
      return;
    }
  }, [Response]);

  const [position, setPosition] = useState({ x: 50, y: 40 });

  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: window.innerHeight - e.clientY - position.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const newX = window.innerWidth - e.clientX - offset.current.x;
    const newY = window.innerHeight - e.clientY - offset.current.y;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      {chatBotOpen && (
        <div
          style={{
            position: "fixed",
            zIndex: "999999",
            right: "70px",
            bottom: "100px",
          }}
        >
          <Card
            sx={{
              width: "500px",
              height: "400px",
              overflow: "auto",
              backgroundColor: "#f6f6f6",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
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
                className="chats my-3"
                style={{ flexGrow: 1, overflowY: "auto" }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`d-flex ${
                      msg.sender === "user"
                        ? "justify-content-end"
                        : "justify-content-start"
                    } mb-2`}
                  >
                    <div
                      className="text-container"
                      style={{
                        backgroundColor:
                          msg.sender === "user" ? "white" : "#b570ce",
                        color: msg.sender === "user" ? "#000" : "white",
                      }}
                    >
                      <div
                        className={`${
                          msg.sender === "bot" ? "typing-text" : ""
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
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
                  rows={2}
                  variant="standard"
                  onKeyDown={(e) => {                    
                    if (e.key === "Enter") {
                      handleSendQuestion();
                    }
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
        style={{
          position: "fixed",
          bottom: `${position.y}px`,
          right: `${position.x}px`,
          zIndex: 999999,
          cursor: "grab",
        }}
        role="button"
        onClick={handleChatOpen}
        onMouseDown={handleMouseDown}
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
