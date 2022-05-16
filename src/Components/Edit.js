import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import axios from 'axios';

function Edit() {
  const {id} = useParams();
  
  const [students,setStudents]=useState({
    firstName : " ",
    email : " "
  });
 

  useEffect(() => {
    async function getAllStudents(){
      try {
      const students = await axios.get(`http://127.0.0.1:8000/sampleapi/${id}`)
      console.log(students.data);
      setStudents(students.data);
      
  } catch (error){
      console.log("Something is miss")
  }
  }
  getAllStudents();
  },[])

  const handleChange=(e)=>{
    setStudents({
      ...students, [e.target.name] : e.target.value})
    console.log(students)
    }
  
    async function updateData(e) {
      e.preventDefault();
      try {
        await axios.put(`http://127.0.0.1:8000/sampleapi/${id}`,students)
   
       
   } catch (error){
       console.log("Something is wrong")
   }
    }
  return (
    <>
    <div className='Tipcalc'>
    <div className="container" style={{width:"100%"}}>
		<div className="heading">
			<h2>Edit Student Details</h2>
		</div>
		<div className="calculate">
    
			<label>Enter your Name</label>
      <input type="text"    name="stuname" value={students.stuname} onChange={e=> handleChange(e)} placeholder="Your Name"/>
          <label >Enter your Email</label>
          <input type="text"   name='email' value={students.email}   onChange={e=> handleChange(e)} placeholder="Enter your Email"/>
          
          <input type="submit" onClick={updateData} value="Update Student Details " style={{marginLeft:"10px"}}  />
        
             </div>
        </div>
        
        </div>
   <div style={{textAlign:"center"}}>
   <Link to="/"> <input type="submit" value="Back To Home "   /></Link>
         </div>
         </>
  )
}

export default Edit