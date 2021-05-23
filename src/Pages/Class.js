import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase";
import Sidebar from "../Components/UI/Sidebar";
import db from "../config";
import { useUserContext } from "../Context/UserContext";
import "./Class.css";
import img from "../assets/cl.png";
import imgg from "../assets/sout.png";
import ChatIcon from "@material-ui/icons/Chat";
import ChatScreen from "../Components/Screen/ChatScreen";
import { Button, Card, Modal } from "@material-ui/core";
import AddStudenBox from "../Components/UI/AddStudenBox";
const Class = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const { loggedInUser, loggedInMail, logout } = useUserContext();
  const [disp, setDisp] = useState("");
  const [user, setUser] = useState({});
  const [isTeacher, setIsTeacher] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [name, setName] = useState("");
  const add = (usr) => {
    db.collection("Users")
      .doc(usr.email)
      .update({
        classes: firebase.firestore.FieldValue.arrayUnion({
          id,
          name: classes.name,
        }),
      });
    db.collection("Classes")
      .doc(id)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(usr.email),
      });
  };
  const remove = (usr) => {
    db.collection("Users")
      .doc(usr.email)
      .update({
        classes: firebase.firestore.FieldValue.arrayRemove({
          id,
          name: classes.name,
        }),
      });
    db.collection("Classes")
      .doc(id)
      .update({
        members: firebase.firestore.FieldValue.arrayRemove(usr.email),
      });
  };
  useEffect(() => {
    if (!loggedInUser) {
      history.push("/");
      return;
    }
    setDisp(loggedInUser.photoURL);
    db.collection("Users")
      .doc(loggedInMail)
      .get()
      .then((snap) => {
        setUser(snap.data());
        setClasses(user.classes);
      });
  }, [loggedInUser]);
  useEffect(() => {
    setIsTeacher(user.isTeacher);
  }, [user]);
  useEffect(() => {
    db.collection("Classes")
      .doc(id)
      .get()
      .then((snap) => {
        if (snap.exists) {
          setClasses(snap.data());
          setRooms(snap.data().rooms);
          setSelectedRoom(snap.data().rooms[0]);
        }
      });
  }, []);
  return (
    <div className="home">
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <AddStudenBox add={add} remove={remove} classes={classes} />
      </Modal>
      <Sidebar>
        <div className="sb">
          <div className="div1 userDiv">
            <img src={user.image} alt="User" />
            <div>
              <p className="nameroll">{user.name}</p>
              {isTeacher ? null : <p className="namerolll">{user.regNo}</p>}
            </div>
          </div>
          <div className="middle linksMiddle">
            <div className="lkl">
              {isTeacher ? (
                <Button
                  className="btn"
                  color="secondary"
                  onClick={() => setOpenModal(true)}
                >
                  Add Students
                </Button>
              ) : null}
              {rooms.map((i) => {
                return (
                  <div
                    className="asddd sideLinks"
                    key={i.id}
                    onClick={() => setSelectedRoom(i)}
                  >
                    <ChatIcon className="icons" />
                    <p>{i.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ textAlign: "left", alignItems: "left" }}>
            <img
              src={imgg}
              style={{ cursor: "pointer" }}
              alt="Log out"
              onClick={logout}
            />
          </div>
        </div>
      </Sidebar>
      <ChatScreen room={selectedRoom} setRoom={setSelectedRoom} />
    </div>
  );
};

export default Class;
