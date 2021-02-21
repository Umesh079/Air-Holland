import  { COUNTER_CHANGE, DECREMENT_COUNTER, INCREMENT_COUNTER } from "../constants";

export function changeCount(count) {
    return{
        type:COUNTER_CHANGE,
        payload:count
    }
}

export function incrementCount(count) {
    return{
        type:INCREMENT_COUNTER,
        payload:count
    }
}

export function decrementCount() {
    return{
        type:DECREMENT_COUNTER
    }
}