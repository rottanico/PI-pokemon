import Main from './CardCountry'
function cards() {
  
  return <div>{
        pokemones&& pokemones.map(pokemon=> {
          return  <Main pokemon={pokemon} />
         })
         }
         <hr/>
     </div>}
     
export default cards;

