# WHAT IS IT WE WANT THIS THING TO DO

* Define the ADMIN - 
* Define Team members
    - Role in family
* ASSIGNMENT of chores
        - Select teamember
        - Communication (Not a current priority) 


## Defining team members

* Input for family member (Name, Role, email password)
    - Gets assigned to family as a non-admin
    - Cannot write only read.
*   - Put a checkbox next to task to indicate complete.

------------------------------------------------------------

STUFF I NEED TO DO;

- give it the ability to remove a task.
- Give it the ability to checkbox a take


// Delete the clicked task
var handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

---------------------------
npm run start:dev

 {tasks && tasks.map( task=><li key={task._id} class="list-group-item">{task.name} 
               <button onClick={tasksSave} disabled={alert.length>0} class="btn btn-primary ">delete</button></li> )}