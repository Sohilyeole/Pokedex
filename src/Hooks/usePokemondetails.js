import axios from "axios"
import { useState ,useEffect} from "react";

function usePokemondeatil(id,pokemonName){
    
    const [pokemon,setpokemon]=useState({});
  
    async function downloadpokemon(){
        try {let response;
            if(pokemonName){
                 response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    
            }
            else{
                response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            }
            
    
            const pokemonofsametype= await  axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name:""}`);
            
          
           
          
    
            // const response= await axios.get(pokemonliststate.pokedexurl)
            // const pokemonresult=response.data.results
            setpokemon((state)=>({
                ...state,
                name:response.data.name,
                image:response.data.sprites.other.dream_world.front_default,
                weight:response.data.weight,
                height:response.data.height,
                types:response.data.types.map((t)=>t.type.name),
                similarpokemons:pokemonofsametype.data.pokemon.slice(0,10),
                
                
            }));
           
    setpokemonliststate({...pokemonliststate ,type:response.data.types?response.data.types[0].type.naame:"" })
            
        } catch (error) {
            console.log("something webt wrong")
        }
        
       
    }
   const [pokemonliststate,setpokemonliststate]=useState({})
    useEffect(()=>{
        downloadpokemon();
       
    },[])
    return [pokemon]
}
export default usePokemondeatil;