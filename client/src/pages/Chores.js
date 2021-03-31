// import React, { Component } from 'react'
import React, { useEffect, useRef } from "react"
import { useStoreContext } from "../utils/GlobalStore"
import fetchJSON from "../utils/API"
import "./Chores.css"


function Chores() {
    const [{ alert, tasks, name }, dispatch ]= useStoreContext()
  
    const inputRef = useRef()
  
    async function tasksLoad(){
      const { status, tasks: newTasks, message }= await fetchJSON( '/api/tasks' )
      if( !status ){
        // for simplicity, we simply log user out if an error (ex. forbidden for invalid session)
        dispatch({ type: "USER_LOGOUT", message })
        return
      }
  
      // update tasks list
      console.log( `.. GET /api/tasks, tasks:`, newTasks )
      dispatch({ type: "UPDATE_TASKS", tasks: newTasks })
    }
  
    async function tasksSave( e ){
      e.preventDefault()
      
      const newTask = inputRef.current.value
      // clear input
      inputRef.current.value = ''
  
      const { status, tasks: newTasks, message }= await fetchJSON( '/api/tasks', 'post', { task: newTask } )
      if( !status ){
        dispatch({ type: "ALERT_MESSAGE", message })
        return
      }
  
      dispatch({ type: "UPDATE_TASKS", tasks: newTasks, message })
    }
  
    // on load get the list
    useEffect( function(){
      tasksLoad()
    }, [])

// function Chores() {
    return (
      <form className="form1 left">
        <h1>Mjoc's Chore List</h1>
        <div className="left form">
            <label for="choreName">Chore name </label>
            <input type="text"/>
            <label for="workerBee">Assigned to </label>
            <input type="text"/>
        <br></br>
            <label for="action">Action </label>
            <select class="form-select" aria-label="Default select example">
                <option value="1">Wash</option>
                <option value="2">Wipe</option>
                <option value="3">Clean</option>
                <option value="4">Repair</option>
                <option value="5">Vacuum</option>
            </select>
            <br></br>
            <label for="subject">Subject </label>
            <select class="form-select" aria-label="Default select example">
                <option value="1">Counter</option>
                <option value="2">Floor</option>
                <option value="3">Walls</option>
                <option value="4">Fridge</option>
                <option value="5">Clothes</option>
            </select>
            <br></br>
            <label for="area">Area/Location </label>
            <select class="form-select" aria-label="Default select example">
                <option value="1">Kitchen</option>
                <option value="2">Bathroom</option>
                <option value="3">Laundry</option>
                <option value="4">Bedroom</option>
                <option value="5">Garage</option>
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
    );
  }
export default Chores;