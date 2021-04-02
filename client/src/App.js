import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { StoreProvider } from "./utils/GlobalStore"

import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import AlertBar from "./components/AlertBar"
// pages
import Tasks from "./pages/Tasks"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
// import Chore from "./pages/Chores"
import Table from './pages/Table'

import "./index.css"
import NewUser from'./pages/newUser'

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div class="container">
            <AlertBar />
            <NavBar />
            <Route exact path={["/","/tasks"]} component={Tasks} /> 
            <Route exact path="/Chore" component={Table} /> 
            <Route exact path="/register" component={Register} />
            <Route exact path="/register/new" component={NewUser} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            {/* <Footer /> */}
        </div>
        <Footer />
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App