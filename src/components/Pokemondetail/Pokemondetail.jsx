import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "./Pokemondetail.css"

function Pokemondetails(){
    const {id}=useParams();
    const [pokemon,setpokemon]=useState({})

    async function downloadpokemon(){

    const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setpokemon({
        name:response.data.name,
        image:response.data.sprites.other.dream_world.front_default,
        weight:response.data.weight,
        height:response.data.height,
        types:response.data.types.map((t)=>t.type.name)
        
    })
    }
    useEffect(()=>{
        downloadpokemon()
    },[])
    return(
       <div className="pokemondetails_wrapper">
        
        <img className="pokemonimage" src={pokemon.image}/>
        <div className="pokemonname"><span>{pokemon.name}</span></div>
        <div className="pokemonname">Height:{pokemon.height}</div>
        <div className="pokemonname">Weight: {pokemon.weight}</div>
        <div className="pokemontypes">
            {pokemon.types && pokemon.types.map((t)=><div key={t}> {t} </div> )}
            
        </div>
       </div>
    )
}
export default Pokemondetails