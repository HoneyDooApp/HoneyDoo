import React, {useState, useRef } from 'react'
import { useStoreContext } from "../utils/GlobalStore"
import fetchJSON from "../utils/API"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


// import "./Chores.css"



function Table() {
    const [{ alert, tasks, name }, dispatch ]= useStoreContext()
    const [startDate, setStartDate] = useState(new Date()); 
    const [actionOps, setActionOps] = useState([
        {name:"Select"},
        { name: "Wash" },
        { name: "Clean" },
        { name: "Sweep" },
        { name: "Wipe" },
        { name: "Vacuum" }])

    const inputName = useRef()
    const inputDescription= useRef()
    const [workerBeeOps, setworkerBeeOps] = useState([
        { name: "" }])

        const peach = useRef()
        // const inputDescription= useRef()
        const [peachPointsOps, setpeachPointsOps] = useState([
            { name: "" }])

    const [areaOps, setAreaOps] = useState([
        {name:"Select"},
        { name: "Kitchen" },
        { name: "Bathroom" },
        { name: "Laundry" },
        { name: "Bedroom" },
        { name: "Garage" }])

    const [subjectOps, setSubjectOps] = useState([
        {name:"Select"},
        { name: "Counter" },
        { name: "Floor" },
        { name: "Walls" },
        { name: "Fridge" },
        { name: "Clothes" }])

    const [purposeOps, setPurposeOps] = useState([
        {name:"Select"},
        {  name: "Hygiene" },
        {  name: "Duty" },
        {  name: "Dependency" },
        {  name: "Reward" },
        {  name: "Just Because" }])

    const [effortOps, setEffortOps] = useState([
        { name: "High" },
        { name: "Medium" },
        { name: "Low" }])

    const [ageOps, setAgeOps] = useState([
        { name: "All Ages" },
        { name: "Over 7" },
        { name: "Over 18" }])

    const [consequenceOps, setConsequenceOps] = useState([
       
        { name: "High" },
        { name: "Medium" },
        { name: "Low" }])

    const [helpOps, setHelpOps] = useState([
        { name: "No" },
        { name: "Yes" }])    

    const [recurringOps, setRecurringOps] = useState([
        {name:"Once"},
        {  name: "Daily" },
        {  name: "Weekly" },
        {  name: "Monthly" },
        {  name: "Quarterly" },
        {  name: "Annually" }])    

    const [statusOps, setStatusOps] = useState([
        { name: "Incomplete" },
        { name:  "Complete" }])    

    const [ratingOps, setRatingOps] = useState([
            {name:"Unrated"},
            { name: "Peachy" },
            { name:  "Pits" }])    

    const [descriptionOps, setDescriptionOps] = useState([
        { name: "Please enter a description" },
        { name: "" }])  

    const [choreName, setChoreName] = useState('')
    let [form, setForm] = useState({})
    const handleChange = (e) => {
        console.log("click")
        const { id, value } = e.target
        setForm({ ...form, [id]: value })
        form = { ...form, [id]: value }
        setChoreName(`${form.action || '-'} ${form.area || '-'} ${form.subject || '-'} `)
        // setChoreName(choreName=>"")
        // setChoreName(choreName=>choreName+option)
        // setChoreName(choreName=>"")
        console.log('FORM',form)
    }

    const submitHandler=async()=>{
        //send choreName and form to the database
        
        //newTask is going to be an object with your consoel.logs up there 
        //send that in the post {form:,chore:chorename}
        const newTask={
            chore:choreName,
            bee:inputName.current.value.trim(),
            points:peach.current.value.trim(),
            date:startDate,
            description:inputDescription.current.value.trim(),
            formInfo:form


        }
  console.log(newTask)
        const { status, tasks: newTasks, message }= await fetchJSON( '/api/chores', 'post', { task: newTask } )
    if( !status ){
      dispatch({ type: "ALERT_MESSAGE", message })
      return
    }

    // dispatch({ type: "UPDATE_TASKS", tasks: newTasks, message })
  }

        
    

    const editHandler=()=>{
        // send choreName and form to the database
        // console.log({form})
        // console.log ({choreName})
    }

    const deleteHandler=()=>{
        //send choreName and form to the database
        // console.log({form})
        // console.log ({choreName})
    }


    const shareHandler=()=>{
        //send choreName and form to the database
        // console.log({form})
        // console.log ({choreName})
    }
    // const peachPoints = ()
    
    return (
        <form className="form1 left">
            <h1>Create or Edit a Chore</h1>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-3">
                <label for="choreName">Chore Name </label>
                <input value={choreName} type="plain-text" /> 
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                <label for="workerBee" id ="workerBee" >Assigned to </label>
                <input ref={inputName} type="text" id="name" class="form-control" />
                </div>
            
            

                <div class="row">
                <div class="col-12 col-md-6 col-lg-3">
               <label for="action">Action </label>
                <select onClick={e => handleChange(e)} class="form-select" id="action" aria-label="Default select example" >
                    {actionOps.map(action => {
                        return (<option value={action.name}>{action.name}</option>)
                    })}
                </select>
               </div>

               <div class="col-12 col-md-6 col-lg-3">
                <label for="area">Area/Location </label>
                <select onClick={e => handleChange(e)} class="form-select" id="area" aria-label="Default select example">
                    {areaOps.map(area => {
                        return (<option value={area.name}>{area.name}</option>)
                    })}
                </select>
                </div>
                </div>

                <div class="row">
                <div class="col-12 col-md-6 col-lg-3">
                <label for="subject">Subject </label>
                <select onClick={e => handleChange(e)} class="form-select" id="subject" aria-label="Default select example">
                    {subjectOps.map(subject => {
                        return (<option value={subject.name}>{subject.name}</option>)
                    })}
                </select>
               </div>

               <div class="col-12 col-md-6 col-lg-3">
                <label for="purpose">Purpose </label>
                <select onClick={e => handleChange(e)} class="form-select" id="purpose" aria-label="Default select example">
                    {purposeOps.map(purpose => {
                        return (<option value={purpose.name}>{purpose.name}</option>)
                    })}
                </select>
                </div>
                </div>

                <div class="row">
                <div class="col-12 col-md-6 col-lg-3">
                <label for="effort">Effort </label>
                <select onClick={e => handleChange(e)} class="form-select" id="effort" aria-label="Default select example">
                    {effortOps.map(effort => {
                        return (<option value={effort.name}>{effort.name}</option>)
                    })}
                </select>
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                <label for="age">Age Appropriate </label>
                <select onClick={e => handleChange(e)} class="form-select" id="age" aria-label="Default select example">
                    {ageOps.map(age => {
                        return (<option value={age.name}>{age.name}</option>)
                    })}
                </select>
                </div>
                </div>

                <div class="row">
                <div class="col-12 col-md-6 col-lg-3">
                <label for="consequence">Consequence </label>
                <select onClick={e => handleChange(e)} class="form-select" id="consequence" aria-label="Default select example">
                    {consequenceOps.map(consequence => {
                        return (<option value={consequence.name}>{consequence.name}</option>)
                    })}
                </select>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                <label>Status</label>
                <select onClick={e => handleChange(e)} class="form-select" id="status" aria-label="Default select example">
                    {statusOps.map(status => {
                        return (<option value={status.name}>{status.name}</option>)
                    })}
                </select>
                </div>

                
                </div>

                <div class="row">
                <div class="col-12 col-md-6 col-lg-3">
                <label>Help Required</label>
                <select onClick={e => handleChange(e)} class="form-select" id="help" aria-label="Default select example">
                    {helpOps.map(help => {
                        return (<option value={help.name}>{help.name}</option>)
                    })}
                </select>
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                <label>Recurring</label>
                <select onClick={e => handleChange(e)} class="form-select" id="recurring" aria-label="Default select example">
                    {recurringOps.map(recurring => {
                        return (<option value={recurring.name}>{recurring.name}</option>)
                    })}
                </select>
                </div>
                </div>

                <div class="row">
                <div class="col-12 col-md-6 col-lg-3">
                <label>Rating</label>
                <select onClick={e => handleChange(e)} class="form-select" id="rating" aria-label="Default select example">
                    {ratingOps.map(rating => {
                        return (<option value={rating.name}>{rating.name}</option>)
                    })}
                </select>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                <label for="deadline">Deadline </label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                <label for="peachPoints" class ="peachPoints" >Peach Points </label>
                <input ref={peach} type="number" id="peachPoints" class="form-control" />
                </div>

            </div>
            <br></br>
            <div className="form2">
                <label for="description">Description:</label>
                <textarea ref={inputDescription}type="text" id="name" class="form-control">
                </textarea>
            </div>
            <br></br>
            <button onClick={submitHandler} type="button" class="btn btn-primary mx-1">Submit</button>
            {/* <button onClick={editHandler} type="button" class="btn btn-primary mx-1">Edit</button>
            <button onClick={deleteHandler} type="button" class="btn btn-primary mx-1">Delete</button>
            <button onClick={shareHandler} type="button" class="btn btn-primary mx-1">Share</button> */}
        </form>
    )
}




export default Table