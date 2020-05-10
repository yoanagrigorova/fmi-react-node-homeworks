import React from "react"
import "./Registration.css"

export default class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            username: "",
            password: "",
            role: "",
            dateOfRegistration: "",
            users: window.localStorage.getItem("users")? JSON.parse(window.localStorage.getItem("users")): [],
            invalid: false,
            errorMessage: ""
        }
    }


    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    isValid = () => {
        if (this.state.users.find(u => u.username === this.state.username)) {
            this.setState({
                invalid: true,
                errorMessage: "This username is already taken."
            })
            return false;
        }
        var validation = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var usernameValidation = new RegExp("^[a-zA-Z]+$");
        if (this.state.username.length > 15) {
            this.setState({
                invalid: true,
                errorMessage: "Username should be less than 15 letters."
            })
            return false;
        }
        if (!usernameValidation.test(this.state.username)) {
            this.setState({
                invalid: true,
                errorMessage: "Username should be only letters."
            })
            return false;
        }
        if (!validation.test(this.state.password)) {
            this.setState({
                invalid: true,
                errorMessage: "Password should be at least 8 characters with at least one number and special character."
            })
            return false;
        }

        this.setState({
            invalid: false
        })

        return true;
    }

    makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.isValid()) {
            let user = {
                id: this.makeid(20),
                username: this.state.username,
                name: this.state.name,
                password: this.state.password,
                role: "user",
                dateOfRegistration: new Date().toString(),
                status: "active",
                photo: "https://cdn4.iconfinder.com/data/icons/web-app-flat-circular-icons-set/64/Iconos_Redondos_Flat_Usuario_Icn-512.png"
            }
            let users = [...this.state.users, user]
            if (this.state.users) {
                this.setState({
                    users: users
                })
            }
            window.localStorage.setItem("users", JSON.stringify(users));
            window.localStorage.setItem("currentUser", JSON.stringify(user));
            this.props.update()
            this.props.history.push("/profile/"+ this.state.username);
        }
    }

    render() {
        return (
            <div className="registration">
                <h4>Registration</h4>
                <form className="col s12" onSubmit={this.handleSubmit}>
                    {
                        this.state.invalid ?
                            <div className="row">
                                <div className="card-panel teal lighten-4 col s12">{this.state.errorMessage}</div>
                            </div> : ""
                    }

                    <div className="row">
                        <div className="input-field col s12">
                            <input id="name" type="text" required className="validate" onChange={this.handleChange} value={this.state.name} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="username" type="text" required className="validate" onChange={this.handleChange} value={this.state.username} />
                            <label htmlFor="username">Username</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" required className="validate" onChange={this.handleChange} value={this.state.password} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>

                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}