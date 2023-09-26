import axios from "axios"
import { useState ,useEffect} from "react";
function randomgenrate(){
    const max=50;
    const min=0;
    const a = Math.floor(Math.random() * (max - min + 1)) + min;
    return a
}

function usePokemondeatil(id,pokemonName){
  
    const [pokemon,setpokemon]=useState({});
   
    
  
    async function downloadpokemon(){
        try {
            let response;
            if(pokemonName){
                 response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
               console.log("fa;lse")
            }
            else{
                response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                console.log("true")
            }
            
    
           
            const pokemonofsametype= await  axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name:""}`);
            const random=randomgenrate()
            const arrayof10pokemon=pokemonofsametype.data.pokemon.slice(random,random+12)

            const newpromisefor10poke= arrayof10pokemon.map((el)=>  axios.get(el.pokemon.url));
            const pokemonDataOf10Poke=await axios.all(newpromisefor10poke)
          
          
           
          
    
            // const response= await axios.get(pokemonliststate.pokedexurl)
            // const pokemonresult=response.data.results
            setpokemon((state)=>({
                ...state,
                name:response.data.name,
                image:response.data.sprites.other.dream_world.front_default,
                weight:response.data.weight,
                height:response.data.height,
                types:response.data.types.map((t)=>t.type.name),
                // similarpokemons:pokemonofsametype.data.pokemon.slice(0,10),
                similarpokemons:pokemonDataOf10Poke
                
                
            }));
           
    setpokemonliststate({...pokemonliststate ,type:response.data.types?response.data.types[0].type.naame:"" })
            
        } catch (error) {
            console.log("something webt wrong")
        }
        
       
    }
   const [pokemonliststate,setpokemonliststate]=useState({})
    useEffect(()=>{
        downloadpokemon();
       
    },[id])
    return [pokemon]
}
export default usePokemondeatil;