import React from 'react'
import "../style.css"
import dogimg from "../components/Dog.png"
export default function Navbar() {
  return (
    <>
    <div className='navbar'>

    <h1 >Adopt Dogs APP WEB3</h1> 
    <img src={dogimg} width="200px" className='dogimg'/>
    </div>
    </>
  )
}
