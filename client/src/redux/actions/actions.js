import axios from 'axios'
export const GET_ALL='GET_ALL'
export const GET_BY_NAME = 'GET_BY_NAME'
export const GET_BY_ID = 'GET_BY_ID'
export const ORDER_NAME = 'ORDER_NAME'
export const ORDER_STRENGTH = 'ORDER_STRENGTH'
 export const getPokemon= async function(){
  
     return function(dispatch ){
         const result=await axios.get('http://localhost:3001/pokemon/All')
         dispatch({type:GET_ALL, payload:result.data })
     } 
 }


 export const getByName= async function(name){
  
    return function(dispatch ){
        const result=await axios.get('http://localhost:3001/pokemon/?name'+name)
        dispatch({type:GET_BY_NAME, payload:result.data })
    } 
}


export  function order(array,order){
    if(order==='asc'){
        return{type:ORDER_NAME,payload:array.sort((a, b) => {
                if(a.Nombre < b.Nombre) return 1;
                if(a.Nombre > b.Nombre) return -1;
                return 0;
             })
        }
    }else{
        return{type:ORDER_NAME,payload:array.sort((a, b) => {
                if(a.Nombre < b.Nombre) return -1;
                if(a.Nombre > b.Nombre) return 1;
                return 0;
            })
        }
    }    
}



export const getById= async function(id){
  
    return function(dispatch ){
        const result=await axios.get('http://localhost:3001/pokemon/'+id)
        dispatch({type:GET_BY_ID, payload:result.data })
    } 
}