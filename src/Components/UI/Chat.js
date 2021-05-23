import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import db from "../../config";
import { useUserContext } from "../../Context/UserContext";
import "./Chat.css";
import firebase from "firebase";
import MessageBox from "./MessageBox";
const Chat = ({ room, setRoom, search }) => {
  const [msg, setMsg] = useState("");
  const [dis, setDis] = useState(true);
  const [messages, setMessages] = useState([]);
  const { loggedInUser, loggedInMail } = useUserContext();
  const ref = useRef();
  useEffect(() => {
    // console.log(room.id);
    const uns = db
      .collection("Messages")
      .doc(room.id)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const msgg = snap.data().messages;
          setMessages(msgg);
        }
        ref.current.scrollIntoView();
      });
    return () => {
      uns();
    };
  }, [room]);
  useEffect(() => {
    if (msg.length > 0) setDis(false);
    else setDis(true);
  }, [msg]);
  const sendMsg = () => {
    const messagee = {
      user: loggedInUser.displayName,
      email: loggedInMail,
      message: msg,
    };
    // console.log(messagee);
    db.collection("Messages")
      .doc(room.id)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          msg: messagee,
        }),
      });
    setMsg("");
  };
  return (
    <div className="chatArea">
      <div className="roomName">{room.name}</div>
      <div className="chat">
        {messages.map((i) => {
          if (i.msg.message.includes(search) || i.msg.user.includes(search))
            return (
              <MessageBox
                cont={i}
                key={i.name}
                th={i.msg.email === loggedInMail}
              />
            );
        })}
        <div ref={ref}></div>
      </div>
      <div className="chatText">
        <TextField
          id="standard-basic"
          label="Message"
          variant="filled"
          className="searchBar"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <Button
          className="btn chatSubmitBtn"
          color="secondary"
          disabled={dis}
          onClick={sendMsg}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
