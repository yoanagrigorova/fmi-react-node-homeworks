import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import M from 'materialize-css'
import Login from "./Login/Login"
import Registration from "./Registration/Registration"
import Profile from "./Profile/Profile"
import Recipes from "./Recipes/Recipes"
import Edit from "./Recipes/Edit"
import Users from "./Users/Users"
import EditUser from "./Users/EditUser"



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: JSON.parse(window.localStorage.getItem("currentUser"))
    }
  }

  componentDidMount() {
    M.Sidenav.init(this.sidenav);
  }

  update = () => {
    this.setState({
      currentUser: JSON.parse(window.localStorage.getItem("currentUser"))
    })
  }

  signOut = () => {
    window.localStorage.setItem("currentUser", JSON.stringify(""));
    this.setState({
      currentUser: null
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav className="teal lighten-2">
            <div className="nav-wrapper">
              <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              {
                this.state.currentUser ?
                  <ul className="right hide-on-med-and-down">
                    <li><Link to="/recipes" >Recipes</Link></li>
                    <li><Link to="/add" >Add Recipe</Link></li>
                    <li><Link to={"/profile/" + this.state.currentUser.username}>Profile</Link></li>
                    <li><Link to="/users" >Users</Link></li>
                    <li><a onClick={this.signOut} >Sign Out</a></li>

                  </ul> :
                  <ul className="right hide-on-med-and-down">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/registration">Registration</Link></li>
                  </ul>
              }


            </div>
          </nav>

          {
            this.state.currentUser ?
              <ul className="sidenav" id="mobile-demo" ref={(sidenav) => { this.sidenav = sidenav }}>
                <li><Link to="/recipes" >Recipes</Link></li>
                <li><Link to="/add" >Add Recipe</Link></li>
                <li><Link to={"/profile/" + this.state.currentUser.username}>Profile</Link></li>
                <li><Link to="/users" >Users</Link></li>
                <li><a onClick={this.signOut} >Sign Out</a></li>
              </ul> :
              <ul className="sidenav" id="mobile-demo" ref={(sidenav) => { this.sidenav = sidenav }}>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/registration">Registration</Link></li>
              </ul>
          }

          {
            this.state.currentUser ?
              <Switch>
                <Route path="/profile/:username" component={Profile}>
                </Route>
                <Route path="/recipes" component={Recipes}>
                </Route>
                <Route path="/edit" component={Edit}>
                </Route>
                <Route path="/add" component={Edit}>
                </Route>
                <Route path="/users" component={Users}>
                </Route>
                <Route path="/editUser" component={EditUser}>
                </Route>
              </Switch>
              : <Switch>

                <Route path="/registration" render={(props) => <Registration {...props} update={this.update} />}>
                </Route>
                <Route path="/login" render={(props) => <Login {...props} update={this.update} />}>
                </Route>
              </Switch>
          }
        </div>
      </Router>
    );
  }

}

export default App;
