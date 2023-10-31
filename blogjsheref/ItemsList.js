import React from 'react'

import { useState } from 'react'
import Editing from './Editing'

const ItemsList = ({item , setItems,HandlerCheckbox , Delete,Submit}) => {
  const [cl ,setCl]=useState(false)
  const [place ,setPlace]=useState('')
  const [id,setId]=useState('0')
  const Click=()=>{
    console.log("hello")
    setCl(true)
  }
  return (
        <li key={item.id}>
            <input 
            type='checkbox'
            checked={item.checked}
            onChange={()=>HandlerCheckbox(item.id)}
            />
            <label>{item.item}</label>
            <button onClick={()=>Delete(item.id)}>Delete</button>
            <button onClick={(e)=>Click()}>Edit</button>
            {cl && <Editing
            cl={cl}
              setCl={setCl}
              place={item.item}
              setPlace={setPlace}
              id={item.id}
              setId={setId}
              Submit={Submit}
             />}
            
      </li>
  )
}

export default ItemsList
