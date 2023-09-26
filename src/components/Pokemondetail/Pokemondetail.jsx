

import { useParams } from "react-router-dom"
import "./Pokemondetail.css"
import usePokemondetails from "../../Hooks/usePokemondetails";
import Pokemon from "../Pokemon/Pokemon";
import { useEffect, useState } from "react";



function Pokemondetails({pokemonName}){
   
   

    const{id}=useParams();
    const [pokemon,pokemonliststate]=usePokemondetails(id,pokemonName);

    // const [pokemon,pokemonliststate]=usePokemondetails(id,pokemonName);
  
    
    
    
  
    return (
       <div className="pokemondetails_wrapper">
        
        <img className="pokemonimage" src={pokemon.image}/>
        <div className="pokemonname"><span>{pokemon.name}</span></div>
        <div className="pokemonname">Height:{pokemon.height}</div>
        <div className="pokemonname">Weight: {pokemon.weight}</div>
 
        <div className="pokemontypes">
            {pokemon.types && pokemon.types.map((t)=><div key={t}> {t} </div> )}
           
        </div>
        { pokemon.types && pokemon.similarpokemons&&
        
        <div className="samepoke">
            <p>more {pokemon.types[0]} type pokemon</p> 

            
            <ul className="listofpoke">
                {/* {pokemon.similarpokemons.map((p)=><li key={p.pokemon.name}>{p.pokemon.name}</li>)} */}
                {pokemon.similarpokemons.map((p)=>
                <li key={p.data.name}>
                    
                    {<Pokemon name={p.data.name} image={p.data.sprites.other.dream_world.front_default} id={p.data.id}/> }
                </li>)
                }
              
        

            </ul>
        </div>
        }
        
       </div>
    )
}
export default Pokemondetails