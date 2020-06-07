import React from "react";
import "./Users.css"
import { checkSession, getUsers, editUser } from "../actions/index"
import { connect } from 'react-redux';
import M from 'materialize-css'

const mapStateToProps = state => {
    return { currentUser: state.currentUser };
};

function mapDispatchToProps(dispatch) {
    return {
        checkSession: () => dispatch(checkSession()),
        getUsers: () => dispatch(getUsers()),
        editUser: (user) => dispatch(editUser(user)),
    };
}

class EditUser extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            user: props.location.state.user
        }
    }

    componentDidMount(){
        M.updateTextFields();
        M.FormSelect.init(this.dropdown)
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
        
        this.props.editUser(user).then(data=>{
            this.setState({
                user: data.data
            })
            M.toast({html: `User ${user.username} was edited!`});
            this.props.history.push("/users");
        })
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
                        {/* <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate" onChange={this.handleChange} value={this.state.user.password} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
