
import { Routes ,Route } from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokedex";
import Pokemondetails from "../components/Pokemondetail/Pokemondetail";
function Coustomroutes(){
return(
<Routes>
    <Route path="/" element={<Pokedex/>}/>
    <Route path="/pokemon/:id" element={<Pokemondetails/>}/>
</Routes>
)
}
export default Coustomroutes;