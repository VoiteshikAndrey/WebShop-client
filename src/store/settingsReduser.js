const defaultState = { 
    selectedСurrency : 'USD',
    currencies: {
        'USD': {
            rate: 1,
            symbol: '$'
        },
        'EUR': {
            rate: 0.8917,
            symbol: '€'
        },
        'JPY': {
            rate: 115.71,
            symbol: '¥'
        }
    }
}

const SET_CURRENCY = "SET_CURRENCY";
  
export const settingsReduser = (state = defaultState, action) => {
    switch (action.type) { 
        case SET_CURRENCY:
            return {...state, selectedСurrency: action.payload};
        default:
        return state;
    }
}
  
export const setCurrencyAction = (payload) => ({type: SET_CURRENCY, payload});
