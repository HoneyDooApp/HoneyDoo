import React, {useState, Component } from 'react'
import "./Chores.css"


  
function Table() {
   const [actionOps,setActionOps] =useState([
      {name:"Wash"},
      {name:"Clean"},
      {name:"Sweep"},
      {name:"Wipe"},
      {name:"Vacuum"}])


      const [areaOps,setAreaOps] =useState([
         {name:"Kitchen"},
         {name:"Bathroom"},
         {name:"Laundry"},
         {name:"Bedroom"},
         {name:"Garage"}])

      const [subjectOps,setSubjectOps] =useState([
         {value:1,name:"Counter"},
         {value:2,name:"Floor"},
         {value:3,name:"Walls"},
         {value:4,name:"Fridge"},
         {value:5,name:"Clothes"}])


      const [choreName,setChoreName]=useState('')
      const handleChange=(e)=>{
         console.log("click")
         const option =e.target.value
         setChoreName(choreName=>"")
         setChoreName(choreName=>choreName+option)
         // setChoreName(choreName=>"")
         
      }
   return (
      <form className="form1 left">
        <h1>Mjoc's Chore List</h1>
        <div className="left form">
            <label  for="choreName">choreName </label>
             <input value={choreName} type="text"/>
            <label for="workerBee">Assigned to </label>
            <input type="text"/>
        <br></br>
            <label for="action">Action </label>
            <select onClick={e=>handleChange(e)} class="form-select" aria-label="Default select example">
                {actionOps.map(action=>{
                  return( <option  value={action.name}>{action.name}</option>)
                })}
            </select>
            <br></br>

            <label for="area">Area/Location </label>
            <select onClick={e=>handleChange(e)} class="form-select" aria-label="Default select example">
                {areaOps.map(area=>{
                  return( <option  value={area.name}>{area.name}</option>)
                })}
            </select>
            <br></br>
            
            <label for="subject">Subject </label>
            <select onClick={e=>handleChange(e)} class="form-select" aria-label="Default select example">
                {subjectOps.map(subject=>{
                  return( <option  value={subject.name}>{subject.name}</option>)
                })}
            </select>
            <br></br>
            
            <label for="purpose">Purpose </label>
            <select class="form-select" aria-label="Default select example">
                <option value="1">Hygiene</option>
                <option value="2">Duty</option>
                <option value="3">Dependency</option>
                <option value="4">Reward</option>
                <option value="5">Just Because</option>
            </select>
            <br></br>
            <label for="effort">Effort </label>
            <select class="form-select" aria-label="Default select example">
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
            </select>
        <br></br>
            <label for="age">Age Appropriate </label>
            <select class="form-select" aria-label="Default select example">
                <option value="1">All Ages</option>
                <option value="2">Over 7</option>
                <option value="3">Over 18</option>
            </select>
        <br></br>
            <label for="consequence">Consequence </label>
            <select class="form-select" aria-label="Default select example">
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
            </select>
        <br></br>
            <label for="deadline">Deadline </label>
            <input type="text"/>
        <br></br>
        <label>Help Required</label>
            <select class="form-select" aria-label="Default select example">
                <option selected>Yes/No</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
            </select>
        <br></br>
        <label>Recurring</label>
        <select class="form-select" aria-label="Default select example">
                <option value="1">Daily</option>
                <option value="2">Weekly</option>
                <option value="3">Monthly</option>
                <option value="4">Quarterly</option>
                <option value="5">Annually</option>
            </select>
            <br></br>
            <label>Status</label>
            <select class="form-select" aria-label="Default select example">
                <option value="1">Incomplete</option>
                <option value="2">Complete</option>
            </select>
        <br></br>
        </div>
        <br></br>
        <div className="form2">
            <label for="description">Description:</label>
            <textarea id="description">
            </textarea>
        </div>
        <br></br>
            <div className="form3">
            <label for="specialInstructions">Special Instructions and Help Required:</label>
            <textarea>
            </textarea>
        </div>
      </form>
    )
   }




export default Table