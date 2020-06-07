import React from "react"
import "./Profile.css"
import M from 'materialize-css'
import { checkSession, editUser } from "../actions/index"
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { currentUser: state.currentUser };
};

function mapDispatchToProps(dispatch) {
    return {
        checkSession: () => dispatch(checkSession()),
        editUser: (user) => dispatch(editUser(user))
    };
}

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser ? this.props.currentUser : null,
            user: {
                dateOfRegistration: this.props.currentUser ? this.props.currentUser.dateOfRegistration : "",
                dateOfModification: this.props.currentUser ? this.props.currentUser.dateOfModification : "",
                id: this.props.currentUser ? this.props.currentUser.id : "",
                name: this.props.currentUser ? this.props.currentUser.name : "",
                username: this.props.currentUser ? this.props.currentUser.username : "",
                gender: this.props.currentUser ? this.props.currentUser.gender : "",
                photo: this.props.currentUser ? this.props.currentUser.photo : "",
                description: this.props.currentUser ? this.props.currentUser.description : "",
                password: this.props.currentUser ? this.props.currentUser.password : "",
                role: this.props.currentUser ? this.props.currentUser.role : "",
                status: this.props.currentUser ? this.props.currentUser.status : ""
            }
        }

       
    }

    componentDidMount(){
        if (!this.props.currentUser) {
            this.props.checkSession().then(data => {
                let currentUser = data.data
                this.setState({
                    currentUser: currentUser,
                    user: {
                        dateOfRegistration: currentUser.dateOfRegistration,
                        dateOfModification: currentUser.dateOfModification,
                        id: currentUser.id,
                        name: currentUser.name,
                        username: currentUser.username,
                        gender: currentUser.gender,
                        photo: currentUser.photo,
                        description: currentUser.description ? currentUser.description : "",
                        password: currentUser.password,
                        role: currentUser.role,
                        status: currentUser.status ? currentUser.status : "active"
                    }
                })
            })
        }
    }

    openModal = () => {
        M.Modal.init(this.modal).open()
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

    save = (e) => {
        e.preventDefault();
        let user = {
            ...this.state.user,
            dateOfModification: new Date().toString()
        }

        this.props.editUser(user).then(user => {
            this.setState({
                currentUser: user.data,
                user: user.data
            })
        })
    }

    render() {
        return (
            <div className="profile">
                {
                    this.state.currentUser &&
                    <div className="row">
                        <div className="col s3">
                            <img width="150" height="150" alt="Profile pic" src={this.state.currentUser.photo} />
                        </div>
                        <div className="col s6 offset-s1 info">
                            <div className="row">
                                <span className="title">Name: </span>
                                <span>{this.state.currentUser.name}</span>
                            </div>
                            <div className="row">
                                <span className="title">Username: </span>
                                <span>{this.state.currentUser.username}</span>
                            </div>
                            <div className="row">
                                <span className="title">Gender: </span>
                                <span>{this.state.currentUser.gender ? this.state.currentUser.gender : ""}</span>
                            </div>
                            <div className="row">
                                <span className="title">Description: </span>
                                <span>{this.state.currentUser.description ? this.state.currentUser.description : ""}</span>
                            </div>
                        </div>
                        <div className="col s1">
                            <span className="btn-floating btn-large teal pulse modal-trigger" onClick={this.openModal}>
                                <i className="material-icons">edit</i>
                            </span>
                        </div>
                    </div>
                }

                <div id="edit" className="modal" ref={(modal) => { this.modal = modal }}>
                    <div className="modal-content">
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
                        <a className="modal-close btn-flat">Cancel</a>

                    </div>
                </div>
            </div>


        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
