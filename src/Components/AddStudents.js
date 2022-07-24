
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom"

function TipCalc() {
  const {id} = useParams();
  const [students,setStudents]=useState([]);
 
  const [addstu,setAddstu]=useState({
    stuname : '',
    email : ''
  });
  const [status,setStatus]=useState();

  useEffect(() => {
    
    async function getAllStu(){
      try {
      const students = await axios.get("http://localhost:8000/list/")
      console.log(students);
      setStudents(students.data);
      
  } catch (error){
      console.log("Something is wrong")
  }
  }
getAllStu();
  },[])


const handleChange=(e)=>{
  setAddstu({
    ...addstu, [e.target.name] : e.target.value})
  console.log(addstu)
  }
  async function deleteData(id) {
      await axios.delete(`http://localhost:8000/delete/${id}`);
      var newstudent = students.filter((item)=>{
           return item.id !== id;
      })
      setStudents(newstudent);
      
   
 } 
  
  async function addData(e) {
   e.preventDefault();
   try {
     await axios.post(`http://localhost:8000/create/`,addstu)
    setStatus(true)
    
} catch (error){
    console.log("Something is wrong")
}
 }
 if (status){
   return <TipCalc/>//function return
 }
  return <div className='Tipcalc'>
      <div className="container" style={{height:'300px'}}>
		<div className="heading">
			<h2>Add Student</h2>
		</div>
		<div className="calculate">
			<label>Enter your Name</label>
          <input type="text" onChange={e=> handleChange(e)}   name="stuname" placeholder="Your Name"/>
          <label >Enter your Email</label>
          <input type="text"  onChange={e=> handleChange(e)} name='email'    placeholder="Enter your Email"/>
          
          <input type="submit" onClick={addData} value="Add Student " style={{marginLeft:"10px"}}  />
       
         
             
        </div>
      </div>
      <div className="container " >
		<div className="heading">
			<h2>Student List</h2>
		</div>
		
        
         <table className='customer-table' >
           <tbody>
  <tr>
    <th>No</th>
    <th>Name</th>
    <th>Email</th>
    <th>Action</th>
  
  </tr>
 
      {students.map((student,i)=>{
          return (

            <tr key={i} className='animate__animated animate__slideInLeft'>
                <td>{i+1}</td>
                <td> {student.stuname}</td>
                <td> {student.email}</td>
    <td><Link to={`/view/${student.id}`}> <i className="fa fa-eye"></i></Link> <Link to={`/edit/${student.id}`}><i className="fa fa-pencil"></i> </Link> <i className="fa fa-trash " onClick={()=>deleteData(student.id)}></i></td>
            </tr>
          )
      })}
       
       
       </tbody>
</table>

      </div>
             
        </div>
     
  
}

export default TipCalc;
