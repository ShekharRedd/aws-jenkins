import React from 'react'
import { useState } from 'react'
const Add_Data = () => {
  const [employee_name ,setEmployee_name] =useState('')
  const [department,setDepartment]=useState('')
  const [job_title,setJob_title]=useState('')
  const [email_address,setEmail_address]=useState('')
  const [phone_number,setPhone_number]=useState(0)
  const [address,setAddress]=useState('')
  const [confirm_status,setConfirm_status]=useState('')
  
  const Handle_employee_name=(event)=>{
      setEmployee_name(event.target.value)
  }
  const Handle_department=(event)=>{
      setDepartment((event.target.value))
  }
  const Handle_job_title=(event)=>{
    setJob_title(event.target.value)
  }

  const Handle_email_address=(event)=>{
    setEmail_address(event.target.value)
    // console.log(result)
  }
  const Handle_phone_number=(event)=>{
    setPhone_number(event.target.value)
  }
  const Handle_address=(event)=>{
    setAddress(event.target.value)
  }
  
  const Handle_submit=(event)=>{
    event.preventDefault()

    let send_data={
      "employee_name":employee_name,
      "department":department,
      "job_title":job_title,
      "email_address":email_address,
      "phone_number":phone_number,
      "address":address
    }
    let apiUrl = process.env.REACT_APP_API_URL;
    apiUrl=`http://${apiUrl}:5003/api/add_data`    
    const send_to_server=()=>{
    const isConfirmed = window.confirm('Are you sure you want to submit this data?');

    if(isConfirmed){
    fetch(apiUrl,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(send_data)
    })
    .then(response=> response.json())
    .then((data)=>{
      console.log("data response is",data)
      setConfirm_status("successfuly added the add")
    })
    .catch(Error=>{
      console.log("error occur",Error)
      setConfirm_status("server is busy please try again")
    })
    }
    else{
      setConfirm_status("Submission cancelled check once")
    }
      }


    let pattern=/^[^\s@]+@gmail\.com$/
    let result = pattern.test(email_address);
    if(result){
      send_to_server()
    }
    else{
      setConfirm_status("please check the email_address corretc")
    }
  }
  return (
    <div>
      <form onSubmit={Handle_submit}>
      employee_name: <input 
            type='text'
            value={employee_name}
            onChange={Handle_employee_name}
            required
            />
        department: <input 
                type='text' 
                value={department} 
                onChange={Handle_department}
                
                />
        job_title:  <input 
            type='text'
            value={job_title}
            onChange={Handle_job_title}

            />

        email_address:<input 
            type='email'
            value={email_address}
            onChange={Handle_email_address}
            required
            /> 
        phone_number:<input 
            type='integer'
            value={phone_number}
            onChange={Handle_phone_number}
            required
            />
        address: <input 
            type='text'
            value={address}
            onChange={Handle_address}
            />
            <br />
        submit: <input 
            type='submit'
            />
      </form>
      <p>{confirm_status}</p>
    </div>
  )
}

export default Add_Data
