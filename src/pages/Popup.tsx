import { Card } from '@mui/material'
import React from 'react'

function Popup() {
  return (
    <div 
    style={{
        position: "absolute",
        backgroundColor:"#8080803d",
        height:"100vh",
        width:"100vw",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        left:"0",
        top:"0"
    }}
    >
      <Card 
      style={{
        height:"10rem",
        width:"20rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        margin:"auto"
      }}
      >
        <h1>card</h1>
      </Card>
    </div>
  )
}

export default Popup
