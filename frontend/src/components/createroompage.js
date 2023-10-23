import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/createRoom.css";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

export default function CreateRoomPage(props) {
  const navigate = useNavigate();
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(0);


  const handleVotesChange = (e) => {
    setVotesToSkip(parseInt(e.target.value));
  };


  const handleGuestCanPause = (e) => {
    setGuestCanPause(e.target.value === "false" ? false : true);
  };


  const handleCreateRoomButton = async () => {
    const requestoptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votesToSkip: votesToSkip,
        guestCanPause: guestCanPause,
      }),
    };

    try {
      const response = await fetch("api/create-room", requestoptions);
      if(!response.ok){
        toast.error("error creating room")
      }
      const data = await response.json();
      navigate("/room/" + data.code);
      toast.success("room created successfully")
    } catch (error) {
      console.error("Error:", error);
      toast.error("error creating room")
    }
  };


  const handleUpdateRoom = async () => {
    const requestoptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votesToSkip: votesToSkip,
        guestCanPause: guestCanPause,
        code : props.roomCode
      }),
    };

    try {
      const response = await fetch(`/api/update-room`, requestoptions);
      if (response.ok){
        props.onUpdateRoom()
        toast.success("room updated successfully")

      }
      else{
        toast.error("error updating room")
        console.log("error")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <>
      <div className="container ">
        <div className="heading text-center">
          <h1>{props.title}</h1>
        </div>

        <div className="m-5">
          <div className="text-center">
            <h5>Guest control of playback state</h5>
          </div>

          <div className="d-flex justify-content-center text-center">
            <div className="form-check mx-3">
              <input
                className="form-check-input"
                onChange={(e) => handleGuestCanPause(e)}
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                defaultChecked={!guestCanPause}
                value={false}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                no control
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                onChange={(e) => handleGuestCanPause(e)}
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                defaultChecked={guestCanPause}
                value={true}
              />
              <label className="form-check-label" for="flexRadioDefault2">
                play/pause
              </label>
            </div>
          </div>
        </div>

        <div className="votes m-5">
          <label for="customRange3" className="form-label"></label>
          <input
            onChange={(e) => handleVotesChange(e)}
            value={votesToSkip}
            type="range"
            className="form-range"
            min="0"
            max="20"
            step="1"
            id="customRange3"
          />
          <h5 className="text-center">Select votes to skip : {votesToSkip} </h5>
        </div>

        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            type="button"
            onClick={props.title ==="Create room"? handleCreateRoomButton: handleUpdateRoom}
            // onClick={handleCreateRoomButton}
            className="btn btn-primary"
          >
            {props.buttonText}
          </button>
          {props.title === "Create room" ? (
            <button type="button" className="btn btn-danger">
              <Link to="/">back</Link>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

CreateRoomPage.defaultProps = {
  title: "Create room",
  buttonText: "Create room",
};

CreateRoomPage.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  roomCode: PropTypes.string,
};
