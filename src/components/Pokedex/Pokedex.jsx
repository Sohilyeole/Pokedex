import { useEffect, useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css"
import Pokemondetails from "../Pokemondetail/Pokemondetail";

function Pokedex(){
    const [serachterm,setsearchterm]=useState("");
    useEffect(()=>{},[serachterm])
return(
    <div className="pokedex_wrapper">

    <Search updatesearch={setsearchterm}/>
  
    {(!serachterm)? <PokemonList/> :<Pokemondetails key={serachterm} pokemonName={serachterm}/>}
    </div>
)
}
export default Pokedex;