import { COUNTER_CHANGE, DECREMENT_COUNTER, INCREMENT_COUNTER } from '../constants';
const initialState = {
    count: 0
};
const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTER_CHANGE:
            return {
                ...state,
                count: action.payload
            };
        case INCREMENT_COUNTER:
            return {
                ...state,
                count: ++action.payload
            };
        case DECREMENT_COUNTER:
            return {
                ...state,
                count: --state.count
            };
        default:
            return state;
    }
}
export default countReducer;