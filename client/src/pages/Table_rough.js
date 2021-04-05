import React, { Component } from 'react'

class Table extends Component {
   //since we are extending class Table so we have to use super in order to override Component class constructor
      state = { //state is by default an object
        chores: [
            { id: 1, choreName: 'Laundry', peachPriority: "High", Deadline:'', Rating:''},
            { id: 2,  choreName: 'Clean Oven', peachPriority: "Medium", Deadline:'', Rating:''},
            { id: 3,  choreName: 'Water Plants', peachPriority: "Low", Deadline:'', Rating:''},
            { id: 4,  choreName: 'Empty Garbage',peachPriority: "Medium", Deadline:'', Rating:''}
         ]
      }
   
renderTableData() {
   return this.state.chores.map((chore, index) => {
      const { id, choreName, peachPriority, Deadline, Rating } = chore //destructuring
      return (
         <tr key={id}>
            <td>{id}</td>
            <td>{choreName}</td>
            <td>{peachPriority}</td>
            <td>{Deadline}</td>
            <td>{Rating}</td>
         </tr>
      )
   })
}
render() {
   return (
      <div>
         <h1 id='title'>HoneyDoo List</h1>
         <table id='chores'>
            <tbody>
               {this.renderTableData()}
            </tbody>
         </table>
      </div>
   )
}
}