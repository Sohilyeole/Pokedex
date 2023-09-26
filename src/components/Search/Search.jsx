
import useDebounce from "../../Hooks/useDebounce";
import "./Search.css"

function Search({updatesearch}){
    const debouncecallback=useDebounce((e)=>updatesearch(e.target.value))

return(
    <div className="search_wrapper">
    <input
    type="text"
    id="pokemon-name-search"
    placeholder="pokemon name..."
    onChange={(e)=>debouncecallback(e,"123")}

    />
   
    </div>
)
}
export default Search;