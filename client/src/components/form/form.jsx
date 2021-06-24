import {postPokemon} from '../../redux/actions/actions'
import {useDispatch,useSelector} from 'react-redux'
import { useState } from 'react'
import style from './style.module.css'
const Form =function(){
    const dispatch =useDispatch()
    const arrayTipos= useSelector(state=>state.tipos)
    const [value,setValue]=useState({
        nombre:'',
        fuerza:0,
        velocidad:0,
        defensa:0,
        vida:0,
        peso:0,
        altura:0,
        imagen:'',
        tipo:[]
    })
    
    const onChange=(e)=>{
         setValue(()=>{return{...value,[e.target.name]:e.target.value}})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(value)
      dispatch(postPokemon(value))
      document.getElementById("form").reset();
    }
    const onChangeTipo=(e)=>{
        console.log(typeof e.target.value )
         setValue(()=>{return{...value,[e.target.name]:value.tipo.concat( [e.target.value])}})
    }



    return <><form id="form" className={style.container} onSubmit={e=>handleSubmit(e)}> 
         <input className={style.input_text} type='text' placeholder='Nombre' name='nombre' onChange={e=>onChange(e)}/>
    
         <input className={style.input_text} type='number'  placeholder='Fuerza'name='fuerza'min="1" max="200" onChange={e=>onChange(e)} />
         <input className={style.input_number} type='number'  placeholder='Velocidad'name='velocidad' min="1" max="200" onChange={e=>onChange(e)} />
         <input className={style.input_number} type='number'  placeholder='Defensa'name='defensa' min="1" max="200" onChange={e=>onChange(e)} />
         <input className={style.input_number} type='number'  placeholder='Vida'name='vida' min="1" max="200" onChange={e=>onChange(e)} />
         <input className={style.input_number} type='number'  placeholder='Peso'name='peso' min="1" max="200" onChange={e=>onChange(e)} />
         <input className={style.input_number} type='number'  placeholder='Altura'name='altura' min="1" max="200" onChange={e=>onChange(e)} />
         <input className={style.input_text} type='text' placeholder='Imagen' name='imagen' onChange={e=>onChange(e)} />
         <select name='tipo' onChange={e=>onChangeTipo(e)} multiple={true}>          
         {arrayTipos.map(tipo=><option value={tipo.Nombre}>{tipo.Nombre}</option>)}
         </select>
         <input className={style.input_text} type="submit" placeholder="Agregar"  ></input></form>
    </>


}
export default Form;