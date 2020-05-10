import React from "react"
import "./Login.css"

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: JSON.parse(window.localStorage.getItem("users")),
            username: "",
            password: ""
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let user = this.state.users.find(user => user.username === this.state.username &&
            user.password === this.state.password)
        if (user) {
            window.localStorage.setItem("currentUser", JSON.stringify(user));
            this.props.update()
            this.props.history.push("/profile/"+ this.state.username);
        } else {
            this.setState({
                invalid: true,
                errorMessage: "Invalid username or password"
            })
        }
    }

    render() {
        return (
            <div className="login">
                <h4>Login</h4>
                <form className="col s12" onSubmit={this.handleSubmit}>
                    {
                        this.state.invalid ?
                            <div className="row">
                                <div className="card-panel teal lighten-4 col s12">{this.state.errorMessage}</div>
                            </div> : ""
                    }
                    <div className="row">

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