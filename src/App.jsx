import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Coustomroutes from './Routes/Customroutes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='outer_pokedex'>
    <h1 id="pokedex_heading">
      <Link to="/">Pokedex</Link></h1>
    <Coustomroutes/>
    
    </div>
  )
}

export default App
