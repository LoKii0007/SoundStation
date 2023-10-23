import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function JoinRoomPage(props) {
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    roomCode: "",
    error: "",
  });

  const handleTextFieldChange = async (e) => {
    setInfo({
      roomCode: e.target.value,
    });
  };

  const handleJoinRoomButton = async () => {
    console.log(info.roomCode);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: info.roomCode,
      }),
    };

    const response = await fetch("/api/join-room", requestOptions);

    try {
      if (response.ok) {
        navigate(`/room/${info.roomCode}`);
        toast.success("Room joined successfully")
      } else {
        setInfo({ error: "Room not found." });
        toast.error("Room not found")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="heading text-center m-5">
          <h1>Join a room</h1>
        </div>

        <div className="d-grid gap-2 col-2 mx-auto">
          <div class="mb-3">
            <label for="exampleText1" class="form-label">
              enter room code
            </label>
            <input
              onChange={(e) => handleTextFieldChange(e)}
              value={info.roomCode}
              placeholder="ABCDEF"
              type="text"
              class="form-control"
              id="exampleText1"
            ></input>
          </div>
          <button
            type="button"
            onClick={handleJoinRoomButton}
            className="btn btn-primary"
          >
            Join room
          </button>
          <button type="button" className="btn btn-danger m-4">
            <Link to="/">back</Link>
          </button>
        </div>
      </div>
    </>
  );
}
