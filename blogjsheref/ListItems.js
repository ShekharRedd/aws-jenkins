import React from 'react'
import ItemsList from './ItemsList'

const ListItems = ({items , setItems,HandlerCheckbox , Delete,Submit}) => {


  return (
    
    <ul>
        <p>"sfjhj"</p>
    {items.map((item) => (
        <ItemsList 
            item={item}
            setItems={setItems}
            HandlerCheckbox={HandlerCheckbox}
            Delete={Delete}
            Submit={Submit}
        />
      
    ))}
  </ul>
  )
}

export default ListItems
