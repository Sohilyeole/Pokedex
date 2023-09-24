import { useEffect, useState } from "react"
import axios from "axios"
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    // const [pokemonlist,setpokemonlist]=useState([]);
    // const [isLoading,setisLoading]=useState(true);
    // const[pokedexurl,setpokedexurl]=useState("https://pokeapi.co/api/v2/pokemon")
    // const [nexturl,setnexturl]=useState("");
    // const [preurl,setpreurl]=useState("")
    const[pokemonliststate,setpokemonliststate]=useState({
        pokemonlist:[],
        isLoading:true,
        pokedexurl:"https://pokeapi.co/api/v2/pokemon",
        nexturl:"",
        preurl:"",

    })

    async function downloadPokemon(){
        // setisLoading(true)
       setpokemonliststate({...pokemonliststate,isLoading:true})
        const response= await axios.get(pokemonliststate.pokedexurl) //this download list of 20 pokemon
        const pokemonResults=response.data.results; //we get array of pokemon in result
        // setnexturl(response.data.next)
        // setpreurl(response.data.previous)
        setpokemonliststate((state)=>({...state,nexturl:response.data.next,preurl:response.data.previous}))
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
        // setpokemonlist( pokelistresult);
        // setisLoading(false)
        // setpokemonliststate({...pokemonliststate,pokemonlist:pokelistresult,isLoading:false})
        setpokemonliststate((state)=>({...state,pokemonlist:pokelistresult,isLoading:false}))
        
    }
    useEffect(()=>{
        downloadPokemon();
    },[pokemonliststate.pokedexurl])
    return(
    <div className="pokemon_list_wrapper">
    <div>list of pokemon</div>
    <div className="pokemon_wrapper">
    {
        (pokemonliststate.isLoading)?"Loading....":
        pokemonliststate.pokemonlist.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
    }
    </div>
    <div className="controls">
  <button  disabled={pokemonliststate.preurl==null} onClick={()=>{setpokemonliststate({...pokemonliststate,pokedexurl:pokemonliststate.preurl})}}>Pre</button>
  <button disabled={pokemonliststate.nexturl==null} onClick={()=>{setpokemonliststate({...pokemonliststate,pokedexurl:pokemonliststate.nexturl})}}>Next</button>
    </div>
   
    </div>
    )
}
export default PokemonList