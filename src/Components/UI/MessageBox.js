import React from "react";
import "./MessageBox.css";
const MessageBox = ({ cont, th }) => {
  console.log(cont);
  return (
    <div className={`msgContainer ${th ? "thh" : ""}`}>
      <div className={`mmssgg ${th ? "th" : ""}`}>
        <div className="msgCon">
          <p style={{ color: "#5F9EA0", fontWeight: "bold" }}>
            {cont.msg.user}
          </p>
          <p>{cont.msg.message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
