import React, { useState, Component } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


import "./Chores.css"



function Table() {
    const [startDate, setStartDate] = useState(new Date());
    const [actionOps, setActionOps] = useState([
        { name: "Wash" },
        { name: "Clean" },
        { name: "Sweep" },
        { name: "Wipe" },
        { name: "Vacuum" }])


    const [areaOps, setAreaOps] = useState([
        { name: "Kitchen" },
        { name: "Bathroom" },
        { name: "Laundry" },
        { name: "Bedroom" },
        { name: "Garage" }])

    const [subjectOps, setSubjectOps] = useState([
        { name: "Counter" },
        { name: "Floor" },
        { name: "Walls" },
        { name: "Fridge" },
        { name: "Clothes" }])

    const [purposeOps, setPurposeOps] = useState([
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
        { name: "Yes" },
        { name: "No" }])    

    const [recurringOps, setRecurringOps] = useState([
        {  name: "Daily" },
        {  name: "Weekly" },
        {  name: "Monthly" },
        {  name: "Quarterly" },
        {  name: "Annually" }])    

    const [statusOps, setStatusOps] = useState([
        { name: "Incomplete" },
        { name:  "Complete" }])    

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

    }

    const submitHandler=()=>{
        //send choreName and form to the database
        console.log({form})
        console.log ({choreName})
        console.log({startDate})
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
    return (
        <form className="form1 left">
            <h1>Create or Edit a Chore</h1>
            <div className="left form">
                <label for="choreName">choreName </label>
                <input value={choreName} type="text" />
                <label for="workerBee">Assigned to </label>
                <input type="text" />
                <br></br>

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
                <label for="deadline">Deadline </label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
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


                <label>Status</label>
                <select onClick={e => handleChange(e)} class="form-select" id="status" aria-label="Default select example">
                    {statusOps.map(status => {
                        return (<option value={status.name}>{status.name}</option>)
                    })}
                </select>
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
                <textarea id="specialinstructions">
                </textarea>
            </div>
            <button onClick={submitHandler} type="button" class="btn btn-primary mx-1">Submit</button>
            <button onClick={editHandler} type="button" class="btn btn-primary mx-1">Edit</button>
            <button onClick={deleteHandler} type="button" class="btn btn-primary mx-1">Delete</button>
            <button onClick={shareHandler} type="button" class="btn btn-primary mx-1">Share</button>
        </form>
    )
}




export default Table