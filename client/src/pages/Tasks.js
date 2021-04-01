import React, { useEffect, useRef } from "react"
import { useStoreContext } from "../utils/GlobalStore"
import fetchJSON from "../utils/API"

function Tasks() {
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

  //ADDED THIS BUTTON
  async function tasksDel( e ){
    e.preventDefault()
    const id = e.target.id
    console.log ('deleteid',id)  
    const newTask = inputRef.current.value
    // clear input
    inputRef.current.value = ''

    const { status, message }= await fetchJSON( `/api/tasks/${id}`, 'delete' )
    if( !status ){
      dispatch({ type: "ALERT_MESSAGE", message })
      return
    }

    dispatch({ type: "REMOVE_POST", id , message })
  }
//



  // on load get the list
  useEffect( function(){
    tasksLoad()
  }, [])
  
  return (
      <form>
      <div class="card">
          <div class="card-header">
              <h1>{name}'s HoneyDoo List</h1>
          </div>
          <div  class="card-body">
              <ul id="taskList" class="list-group">
              {tasks && tasks.map( task=><li key={task._id} class="list-group-item">{task.name} 
               <button onClick={tasksDel} disabled={alert.length>0} class="btn btn-primary float-end " id={task._id}>x</button></li> )}
              </ul>
          </div>

          <div class="card-footer">
            <div class="input-group">
              <input ref={inputRef} type="text" class="form-control" placeholder='Remove Task...' /> 
              <button onClick={tasksSave} disabled={alert.length>0} class="btn btn-primary">Save</button>
            </div>
          </div>
      </div>


          <div class="card-header">
              <h1>{name}'s Household HoneyDoo List</h1>
          </div>
          <div  class="card-body">
              <ul id="taskList" class="list-group">
                {tasks && tasks.map( task=><li key={task._id} class="list-group-item">{task.name}</li> )}
              </ul>
          </div>
      </form>
  )
}

export default Tasks