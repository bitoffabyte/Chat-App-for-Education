import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./AddBox.css";
const AddBox = ({ us, search, add, classes, remove, setUp }) => {
  const [inClass, setInclass] = useState(false);
  useEffect(() => {
    us.classes.map((i) => {
      if (i.id === classes.id) setInclass(true);
    });
  }, []);
  useEffect(() => {
    us.classes.map((i) => {
      if (i.id === classes.id) setInclass(true);
    });
  }, [inClass]);
  if (us.regNo.includes(search))
    return (
      <div className={`bbooxx ${inClass ? "ddd" : ""}`}>
        <div className="hhfh">
          <img src={us.image} className="llkk" alt="Profile" />
          <div className="opop">
            <p className="det">{us.name}</p>
            <p className="det">{us.email}</p>
            <p className="det">{us.regNo}</p>
          </div>
          {!inClass ? (
            <Button
              className="btn asddd addRemoveBtn"
              color="secondary"
              // className=''
              onClick={() => {
                add(us);
                setInclass(true);
                setUp((p) => !p);
              }}
            >
              Add
            </Button>
          ) : (
            <Button
              className="btn asddd addRemoveBtn"
              color="secondary"
              // className=''
              onClick={() => {
                remove(us);
                setInclass(false);
                setUp((p) => !p);
              }}
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    );
  return null;
};

export default AddBox;
