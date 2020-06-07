import fetch from 'cross-fetch'

import {
    ADD_USER, LOGIN, CHECK_SESSION, SIGN_OUT, GET_USERS, EDIT_USER, DELETE_USER,
    ADD_RECIPE, EDIT_RECIPE, DELETE_RECIPE, GET_RECIPE, GET_RECIPES
} from "../constants";

// const API = window.location.host.indexOf("localhost") !== -1 ? "http://localhost:8000" : "https://homeworkserver62021.herokuapp.com";
const API = "https://homeworkserver62021.herokuapp.com"

function addUser(payload) {
    return { type: ADD_USER, payload };
}

export function createUser(data) {
    return (dispatch) => {
        return fetch( API + '/users/create', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch(addUser(data))
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }

}

export function getUsers() {
    return (dispatch) => {
        return fetch(API + '/users/all', {
            method: "GET",
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: GET_USERS, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }

}

export function login(data) {
    return (dispatch) => {
        return fetch(API + '/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: LOGIN, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }
}

export function checkSession() {
    return (dispatch) => {
        return fetch(API + '/users/checkSession', {
            method: "GET",
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: CHECK_SESSION, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }
}

export function signOut() {
    return (dispatch) => {
        return fetch(API + '/users/signOut', {
            method: "GET",
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: SIGN_OUT, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }
}

export function editUser(data) {
    return (dispatch) => {
        return fetch(API + '/users/edit', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: EDIT_USER, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }
}

export function deleteUser(id) {
    return (dispatch) => {
        return fetch(API + '/users/delete', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: DELETE_USER, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }
}

export function getRecipes() {
    return (dispatch) => {
        return fetch(API + '/recipes/all', {
            method: "GET",
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: GET_RECIPES, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }
}

export function getRecipe(recipeID) {
    return (dispatch) => {
        return fetch(API + '/recipes/recipe?recipeID='+recipeID, {
            method: "GET",
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: GET_RECIPE, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }
}

export function editRecipe(data) {
    return (dispatch) => {
        return fetch(API + '/recipes/edit', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: EDIT_RECIPE, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }
}

export function deleteRecipe(data) {
    return (dispatch) => {
        return fetch(API + '/recipes/delete', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: DELETE_RECIPE, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }
}

export function addRecipe(data) {
    return (dispatch) => {
        return fetch( API + '/recipes/create', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                return dispatch({ type: ADD_RECIPE, data })
            })
            .catch((error) => {
                console.log(error)
                console.error('Error:', error);
            });
    }

}