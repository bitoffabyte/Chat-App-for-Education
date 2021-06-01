import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "../../config";
import AddBox from "./AddBox";
import "./AddStudenBox.css";
const AddStudenBox = ({ add, classes, remove }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [up, setUp] = useState(true);
  useEffect(async () => {
    db.collection("Users")
      .get()
      .then((i) => {
        i.docs.map((ii) => {
          // return ii.data();
          // console.log(users);
          let b = true;
          users.map((i) => {
            if (i.email === ii.data().email) {
              b = false;
            }
          });
          if (b) {
            setUsers((p) => [...p, ii.data()]);
          }
        });
      });
  }, [up]);
  return (
    <div className="bbox">
      <div className="toopBar">
        <TextField
          id="standard-basic"
          label="Reg No"
          variant="filled"
          className="ssearchBar"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="opt">
        {users.map((i) => {
          if (!i.isTeacher)
            return (
              <AddBox
                remove={remove}
                setUp={setUp}
                add={add}
                classes={classes}
                us={i}
                search={search}
              />
            );
        })}
      </div>
    </div>
  );
};

export default AddStudenBox;
