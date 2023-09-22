import { useEffect, useState } from "react"
import axios from "axios"
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    const [pokemonlist,setpokemonlist]=useState([]);
    const [isLoading,setisLoading]=useState(true);
    const[pokedexurl,setpokedexurl]=useState("https://pokeapi.co/api/v2/pokemon")
    const [nexturl,setnexturl]=useState("");
    const [preurl,setpreurl]=useState("")

    async function downloadPokemon(){
        setisLoading(true)
        const response= await axios.get(pokedexurl) //this download list of 20 pokemon
        const pokemonResults=response.data.results; //we get array of pokemon in result
        setnexturl(response.data.next)
        setpreurl(response.data.previous)
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
    },[pokedexurl])
    return(
    <div className="pokemon_list_wrapper">
    <div>list of pokemon</div>
    <div className="pokemon_wrapper">
    {
        (isLoading)?"Loading....":
        pokemonlist.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
    }
    </div>
    <div className="controls">
  <button  disabled={preurl==null} onClick={()=>{setpokedexurl(preurl)}}>Pre</button>
  <button disabled={nexturl==null} onClick={()=>{setpokedexurl(nexturl)
console.log("hiii")}}>Next</button>
    </div>
   
    </div>
    )
}
export default PokemonList