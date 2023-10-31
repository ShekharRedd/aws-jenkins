import React from 'react'

const SearchItems = ({saveItems ,setSaveItems}) => {
  return (
    <form >
    <label htmlFor='SearchItem'>SearchItem</label>
    <input 
        type='text'
        role='search'
        value={saveItems}
        onChange={(e)=>setSaveItems(e.target.value)}
    />
    {/* <button type='submit' onClick={SearchItem}>Search</button> */}
    </form>

  )
}

export default SearchItems
