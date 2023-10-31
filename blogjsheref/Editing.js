
import React from 'react'

const Editing = ({cl,setCl,place,setPlace, id,setId,Submit}) => {

  
  const Check=(e)=>{
//       const list1=items.map((item)=> item.id===id ?{  ... item , item :qw
  // } : item)
  // console.log(list1)
  // setItems(list1)      
    const qw=document.getElementById("id1").value
      Submit(e,qw)
      setCl(!cl)
  }


 
  return (
    
      <form>
      <input 
      type='text'
      id="id1"
      defaultValue={place}      
      />
      <button type='button' onClick={(e)=>Check(id)}>Continue</button>
      </form>
  )
}

export default Editing


