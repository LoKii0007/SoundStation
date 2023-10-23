import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './hompage'
import CreateRoomPage from './createroompage'
import JoinRoomPage from './joinRoomPage'
import GetRoom from './getroom'
import {Toaster} from 'react-hot-toast'

export default function App() {

  const [details, setDetails] = useState({
    roomCode: null
  })

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("/api/user-in-room")
        const data = await response.json()
        setDetails({
          roomCode: data.code
        })
      }
      catch (error) {
        console.log("error fetching data", error)
      }
    }

    fetchdata()

  },[])

  const clearRoomCode = ()=>{
    setDetails({roomCode:null})
  }

  return (
    <Router>

      <Routes>

        <Route exact path='' element={
          details.roomCode ? (<Navigate to={`room/${details.roomCode}`} />) : (<Homepage />)
        } />

        <Route exact path='/create' element={<CreateRoomPage />} />
        <Route exact path='/join' element={<JoinRoomPage />} />
        <Route exact path='/room/:roomCode' element={<GetRoom leaveroomcallback={clearRoomCode} />} />
        
      </Routes>
      <Toaster/>
    </Router>
  )
}


const appDiv = document.getElementById("app")
ReactDOM.render(<App />, appDiv)