import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './Board'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>Memory Card Game</h2>
      <p>Click on each GIF only once</p>
      <Board/>
    </>
  )
}

export default App
