import React from "react"
import "./Registration.css"
import { createUser } from "../actions/index";
import { connect } from "react-redux";
import M from 'materialize-css'

const mapStateToProps = state => {
    return { currentUser: state.currentUser };
};

function mapDispatchToProps(dispatch) {
    return {
        createUser: user => dispatch(createUser(user))
    };
}

class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            username: "",
            password: "",
            role: "",
            dateOfRegistration: "",
            invalid: false,
            errorMessage: "",
            gender: ""
        }
    }

    componentDidMount() {
        M.FormSelect.init(this.dropdown)
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    isValid = () => {
        var validation = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
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

        if (this.state.username.length === 0 || this.state.password.length === 0 || this.state.username.length === 0 ) {
            this.setState({
                invalid: true,
                errorMessage: "All fields should be filled."
            })
            return false;
        }

        this.setState({
            invalid: false
        })

        return true;
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.isValid()) {
            let user = {
                username: this.state.username,
                name: this.state.name,
                password: this.state.password,
                gender: this.state.gender,
                dateOfRegistration: new Date().toString(),
            }

            this.props.createUser(user).then(data => {
                if (data.payload.result === 'success') {
                    this.setState({
                        currentUser: data.data
                    })
                    this.props.update()
                    this.props.history.push("/profile/" + this.state.username);
                }
            })
        }
    }

    render() {
        let validation = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        let usernameValidation = new RegExp("^[a-zA-Z]+$");

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
                            <input id="username" type="text" required className={usernameValidation.test(this.state.username)? "valid": "invalid"} onChange={this.handleChange} value={this.state.username} />
                            <label htmlFor="username">Username</label>
                            {(this.state.username.length && !usernameValidation.test(this.state.username)) ? <p className="warningMessage">Username should be only letters.</p> : "" }
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" required className={(this.state.password.length && validation.test(this.state.password))? "valid": "invalid"} onChange={this.handleChange} value={this.state.password} />
                            <label htmlFor="password">Password</label>
                        </div>
                        {(this.state.password.length && !validation.test(this.state.password))? <p className="warningMessage">Password should be at least 8 characters with at least one number and special character.</p> : ""}
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <select id="gender" onChange={this.handleChange} ref={(dropdown) => { this.dropdown = dropdown }}>
                                <option value="" disabled selected>Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration)