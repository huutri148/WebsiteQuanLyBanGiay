import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/chat.css";
import "./App/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoomChat } from "../redux/actions/chatAction";
import * as moment from "moment";

const ENDPOINT = "http://localhost:5000";
function OpenChatBtn(props) {
  const socket = socketIOClient(ENDPOINT);
  const dispatch = useDispatch();
  const messageRef = useRef();
  const inputRef = useRef();
  const { userInfo } = useSelector((state) => state.User);
  const { room } = useSelector((state) => state.Room);
  const [openChat, setOpenChat] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [chatList, setChatList] = useState([]);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userInfoExist, setUserInfoExist] = useState(false);

  useEffect(() => {
    if (userInfo.MaNguoiDung) {
      setUserName(userInfo.TenNguoiDung);
      setUserEmail(userInfo.Email);
      setUserInfoExist(true);
      sessionStorage.removeItem("chat-id");
      sessionStorage.setItem("chat-id", userInfo.MaNguoiDung);
    }
    if (!sessionStorage.getItem("chat-id")) {
      sessionStorage.setItem(
        "chat-id",
        Math.floor(Math.random() * 190000000) + 100000000
      );
    }
    const id = sessionStorage.getItem("chat-id");
    if (id != undefined) dispatch(fetchRoomChat(id));
  }, [userInfo]);

  useEffect(() => {
    if (room.length > 0) setChatList(room);
  }, [room]);

  useEffect(() => {
    socket.emit("join", {
      sessionId: sessionStorage.getItem("chat-id"),
      isAdmin: false,
    });
    socket.on("sendFirstInfo", (data) => {
      if (data.length > 0) setChatList(data[0].chatContent);
    });
    socket.on("thread", (data) => {
      setChatList(data.chatContent);
    });
    socket.on("admin-msg", (data) => {
      setChatList((chatList) => [...chatList, data]);
      setTimeout(() => {
        messageRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  }, []);

  const handleChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };
  const location = props.history.location.pathname;

  const sendFirstChatOnSubmit = (event) => {
    event.preventDefault();
    socket.emit("firstMessage", {
      userInfo: null,
      sessionId: sessionStorage.getItem("chat-id"),
      chatName: userName,
      chatEmail: userEmail,
      chatContent: [
        {
          text: inputValue.chatContent,
          time: new Date(),
        },
      ],
    });
    setChatList((chatList) => [
      ...chatList,
      {
        text: inputValue.chatContent,
        time: new Date(),
      },
    ]);
  };

  const sendChatOnSubmit = (event) => {
    event.preventDefault();
    const today = new Date();
    socket.emit("messageSend", {
      MaPhong: sessionStorage.getItem("chat-id"),
      MessageContent: inputValue.messageSend,
      MessageTime: moment(today).format("DD-MM-YYYY h:mm:ss"),
      IsFromAdmin: false,
    });

    setChatList((chatList) => [
      ...chatList,
      {
        MessageContent: inputValue.messageSend,
        MessageTime: moment(today).format("DD-MM-YYYY h:mm:ss"),
      },
    ]);
    setTimeout(() => {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
    inputRef.current.value = "";
  };

  return (
    <div
      className={
        location === "/admin" || location === "/admin/dashboard"
          ? "chat-btn displayNone"
          : "chat-btn"
      }
      onMouseEnter={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        if (openChat) {
          setOnHover(true);
        } else setOnHover(false);
      }}
    >
      <div
        className={
          onHover ? "chat-btn-container chat-btn-hover" : "chat-btn-container"
        }
        onClick={() => {
          if (messageRef.current)
            messageRef.current.scrollIntoView({ behavior: "smooth" });
          if (openChat) {
            setOpenChat(false);
            setOnHover(false);
          } else {
            setOpenChat(true);
            setOnHover(true);
          }
        }}
      >
        <FontAwesomeIcon icon={faComment} className="icon" />
        <p>Live Chat</p>
      </div>
      <div className={openChat ? "chat-box hide_chat_box" : "chat-box"}>
        <div className="chat-box-header">Live Chat</div>
        {chatList.length === 0 && (
          <div className="chat-box-body">
            {userInfoExist === true && (
              <form
                onSubmit={sendFirstChatOnSubmit}
                className={
                  openChat ? "form-chat hide_chat_box_item" : "form-chat"
                }
              >
                <label>Introduce yourself *</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                  value={userName}
                  placeholder="Name"
                  className="intro"
                  disabled
                ></input>
                <input
                  type="email"
                  onChange={(event) => {
                    setUserEmail(event.target.value);
                  }}
                  value={userEmail}
                  placeholder="Email"
                  className="intro"
                  disabled
                ></input>
                <label>Message *</label>
                <textarea
                  name="chatContent"
                  type="textarea"
                  onChange={handleChange}
                  className="message"
                  required
                ></textarea>
                <button className="btn chat-box-body-btn">Chat</button>
              </form>
            )}
            {userInfoExist === false && (
              <form
                onSubmit={sendFirstChatOnSubmit}
                className={
                  openChat ? "form-chat hide_chat_box_item" : "form-chat"
                }
              >
                <label>Introduce yourself *</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                  value={userName}
                  placeholder="Name"
                  className="intro"
                  required
                ></input>
                <input
                  type="email"
                  onChange={(event) => {
                    setUserEmail(event.target.value);
                  }}
                  value={userEmail}
                  placeholder="Email"
                  className="intro"
                  required
                ></input>
                <label>Message *</label>
                <textarea
                  name="chatContent"
                  type="textarea"
                  onChange={handleChange}
                  className="message"
                  required
                ></textarea>
                <button className="btn chat-box-body-btn">Chat</button>
              </form>
            )}
          </div>
        )}
        {chatList.length > 0 && (
          <div className="chat-box-body no-p">
            <form
              onSubmit={sendChatOnSubmit}
              className={
                openChat ? "form-chat hide_chat_box_item" : "form-chat"
              }
            >
              <div className="flex-col chat-box-list">
                {chatList.map((item, index) => {
                  return (
                    <div key={index} ref={messageRef} className="chat-list">
                      {item.fromAdmin !== true && (
                        <div className="clienttext">
                          <p>{item.MessageContent}</p>
                        </div>
                      )}
                      {item.fromAdmin === true && (
                        <div className="admintext">
                          <p>{item.MessageContent}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex chat-box-send">
                <input
                  name="messageSend"
                  type="text"
                  onChange={handleChange}
                  placeholder="Make a message"
                  ref={inputRef}
                ></input>
                <button className="flex-center sendchat">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(OpenChatBtn);
