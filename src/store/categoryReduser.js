const defaultState = { 
    selectedСategory: 'All'
}

const SET_CATEGORY = "SET_CATEGORY";
  
export const categoryReduser = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return {...state, selectedСategory: action.payload};
        default:
        return state;
    }
}
  
export const setCategoryAction = (payload) => ({type: SET_CATEGORY, payload});
