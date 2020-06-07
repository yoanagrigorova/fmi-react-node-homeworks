import React from "react"
import "./Recipes.css"
import M from 'materialize-css'
import { checkSession, addRecipe, editRecipe, getRecipes } from "../actions/index"
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
        addRecipe: (recipe) => dispatch(addRecipe(recipe)),
        editRecipe: (recipe) => dispatch(editRecipe(recipe)),
        getRecipes: () => dispatch(getRecipes())
    };
}

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.isEdit = props.location.state ? props.location.state.isEdit : false;
        this.state = {
            currentUser: this.props.currentUser ? this.props.currentUser : null,
            recipes: this.props.recipes ? this.props.recipes : [],
            recipe: this.isEdit ? props.location.state.recipe : {
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
            }
        }

        this.chip = "";
    }

    componentDidMount() {

        if (!this.props.recipes.length) {
            this.props.getRecipes().then(data => {
                this.setState({
                    recipes: data.data
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

        new M.CharacterCounter(this.short)
        new M.CharacterCounter(this.long)
        if (this.isEdit) {
            M.updateTextFields();
            let data = [];
            let tags = [];
            this.state.recipe.products.forEach((prod, index) => data.push({ tag: prod, id: index }))
            this.state.recipe.tags.forEach((tag, index) => tags.push({ tag: tag, id: index }))

            M.Chips.init(this.chips, {
                placeholder: "Add products",
                data: data,
                onChipDelete: () => {
                    this.setState({
                        recipe: {
                            ...this.state.recipe,
                            products: data.map(d => d.tag)
                        }
                    })
                },
                onChipAdd: () => {
                    this.setState({
                        recipe: {
                            ...this.state.recipe,
                            products: data.map(d => d.tag)
                        }
                    })
                }
            })
            M.Chips.init(this.tags, {
                placeholder: "Add tags",
                data: tags,
                onChipDelete: () => {
                    this.setState({
                        recipe: {
                            ...this.state.recipe,
                            tags: tags.map(d => d.tag)
                        }
                    })
                },
                onChipAdd: () => {
                    this.setState({
                        recipe: {
                            ...this.state.recipe,
                            tags: tags.map(d => d.tag)
                        }
                    })
                }
            })
        } else {
            M.Chips.init(this.chips, {
                placeholder: "Add products",
                onChipAdd: (chip) => {
                    this.setState({
                        recipe: {
                            ...this.state.recipe,
                            products: chip[0].M_Chips.chipsData.map(d => d.tag)
                        }
                    })
                },
                onChipDelete: (chip) => {
                    this.setState({
                        recipe: {
                            ...this.state.recipe,
                            products: chip[0].M_Chips.chipsData.map(d => d.tag)
                        }
                    })
                }
            })
            M.Chips.init(this.tags, {
                placeholder: "Add tags",
                onChipAdd: (chip) => {
                    this.setState({
                        recipe: {
                            ...this.state.recipe,
                            tags: chip[0].M_Chips.chipsData.map(d => d.tag)
                        }
                    })
                },
                onChipDelete: (chip) => {
                    this.setState({
                        recipe: {
                            ...this.state.recipe,
                            tags: chip[0].M_Chips.chipsData.map(d => d.tag)
                        }
                    })
                }
            })
        }

    }

    handleChange = (event) => {
        this.setState({
            recipe: {
                ...this.state.recipe,
                [event.target.id]: event.target.value
            }
        });
    }


    createRecipe = (e) => {
        e.preventDefault();
        let recipe = {
            ...this.state.recipe,
            time_of_creation: new Date().toString()
        }
        this.props.addRecipe(recipe).then(() => {
            this.props.getRecipes().then(recipes => {
                this.setState({
                    recipes: recipes.data
                })
                this.props.history.push("/recipes");
            })
        })
        
    }

    editRecipe = (e) => {
        e.preventDefault();
        let recipes = [...this.state.recipes];
        let index = recipes.findIndex(rec => rec.id === this.state.recipe.id)
        recipes[index] = {
            ...this.state.recipe,
            time_of_modification: new Date().toString()
        };
        this.props.editRecipe(recipes[index]).then((recipe) => {
            this.props.getRecipes().then(recipes => {
                this.setState({
                    recipes: recipes.data
                })
                M.toast({html: `Recipe for ${recipe.data.name} was edited!`});
                this.props.history.push("/recipes");
            })
        })
    }

    render() {
        return (
            <div className="edit">
                <div id="addRecipe">
                    <form onSubmit={this.isEdit ? this.editRecipe : this.createRecipe}>
                        <div className="content">
                            {
                                this.isEdit ?
                                    <h4>Edit Recipe</h4> :
                                    <h4>Add New Recipe</h4>
                            }
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="name" type="text" required className="validate" onChange={this.handleChange} value={this.state.recipe.name} />
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="photo" type="text" required className="validate" onChange={this.handleChange} value={this.state.recipe.photo} />
                                    <label htmlFor="photo">Photo</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="short_description" ref={(short) => { this.short = short }} className="materialize-textarea" data-length="256" onChange={this.handleChange}
                                        value={this.state.recipe.short_description}></textarea>
                                    <label htmlFor="short_description">Short Description</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="long_description" ref={(long) => { this.long = long }} required className="materialize-textarea" data-length="2048" onChange={this.handleChange}
                                        value={this.state.recipe.long_description}></textarea>
                                    <label htmlFor="long_description">Long Description</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="time_to_cook" type="number" className="validate" onChange={this.handleChange} value={this.state.recipe.time_to_cook} />
                                    <label htmlFor="time_to_cook">Time to Cook</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="chips chips-placeholder" ref={(chips) => { this.chips = chips }}>
                                    <input id="products" className="custom-class" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="chips chips-placeholder" ref={(tags) => { this.tags = tags }}>
                                    <input id="tags" className="custom-class" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ padding: "30px" }}>
                            {
                                this.isEdit ?
                                    <button className="btn waves-effect waves-light" type="submit" name="action">Edit
                            <i className="material-icons right">send</i>
                                    </button> :
                                    <button className="btn waves-effect waves-light" type="submit" name="action">Add
                            <i className="material-icons right">send</i>
                                    </button>
                            }
                            <span className="modal-close btn-flat">Cancel</span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);