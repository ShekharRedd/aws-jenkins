import React, { useState ,useEffect } from 'react';

import Header from '../src/Header';
import Practise from './Practise';
import Content from './Content';
import Footer from './Footer';
import AddItems from './AddItems';
import SearchItems from './SearchItems';
import apiRequest from './apiRequest';
import Route_1 from '../src/Route_1';

function App() {

  const API_URL = "http://localhost:3500/items"

  const [items,setItems]=useState([])  
  const [newItems ,setNewItems]=useState('')
  const [saveItems,setSaveItems]=useState('')    

  const [fetchError,setFetchError] =useState('')
      useEffect(()=>{
        const fetch_Data = async () =>{
          try 
          {
              const response = await fetch(API_URL);
              if(!response.ok) throw Error("Did not recevie Expeted data")
              const ListItem = await response.json();
              console.log(ListItem)
              setItems(ListItem)
              setFetchError(null)
              }
          catch(err) {
            console.log("hi",err.stack)
            setFetchError(err.message)
          }
      };
      setTimeout(()=>{
        (async ()=>await fetch_Data())()
      },20)
    },[])

    const HandlerCheckbox=async (id)=>{
        console.log(typeof items)
        console.log("hello wotl",items)
      const list1=items.map((item)=> item.id===id ?{  ... item , checked :!item.checked 
      } : item)
      setItems(list1)

      const Li=list1.filter((items)=>items.id===id)

      const optionReq={
        method : "PATCH",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({checked:Li[0].checked})
      }
      const requl =`${"http://localhost:3500/itemse"}/${id}`
      const res = await apiRequest(requl,optionReq)
      if(res) setFetchError(res);

    }
    const Delete=async (id)=>{
    const list2=items.filter((item)=> item.id!==id)      
      setItems(list2)

      const li=items.filter((item)=>item.id===id)
      const optionReq ={
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(li)
      }
      const requl =`${API_URL}/${id}`
    const res = await apiRequest(requl,optionReq)
    if(res) setFetchError(res);
    }    

    const Additem = async (item)=>{
      
      const id=items.length ? items[items.length -1].id +1 : 1
      const myNewItem={id , checked:false , item}
      const saving=[...items , myNewItem]
      setItems(saving)
      const optionReq ={
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(myNewItem)
      }
    const res = await apiRequest(API_URL,optionReq)
    if(res) setFetchError(res);
    }

    const HandlerSubmit =(e)=>{
      e.preventDefault()
      if(!newItems) return;
      Additem(newItems)
      setNewItems('')
    }


    const Submit=(id,qw)=>{
      const list1=items.map((item)=> item.id===id ?{  ... item , item :qw
      } : item)
      // console.log(list1)
      setItems(list1)      

    }


   const SearchItem = (e) => {
      e.preventDefault();
      const l1 = items.filter((item) =>
        item.item.toLowerCase().includes(saveItems.toLowerCase())
      );
      console.log("filtered items:", l1);
      setItems(l1);
    };    


  return(
    <div >
      <p>Welcome to Hello World </p>
      <Header />
      <AddItems 
          newItems={newItems}
          setNewItems={setNewItems}
          HandlerSubmit={HandlerSubmit}          

      />
      <SearchItems 
        saveItems={saveItems}
        setSaveItems={setSaveItems}
        // SearchItem={SearchItem}

      />
      <main>
        {fetchError && <p>{`Error ${fetchError}`}</p>}
      <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(saveItems.toLowerCase()))}
          setItems={setItems}
          HandlerCheckbox={HandlerCheckbox}
          Delete={Delete}
          Submit={Submit}
      />
      </main>

      
      <Footer 
        length ={items.length}
      />
      
    {/* <button type = "button" onClick={(e)=>setBute(true)}>Click here </button> */}
    {/* { true && <Route_1 />} */}
    <Route_1 />

    {/* <Practise /> */}
    </div>
  
  );
}

export default App;
