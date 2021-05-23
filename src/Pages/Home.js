import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Sidebar from "../Components/UI/Sidebar";
import db from "../config";
import { useUserContext } from "../Context/UserContext";
import "./Home.css";
import img from "../assets/cl.png";
import imgg from "../assets/sout.png";
import Card from "../Components/UI/Card";
import { Button, Modal } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import Box from "../Components/UI/Box";

const Home = () => {
  const history = useHistory();
  const { loggedInUser, loggedInMail, logout } = useUserContext();
  const [mail, setMail] = useState("");
  const [user, setUser] = useState({});
  const [isTeacher, setIsTeacher] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    if (!loggedInUser) {
      history.push("/");
      return;
    }
    setMail(loggedInMail);
    const unsubscribe = db
      .collection("Users")
      .doc(loggedInMail)
      .get()
      .then((snap) => {
        setUser(snap.data());
        setIsTeacher(user.isTeacher);
        setClasses(user.classes);
      });
    return unsubscribe;
  }, [loggedInUser, user]);

  const addClass = (name) => {
    const id = uuidv4();
    const id1 = uuidv4();
    const id2 = uuidv4();
    const id3 = uuidv4();
    const id4 = uuidv4();
    const classData = {
      id,
      name,
      members: [loggedInMail],
      rooms: [
        {
          name: "General",
          id: id1,
        },
        {
          name: "Doubts",
          id: id2,
        },
        {
          name: "Submissions",
          id: id3,
        },
        {
          name: "Doubts",
          id: id4,
        },
      ],
    };
    db.collection("Classes").doc(id).set(classData);
    db.collection("Users")
      .doc(loggedInMail)
      .update({
        classes: firebase.firestore.FieldValue.arrayUnion({
          id,
          name,
        }),
      });
    db.collection("Messages").doc(id1).set({ messages: [] });
    db.collection("Messages").doc(id2).set({ messages: [] });
    db.collection("Messages").doc(id3).set({ messages: [] });
    db.collection("Messages").doc(id4).set({ messages: [] });

    setOpenModal(false);
  };
  return (
    <div className="home">
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card addClass={addClass}></Card>
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
          <div className="mid">
            <div className="aassdd">
              <img src={img} alt="Class" /> Classes
            </div>
            <br />
            <br />
            <br />
            <div className="aassdd">
              <img src={img} alt="Class" /> Classes
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
      <div className="por">
        <div className="topbar">
          <p className="jj">My Classes</p>
          {isTeacher ? (
            <div className="lll">
              <Button
                className="jc"
                color="secondary"
                onClick={() => setOpenModal(true)}
              >
                Create a class
              </Button>
            </div>
          ) : null}
        </div>
        <div className="mainpor">
          <div className="main">
            {classes
              ? classes.map((i) => {
                  return (
                    <Box
                      key={i.id}
                      onClick={() => {
                        history.push("/class/" + i.id);
                      }}
                    >
                      {i.name}
                    </Box>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
