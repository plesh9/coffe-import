const SET_ACTIVE_NAVBAR = 'SET_ACRIVE_NAVBAR' 

let initialState = {
    navbarActive: false
}

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_NAVBAR:
            return{
                ...state,
                navbarActive: action.state
            }
            
        default: return state
    }
}

export const setNavbarActive = (state) => {
    return {type: SET_ACTIVE_NAVBAR, state}
}

export default navbarReducer;