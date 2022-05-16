import React from 'react'
import doghappy from "../components/dogHappy.jpg"
import dogsad from "../components/dogsad.png"

export default function Card({addressAdopcion ,i,adopted=false,onClick}) {
  return (
  <div className='card'>
      <img src={adopted ? doghappy :dogsad} width="60px"/>
      
      {adopted? (
         <p className='description'>
            adopted dog <b>{i}</b> from {""}    
         {addressAdopcion}  </p>

      ) : (<p className='description'>adopt dog {i} PLISS <button onClick={onClick}>Click here</button></p>)}
  </div>
  )
}
