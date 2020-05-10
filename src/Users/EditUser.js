import React from "react";
import "./Users.css"

export default class EditUser extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            user: props.location.state.user
        }
    }

    handleChange = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.id]: event.target.value
            }
        });
    }

    save = ()=>{
        let user = {
            ...this.state.user,
            dateOfModification: new Date().toString()
        }
        this.setState({
            user: user
        })

        let users = JSON.parse(window.localStorage.getItem("users"));
        let index = users.findIndex(u => u.id === user.id);
        users[index] = user;
        window.localStorage.setItem("users", JSON.stringify(users));
        this.props.history.push("/users");
    }

    render() {
        return (
            <div className="editUser">
                <div>
                    <h4>Edit Profile</h4>

                    <form className="col s12" onSubmit={this.handleSubmit}>


                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text" className="validate" onChange={this.handleChange} value={this.state.user.name} />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="photo" type="text" className="validate" onChange={this.handleChange} value={this.state.user.photo} />
                                <label htmlFor="photo">Photo</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate" onChange={this.handleChange} value={this.state.user.password} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select id="gender" onChange={this.handleChange} ref={(dropdown) => { this.dropdown = dropdown }}>
                                    <option value="" disabled selected={!this.state.user.gender}>Select gender</option>
                                    <option value="male" selected={this.state.user.gender === "male"}>Male</option>
                                    <option value="female" selected={this.state.user.gender === "female"}>Female</option>
                                    <option value="other" selected={this.state.user.gender === "other"}>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="description" className="materialize-textarea" onChange={this.handleChange}
                                    value={this.state.user.description}></textarea>
                                <label htmlFor="description">Describe yourself</label>
                            </div>
                        </div>
                    </form>

                </div>
                <div className="modal-footer">
                    <a className="modal-close btn-flat" onClick={this.save}>Save</a>
                    <a className="modal-close btn-flat" onClick={() => this.props.history.push("/users")}>Cancel</a>

                </div>
            </div>

        )
    }
}