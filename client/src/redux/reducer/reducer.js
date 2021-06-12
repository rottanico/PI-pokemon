import {GET_BY_NAME,GET_BY_ID,GET_ALL,ORDER_NAME} from '../actions/actions.js';

const defaultValue={
    pokemon:[],
    obj:{
        current:0,
        order:'ASC',
    },
    pokemonSearch:{},
    pokemonId:{}
}

export default reducer=(state=defaultValue,action)=> {
switch(action.type){
    case GET_ALL:{
        return { ...state, pokemon:action.payload}
    }
    case GET_BY_ID:{
        return { ...state, pokemonId:action.payload}
    }
    case GET_BY_NAME:{
        return { ...state,pokemonSearch:action.payload}
    }
    case ORDER_NAME:{
        return{...state,pokemonSearch:action.payload}
    }
    default:{return state}
}
}