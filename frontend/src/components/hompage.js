import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {

  return (
    <>

      <div className="container m-5 text-center decoration-none">
        <div className="heading">
          <h1>House party</h1>
        </div>

        <div className='m-2'>
          <button className='btn btn-danger m-2'><Link to="/create"> create room</Link></button>
          <button className='btn btn-secondary'><Link to="/join"> Join room</Link></button>
        </div>
      </div>
    </>

  )
}
