import React from "react"
import "./Login.css"
import { login } from "../actions/index";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { currentUser: state.currentUser };
};

function mapDispatchToProps(dispatch) {
    return {
        login: user => dispatch(login(user))
    };
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(user).then(data=>{
            if(data.data.result === 'success'){
                this.props.update()
                this.props.history.push("/profile/"+ this.state.username);
            }else{
                this.setState({
                    invalid: true,
                    errorMessage: "Invalid username or password"
                })
            }
        })
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
