import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    // console.log(id);
    toast.success("Created new Room");
  };
  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("RoomId and Username Required");
      return;
    }
    navigate(`/editor/${roomId}`, { state: { username } });
  };
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <div className="logo">
          <img
            className="homePageLogo"
            style={{ width: "100px" }}
            src="/logo.png"
            alt="Logo"
          />
          <h1 className="logoName">Collab Code</h1>
        </div>
        <h4 className="mainLable">Paste Room Invitation ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Enter Room Id"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            value={roomId}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="Enter Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <button onClick={joinRoom} className="btn joinBtn">
            Join
          </button>
          <span className="createInfo">
            If you don't have invite create &nbsp;
            <a onClick={createNewRoom} href="/" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
