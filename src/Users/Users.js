import React from "react";
import "./Users.css"

export default class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: JSON.parse(window.localStorage.getItem("users")),
        }
    }

    delete = (id) =>{
        let users = [...this.state.users];
        let index = users.findIndex(u => u.id === id);
        users.splice(index, 1);
        this.setState({
            users: users
        })

        window.localStorage.setItem("users", JSON.stringify(users))
    }

    edit = (id) =>{
        this.props.history.push({
            pathname: "/editUser",
            state: {
                user: this.state.users.find(u => u.id === id),
            }
        });
    }

    render() {
        return (
            <div className="users row">
                <h4>All Users</h4>
                {
                    this.state.users.map(user =>
                        <div className="card horizontal col s6 l6" key={user.id}>
                            <div className="card-image">
                                <img src={user.photo} />
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <p><span className="fieldName">Name: </span>{user.name}</p>
                                    <p><span className="fieldName">Username: </span>{user.username}</p>
                                    <p><span className="fieldName">Gender: </span>{user.gender}</p>
                                    <p><span className="fieldName">Description: </span>{user.description}</p>

                                </div>
                                <div className="card-action">
                                    <a href="#" onClick={() => this.edit(user.id)} >Edit</a>
                                    <a href="#" onClick={() => this.delete(user.id)} >Delete</a>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}