

// import React from 'react'
// import { useEffect ,useState } from 'react'

// const Practise = () => {

//   const [data , setData] =useState([])

//   const [update ,setUpdate] =useState('')
//   useEffect(()=>{
//     console.log("hello")
//     const fetch_data = async ()=>{
//       try {
//       const response = await fetch("https://jsonplaceholder.typicode.com/posts")
//       if(!response.ok) throw Error ("DID not receive expected data")
//       const data_url = await response.json()
//     // console.log(data_url)  
//     setData(data_url)
//       } catch (err) {
//         console.log(err.stack)
//     }
//     }
//     fetch_data()
    
//   },[])

//   const AddItems=()=>{
//     const List1=data.filter((items)=>items.userId===1 ? {...items } : '')
//     setUpdate(List1)
//   }

//   AddItems()
//   return (
//     <div>
//       <ul>
//       {data.map((items)=>
//       <li>
//           {items}
//       </li>
//       )}
        
//       </ul>
      
//     </div>
//   )
// }

// export default Practise
import React, { useEffect, useState } from 'react';

const Practise = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);

  const [req,setReq] =useState('users')
  const API_URL ="https://jsonplaceholder.typicode.com/"
  useEffect(() => {
    const fetch_data = async () => {
      try {
        const response = await fetch(`${API_URL}${req}`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data_url = await response.json();
        setData(data_url);
      } catch (err) {
        console.log(err.stack);
      }
    };
    fetch_data();
  }, [req]);

  const addItems = () => {
    const list1 = data.filter((item) => item.userId === 1);
    setUpdate(list1);
  };

  return (
    <div>
      <button onClick={() =>setReq('posts')}>posts</button><br></br>
      <button onClick={() =>setReq('comments')}>comments</button>
      <button onClick={() =>setReq('users')}>users</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {JSON.stringify(item  )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Practise;
