import React, { useEffect, useRef } from "react"
import { useStoreContext } from "../utils/GlobalStore"
import fetchJSON from "../utils/API"
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

function Tasks() {
  const [{ alert, chores, name }, dispatch ]= useStoreContext()

  const inputRef = useRef()

  async function tasksLoad(){
    const { status, chores:chores, message }= await fetchJSON( '/api/chores' )
    console.log(chores)
    if( !status ){
      // for simplicity, we simply log user out if an error (ex. forbidden for invalid session)
      dispatch({ type: "USER_LOGOUT", message })
      return
    }

    // update tasks list
    console.log( `.. GET /api/tasks, tasks:`, chores )
    dispatch({ type: "UPDATE_CHORES", chores: chores })
  }


  //ADDED THIS BUTTON
  async function tasksDel( e ){
    e.preventDefault()
    const id = e.target.id
    console.log ('deleteid',id)  
    // const newTask = inputRef.current.value
    // clear input
    // inputRef.current.value = ''
    console.log (e.target.parentElement)
    // e.parentNode
    //alternative solution to the deletion of posts
    //Without having to reestablish our state we are pretending
    //that the information is gone(front-end wise) and on refresh
    //the accurate call from the database determines the mapped list items
    //which in turn show the correct items
    e.target.parentElement.remove()
    const { status, message }= await fetchJSON( `/api/chores/${id}`, 'delete' )
    
    if( !status ){
      // dispatch({ type: "ALERT_MESSAGE", message })
      return
    }
    // dispatch({ type: "REMOVE_POST", id , message })
    //Deletion works perfectly fine, just need to add an update
    //to our state after the delete happens by GET-ing the updated
    //Data from our database. Alternate
    //const { tasks: newTasks}= await fetchJSON( '/api/tasks' )
  }
  // on load get the list
  useEffect( function(){
    tasksLoad()
  }, [])
  
  return (
      <form>
      <div class="card-table">
          <div class="card-header">
              <h1>{name}'s HoneyDoo List</h1>
          </div>
          <div  class="card-body">
        
          <MDBTable>
      <MDBTableHead>
        <tr  >
          <th>CHORE</th>
          <th>WORKER BEE</th>
          <th>DATE</th>
          <th>PURPOSE</th>
          <th>PEACH POINTS</th>
          <th>DESCRIPTION</th>
        </tr>
      </MDBTableHead>
      {chores && chores.map( chore=>
      <MDBTableBody>
        <tr>
          <td>{chore.chore}</td>
          <td>{chore.bee}</td>
          <td>{chore.date}</td>
          <td>{chore.purpose}</td>
          <td>{chore.peachpoints}</td>
          <td>{chore.description}</td>
        </tr>
        
      </MDBTableBody>
      )}
    </MDBTable>
  



              {/* <th>TAble head</th>
              <ul id="taskList" class="list-group">
              {chores && chores.map( chore=><li key={chore._id} class="list-group-item">{chore.chore} | {chore.bee} 
               {/* <button onClick={tasksDel} disabled={alert.length>0} class="btn btn-primary float-end " id={task._id}>x</button> */}
               {/* </li> )} */}
              {/* </ul> */} 
          </div>

          {/* <div class="card-footer">
            <div class="input-group">
              <input ref={inputRef} type="text" class="form-control" placeholder='Remove Task...' /> 
              <button onClick={tasksSave} disabled={alert.length>0} class="btn btn-primary">Save</button>
              
            </div>
          </div> */}
      </div>


      </form>
  )
}

export default Tasks