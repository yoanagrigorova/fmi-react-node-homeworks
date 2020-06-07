import React from "react";
import "./Users.css"
import { checkSession, getUsers, deleteUser } from "../actions/index"
import { connect } from 'react-redux';
import M from 'materialize-css'

const mapStateToProps = state => {
    return { currentUser: state.currentUser };
};

function mapDispatchToProps(dispatch) {
    return {
        checkSession: () => dispatch(checkSession()),
        getUsers: () => dispatch(getUsers()),
        deleteUser: (user) => dispatch(deleteUser(user))
    };
}

class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.currentUser ? this.props.currentUser : null,
            users: null
        }
    }

    componentDidMount(){
        if (!this.props.currentUser) {
            this.props.checkSession().then(data => {
                this.setState({
                    currentUser: data.data
                })
            })
        }

        this.props.getUsers().then(data=> {
            this.setState({
                users: data.data
            })
        })
    }

    delete = (e, id) => {
        e.preventDefault();
        this.props.deleteUser({id: id}).then(user=>{
            console.log(user)
            M.toast({html: `User ${user.data.username} was deleted!`});
            this.props.getUsers().then(data=> {
                this.setState({
                    users: data.data
                })
            })
        })
    }

    edit = (e, id) => {
        e.preventDefault();
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
                    this.state.users && this.state.users.map(user =>
                        <div className="card horizontal col s5 l5" key={user.id}>
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
                                    <a href="" onClick={(e) => this.edit(e, user.id)} >Edit</a>
                                    <a href="" onClick={(e) => this.delete(e, user.id)} >Delete</a>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
