import {Link} from 'react-router-dom'
import { searchByIdCountries } from '../../redux/actions/countryActions'
function Main({ pokemon, searchById }) {
   const handleClick = function () {
      searchById(pokemon.id)
   }

   return <div  id={pokemon.id} >
      <Link to={`/pokemon/${pokemon.id}`}><button onClick={() => handleClick()}>More</button></Link>
   
      <img src={pokemon.img} alt={pokemon.name} />  
      <h3>{pokemon.name}</h3>
      <h5 >Tipo:{pokemon.tipo.map(t=>{
         <p>{t}</p>
      })}</h5>
   </div>
}

export default Main