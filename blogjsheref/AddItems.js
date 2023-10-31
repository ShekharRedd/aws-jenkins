import React from 'react'

const AddItems = ({ newItems,setNewItems ,HandlerSubmit }) => {
  return (
        <form >
            <label htmlFor='AddItems'>Add Item</label>
            <input 
                id="AddItems"
                type='text'
                placeholder='Add item'
                onChange={(e)=>setNewItems(e.target.value)}
                value={newItems}
            />
            <button  type='submit'  onClick={HandlerSubmit}> Click TO Add</button>            
        </form>
    
  )
}

export default AddItems
