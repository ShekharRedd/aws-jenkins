import React, { useState, useEffect } from 'react';
import './styles.css';

const View_all_data = () => {
  const [view_data, setView_data] = useState([]);
  const [editingStatus, setEditingStatus] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [viewData, setViewData] = useState([]);

  const [status_confirm,setStatus_confirm]=useState(false)

  useEffect(() => {
    console.log("useefffect state 1")
    // Fetch data from API and initialize   editingStatus and editedData arrays
    fetch("http://127.0.0.1:5003/api/view_data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      setView_data(data);
      console.log("data" , data)
      setEditingStatus(data.map(() => false)); // Initialize editingStatus
      const defaultEditedData = data.map((row) => row.map((item) => item));
    setEditedData(data);
    console.log("edited datat", defaultEditedData)
    console.log("status",editingStatus)
    })
    .catch(error => {
      console.log("Error:", error);
    });
  }, [viewData]);

  
  const updatedLocal=(data)=>{
  setView_data(data);
  setEditingStatus(data.map(() => false));
  const defaultEditedData = data.map((row) => row.map((item) => item));
  setEditedData(defaultEditedData);
  }

  const Handle_edit = (index) => {
    const newEditingStatus = [...editingStatus];
    newEditingStatus[index] = true;
    setEditingStatus(newEditingStatus);
    setConfirm_status(false)
  };


  const updateViewData = (updatedData) => {
    const updatedViewData = viewData.map(row => {
      if (row.id === updatedData.id) {
        // Replace the row with updated data
        return updatedData;
      }
      return row;
    });
    setViewData(updatedViewData);
  };


  const send_to_server = (index) => {
    const jsonData = JSON.stringify(editedData[index]);

    fetch("http://127.0.0.1:5003/api/submit_data", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonData
    })
    .then(response => response.json())
    .then(data => {
      console.log("Data submitted successfully:", data);
      updateViewData(data)
      // updatedLocal(data)
      setConfirm_status("successfully added")

    })
    .catch(error => {
      console.error("Error submitting data:", error);
    });
    const newEditingStatus = [...editingStatus];
    newEditingStatus[index] = false;
    setEditingStatus(newEditingStatus);
  };

  const [confirm_status,setConfirm_status]=useState('')

  const Handle_submit=(index)=>{
    let pattern=/^[^\s@]+@gmail\.com$/
    let email_address=editedData[index][4]
    console.log(email_address)
    let result = pattern.test(email_address);
    console.log(result)
    if(result){
      send_to_server(index)
    }
    else{
      console.log("please check the email_address corretc")
      setConfirm_status("please check the email_address corretc")
    }
  }

  const Handle_Delete=(rowIndex)=>{
    const isConfirmed = window.confirm('Are you sure you want to delete this data?');
    if(isConfirmed){
    const jsonData = JSON.stringify(editedData[rowIndex]);
    fetch("http://127.0.0.1:5003/api/delete_data", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonData
    })
    .then(response => response.json())
    .then(data => {
      console.log("Data submitted successfully:", data);
      updatedLocal(data)
    })
    .catch(error => {
      console.error("Error submitting data:", error);
    });
  
    const newEditingStatus = [...editingStatus];
    newEditingStatus[rowIndex] = false;
    setEditingStatus(newEditingStatus);
    }
    else{
      const newEditingStatus = [...editingStatus];
      newEditingStatus[rowIndex] = false;
      setEditingStatus(newEditingStatus);
    }
  };




  const Hanlde_cancel=(rowIndex)=>{
    const newEditingStatus = [...editingStatus];
    newEditingStatus[rowIndex] = false;
    setEditingStatus(newEditingStatus);
  }

  return (
    <div>
      <p>Entire data</p>
      <table>
        <thead>
          <tr>
            {/* <th>Employee ID</th> */}
            <th>Employee Name</th>
            <th>Department</th>
            <th>Job Title</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {view_data.map((data1, rowIndex) => (
            <tr key={rowIndex}>
              {data1.slice(1).map((item, columnIndex) => (
                <td key={columnIndex}>
                  {editingStatus[rowIndex] ? (
                    <input
                      type="text"
                      value={editedData[rowIndex][columnIndex+1]}
                      onChange={(e) => {
                        const newEditedData = [...editedData];
                        newEditedData[rowIndex][columnIndex+1] = e.target.value;
                        setEditedData(newEditedData);
                      }}
                    />
                  ) : (
                    item
                  )}
                </td>
              ))}
              <td>
                {editingStatus[rowIndex] ? (
                  <>
                  <button onClick={() => Handle_submit(rowIndex)}>Submit</button>
                  <button onClick={()=>Hanlde_cancel(rowIndex)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => Handle_edit(rowIndex)}>Edit</button>
                    <button onClick={() => Handle_Delete(rowIndex)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {setStatus_confirm && <p>{confirm_status}</p>}
    </div>
  );
};

export default View_all_data;


// import React from 'react'
// import { useState ,useEffect} from 'react'
// import './styles.css';

// const View_all_data = () => {
//     const [view_data,setView_data]=useState([])
//     const [list_items,setList_items]=useState('')
//     useEffect(() => {
//         console.log("before the ")
//         fetch("http://127.0.0.1:5000/api/view_data",{
//                 method : "GET",
//                 headers:{
//                     "Content-Type": "application/json"
//                 }
//             })
//             .then(response=>response.json())
//             .then(data=>{
//                 console.log(data)
//                 console.log("hellow ")
//                 setView_data(data)
                
//             })
//             .catch(Error=>{
//                 console.log("error",Error)
//             })        

//     }, []);
    
//     useEffect(() => {
//       console.log("after the ");
//       setEditedData(view_data.map(() => ({...})));
//       const message = view_data.map((data1) => (
//           console.log("map inside", data1)
//       ));
//       // Initialize editedData with default values when view_data changes
      
//       // console.log("hi", message);
//   }, [view_data]);

    

//     const [editingStatus, setEditingStatus] = useState(view_data.map(() => false));
//      // Initialize with default values
//     const Handle_edit = (index) => {
//       const newEditingStatus = [...editingStatus];
//       newEditingStatus[index] = true;
//       setEditingStatus(newEditingStatus);
//     };
    
//     const Handle_submit = (index) => {
//       // Implement logic to submit changes for the row at the given index
//       console.log("Submit changes for row:", index, editedData[index]);
      
//       const newEditingStatus = [...editingStatus];
//       newEditingStatus[index] = false;
//       setEditingStatus(newEditingStatus);
//     };
   
//     return (
//         <div>
//           <p>Entire data</p>
//           <table>
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Employee Name</th>
//                 <th>Department</th>
//                 <th>Job Title</th>
//                 <th>Email Address</th>
//                 <th>Phone Number</th>
//                 <th>Address</th>
//               </tr>
//             </thead>
//             <tbody>
//               {view_data.map((data1, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {data1.map((item, columnIndex) => (
//                     <td key={columnIndex}>
//                       {editingStatus[rowIndex] ? (
//                         <input
//                           type="text"
//                           value={editedData[rowIndex][columnIndex]}
//                           onChange={(e) => {
//                             const newEditedData = [...editedData];
//                             newEditedData[rowIndex][columnIndex] = e.target.value;
//                             setEditedData(newEditedData);
//                           }}
//                         />
//                       ) : (
//                         item
//                       )}
//                     </td>
//                   ))}
//                   <td>
//                     {editingStatus[rowIndex] ? (
//                       <button onClick={() => Handle_submit(rowIndex)}>Submit</button>
//                     ) : (
//                       <>
//                         <button onClick={() => Handle_edit(rowIndex)}>Edit</button>
//                         <button onClick={() => Handle_Delete(data1)}>Delete</button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}

//             </tbody>
//           </table>
//         </div>
//       );
    
// }

// export default View_all_data

// import React, { useState, useEffect } from 'react';

// const View_all_data = () => {
//     const [view_data, setView_data] = useState([]);

//     useEffect(() => {
//         fetch("http://127.0.0.1:5000/api/view_data", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         .then(response => response.json()) // Assuming the response is in JSON format
//         .then(data => {
//             setView_data(data);
//         })
//         .catch(error => {
//             console.log("Error:", error);
//         });
//     }, []);

//     return (
//         <div>
//             <p>Entire data</p>
//             <ul>
//                 {view_data.map((data1, index) => (
//                     <li key={index}>
//                         {/* Render your data fields here */}
//                         {data1.map((item, itemIndex) => (
//                             <span key={itemIndex}>{item}</span>
//                         ))}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default View_all_data;
