
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
      const students = await axios.get("https://django-api96.herokuapp.com/list/")
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
      await axios.delete(`https://django-api96.herokuapp.com/delete/${id}`);
      var newstudent = students.filter((item)=>{
           return item.id !== id;
      })
      setStudents(newstudent);
      
   
 } 
  
  async function addData(e) {
   e.preventDefault();
   try {
     await axios.post(`https://django-api96.herokuapp.com/create/`,addstu)
    setStatus(true)
    alert("Data added successfully")
    
} catch (error){
    console.log("Something is wrong")
    alert("Please add valid Data")
}
 }
 if (status){
   return <TipCalc/>//function return
 }
  return <div className='Tipcalc'>
    
      <div className="container mb20" style={{height:'350px'}}>
		<div className="heading">
			<h2>Add Student</h2>
		</div>
		<div className="calculate">
			<label>Enter your Name</label>
          <input type="text" onChange={e=> handleChange(e)}   name="stuname" placeholder="Your Name"/>
          <label >Enter your Email</label>
          <input type="text"  onChange={e=> handleChange(e)} name='email'    placeholder="Enter your Email"/>
          <label >Enter your Address</label>
          <input type="text"  onChange={e=> handleChange(e)} name='address'    placeholder="Enter your Address"/>
          
          <input type="submit" onClick={addData} value="Add Student " style={{marginLeft:"10px"}}  />
       
         
             
        </div>
      </div>
      <div className="container " >
		<div className="heading">
			<h2>Student List</h2>
		</div>
		
        
         <table className='student-table' >
           <tbody>
  <tr>
    <th>No</th>
    <th>Name</th>
    <th>Email</th>
    <th>Address</th>
    <th>Action</th>
  
  </tr>
 
      {students.map((student,i)=>{
          return (

            <tr key={i} className='animate__animated animate__slideInLeft'>
                <td>{i+1}</td>
                <td> {student.stuname}</td>
                <td> {student.email}</td>
                <td> {student.address}</td>
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
