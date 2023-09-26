import { useState,useEffect } from "react"
import axios from "axios";

function usePokemonlist(type){
    const[pokemonliststate,setpokemonliststate]=useState({
        pokemonlist:[],
        isLoading:true,
        pokedexurl:"https://pokeapi.co/api/v2/pokemon",
        nexturl:"",
        preurl:"",

    })
    async function downloadPokemon(){
        // setisLoading(true)
       setpokemonliststate((state)=>({...state,isLoading:true}))
        const response= await axios.get(pokemonliststate.pokedexurl) //this download list of 20 pokemon
        const pokemonResults=response.data.results; //we get array of pokemon in result
        // setnexturl(response.data.next)
        // setpreurl(response.data.previous)
        setpokemonliststate((state)=>({...state,nexturl:response.data.next,preurl:response.data.previous}))

        if(type){
            setpokemonliststate((state)=>({
                ...state,
                pokemonlist:response.data.pokemon.slice(0,5)


            }))
        }
        else{
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
    }
    useEffect(()=>{
        downloadPokemon();
    },[pokemonliststate.pokedexurl])

    return [pokemonliststate,setpokemonliststate]
}

export default usePokemonlist;