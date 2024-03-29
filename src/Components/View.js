import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import axios from 'axios';

function View() {
  const {id} = useParams();
  console.log(id,"display");
  const [students,setStudents]=useState([]);

  useEffect(() => {
    
    
getAllStudents();
  },[])


  async function getAllStudents(){
    try {
    const students = await axios.get(`https://django-api96.herokuapp.com/list/${id}`)
    console.log(students.data);
    setStudents(students.data);
    
} catch (error){
    console.log("Something is miss")
}
}
  return (
    <>
    
    
    <div className='customer-detail' >
        
         <table className='student-table' >
  <tr>
    <th>No</th>
    <th>Name</th>
    <th>Email</th>
    <th>Address</th>
    
  
  </tr>
 

            <tr>
                <td>{id}</td>
                <td> {students.stuname}</td>
                <td> {students.email}</td>
                <td> {students.address}</td>
   
            </tr>
          
     
</table>
<div style={{textAlign:"center"}}>
   <Link to="/"> <input type="submit" value="Back To Home " style={{margin:"10px"}}  /></Link>
         </div>
         </div>

    </>
  )
}

export default View