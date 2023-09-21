import { useEffect, useState } from "react"
import axios from "axios"
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    const [pokemonlist,setpokemonlist]=useState([]);
    const [isLoading,setisLoading]=useState(true);

    async function downloadPokemon(){
        const response= await axios.get("https://pokeapi.co/api/v2/pokemon") //this download list of 20 pokemon
        const pokemonResults=response.data.results; //we get array of pokemon in result
        const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url)); //making array of these 20 pokemon url
        const pokemonData=await axios.all(pokemonResultPromise)//url se data la rahe hai 
        console.log(pokemonData);
        const pokelistresult =pokemonData.map((pokedata)=>{ //res name ka variable banya aur map lagaya

            const pokemon=pokedata.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
                type:pokemon.types

            }
        })
        console.log( pokelistresult)
        setpokemonlist( pokelistresult);
        setisLoading(false)
        
    }
    useEffect(()=>{
        downloadPokemon();
    },[])
    return(
    <div className="pokemon_list_wrapper">
    <div>list of pokemon</div>
    {
        (isLoading)?"Loading....":
        pokemonlist.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/>)
    }
    </div>
    )
}
export default PokemonList