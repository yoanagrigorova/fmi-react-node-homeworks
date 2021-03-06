import React from "react"
import "./Recipes.css"
import M from 'materialize-css'
import { Link } from "react-router-dom"
import { checkSession, getRecipes, deleteRecipe } from "../actions/index"
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        recipes: state.recipes
    };
};

function mapDispatchToProps(dispatch) {
    return {
        checkSession: () => dispatch(checkSession()),
        getRecipes: ()=> dispatch(getRecipes()),
        deleteRecipe: (id)=> dispatch(deleteRecipe(id))
    };
}

class Recipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser ? this.props.currentUser : null,
            recipes: this.props.recipes ? this.props.recipes : [],
            filtered: this.props.recipes ? this.props.recipes : [],
            recipe: {
                id: "",
                user: this.props.currentUser ? this.props.currentUser : null,
                user_id: "",
                name: "",
                short_description: "",
                time_to_cook: "",
                products: [],
                photo: "",
                long_description: "",
                tags: [],
                time_of_creation: "",
                time_of_modification: ""
            },
            searchBy: "name"
        }

        this.chip = "";
    }

    componentDidMount() {
        if(!this.props.recipes.length){
            this.props.getRecipes().then(data => {
                this.setState({
                    recipes: data.data,
                    filtered: [...data.data]
                })
            })
        }

        if (!this.props.currentUser) {
            this.props.checkSession().then(data => {
                this.setState({
                    currentUser: data.data,
                    recipe: {
                        ...this.state.recipe,
                        user: data.data
                    }
                })
            })
        }
        M.FormSelect.init(this.select)
    }


    delete = (id) => {
        let data = {
            _id: id
        }
        this.props.deleteRecipe(data).then((recipe)=>{
            M.toast({html: `Recipe for ${recipe.data.name} was deleted!`});
            this.props.getRecipes().then(recipes => {
                this.setState({
                    recipes: [...recipes.data],
                    filtered: [...recipes.data]
                })
            })
        })
    }

    edit = (id) => {
        this.props.history.push({
            pathname: "/edit",
            state: {
                recipe: this.state.recipes.find(rec => rec._id === id),
                isEdit: true
            }
        });
    }

    serchByChange = (event) => {
        this.setState({
            searchBy: event.target.value
        })
    }

    search = (event) => {
        if (this.state.searchBy === 'name') {
            let dummy = this.state.recipes.filter(rec => rec.name.split(' ').some(w => w.toLowerCase().startsWith(event.target.value.toLowerCase())))
            this.setState({
                filtered: dummy
            })
        }

        if (this.state.searchBy === 'tags') {
            let dummy = this.state.recipes.filter(rec => rec.tags.some(tag => tag.toLowerCase().startsWith(event.target.value.toLowerCase())));
            this.setState({
                filtered: dummy
            })
        }

        if (this.state.searchBy === 'author') {
            let dummy = this.state.recipes.filter(rec => rec.user.username.toLowerCase().startsWith(event.target.value.toLowerCase()));
            this.setState({
                filtered: dummy
            })
        }

    }

    render() {
        return (
            <div className="recipes">
                <div className="row">
                    <h3 className="col s11">All Recipes</h3>
                    <div className="col s1">
                        <Link to="/add" className="btn-floating btn-large teal modal-trigger">
                            <i className="material-icons">add</i>
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s2">
                        <select ref={(select) => { this.select = select }} onChange={this.serchByChange}>
                            <option value="name" defaultValue>Name</option>
                            <option value="author">Author</option>
                            <option value="tags">Tags</option>
                        </select>
                        <label>Search by</label>
                    </div>
                    <div className="input-field col s5">
                        <i className="material-icons prefix">search</i>
                        <textarea id="icon_prefix2" onChange={this.search} className="materialize-textarea"></textarea>
                        <label htmlFor="icon_prefix2">Search recipes</label>
                    </div>
                </div>

                <div className="row">
                    {
                        this.state.filtered.map(recipe =>
                            <div className="card horizontal col s12" key={recipe._id}>
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" alt="" src={recipe.photo} />
                                </div>
                                <div className="card-stacked">
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">{recipe.name}<i className="material-icons right">more_vert</i></span>
                                        <p><span><span className="bold">Author:</span> {recipe.user.username}</span></p>
                                        <p><span><span className="bold">Time:</span> {recipe.time_to_cook} minutes</span></p>
                                        <p><span><span className="bold">Tags:</span> {recipe.tags.map((tag, index) => <span key={index}> {tag}{recipe.tags[index + 1] ? "," : ""} </span>)
                                        } </span></p>
                                        <p><span><span className="bold">Products:</span> {recipe.products.map((prod, index) => <span key={index}> {prod}{recipe.products[index + 1] ? "," : ""} </span>)
                                        } </span></p>
                                        <p><span> <span className="bold">Short Desctiption:</span> {recipe.short_description}</span></p>
                                        <div className="card-action">
                                            <a onClick={() => this.edit(recipe._id)}>Edit</a>
                                            <a onClick={() => this.delete(recipe._id)}>Delete</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">{recipe.name}<i className="material-icons right">close</i></span>
                                    <p>{recipe.long_description}</p>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);