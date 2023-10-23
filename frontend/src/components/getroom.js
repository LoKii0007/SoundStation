import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateRoomPage from "./createroompage";
import toast from "react-hot-toast";

export default function Getroom(props) {

  const navigate = useNavigate();
  const params = useParams();
  const [showSettings, setShowSettings] = useState(false)
  const [text, setText] = useState("Room settings")
  const [spotifyAuth, setSpotifyAuth] = useState(false)

  const [info, setinfo] = useState({
    votesToSkip: 0,
    guestCanPause: false,
    isHost: true,
  });

  const GetRoomDetails = useCallback( async () => {
    try {
      const response = await fetch(
        `/api/get-room?code=${params.roomCode}`
      );
      console.log(response);

      if (!response.ok) {
        props.leaveroomcallback();
        navigate("/");
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      setinfo({
        votesToSkip: data.votesToSkip,
        guestCanPause: data.guestCanPause,
        isHost: data.is_host,
      });

      if(info.isHost){
      authenticateSpotify()
      }

    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  })

  useEffect(() => {
    GetRoomDetails()
  }, [params.roomCode, props.leaveroomcallback]);

  
  const handleUpdateRoom= ()=>{
    GetRoomDetails()
  }


  const handleLeaveRoom = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "content-Type": "application/json" },
    };

    try {
      await fetch("/api/leave-room", requestOptions);
      props.leaveroomcallback();
      navigate("/");
      toast.success("Left room")
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  }


  const handleRoomSettings =()=>{
    if(text == "Room settings"){
      setShowSettings(true)
      setText("Back")
    }
    if(text=="Back"){
      setShowSettings(false)
      setText("Room settings")
    }
  }


  const authenticateSpotify = async() => {
    const  response = await fetch('/spotify/is-authenticated')
    const data = await response.json()
    console.log("response = ",data.status)
    setSpotifyAuth(data.status)

    if(!data.status){
      const response = await fetch("/spotify/get-auth-url")
      const data = await response.json()
      console.log("url = ", data.url)
      window.location.replace(data.url)
  }
  }


  return (
    <>
      <div className="container">
        <h1>Room created</h1>
        <h3>Room code : {params.roomCode}</h3>
        <p>Votes: {info.votesToSkip}</p>
        <p>Guest Can Pause: {info.guestCanPause.toString()}</p>
        <p>Host: {info.isHost.toString()}</p>
        <button onClick={handleLeaveRoom} className="btn btn-danger">
          leave room
        </button>
        {showSettings && (<CreateRoomPage title="Room settings" buttonText="Update room" roomCode={params.roomCode} onUpdateRoom={handleUpdateRoom} />) }
        <button className="btn btn-primary mx-3" onClick={handleRoomSettings}  disabled={info.isHost===false}>{text}</button>
        
      </div>
    </>
  );
}
