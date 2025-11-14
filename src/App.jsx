import Dice from "../components/Dice"
import { useState,useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import { useWindowSize } from 'react-use';

export default function App(){
  const [values,setValues] = useState( randomDiceArr() )
  const win = values.every(value => value.isHeld) && values.every(value => value.num === values[0].num)
  const { width, height } = useWindowSize();
  const ref = useRef(null)

  useEffect(() => {
    if(win) ref.current.focus()
  },[win])

  function randomDiceArr(){
    return new Array(10)
        .fill(0)
        .map(() => ({
          num: Math.floor(Math.random() * 6 + 1),
          isHeld: false,
          id: nanoid()
        }))
  }

  function changeHeld(id){
    setValues(prevArr => prevArr.map((arr) => {
      return arr.id===id? {...arr,isHeld:true} : arr
    }))
  }

  function changeArr(){
    setValues(prevArrs => prevArrs.map(arr => {
      return arr.isHeld===true? arr : {...arr,num:Math.floor(Math.random() * 6 + 1)}
    }))
  }

  const dices = values.map(value => <Dice 
      value={value.num} 
      key={value.id} 
      isHeld={value.isHeld} 
      changeHeld={changeHeld} 
      id={value.id}
  />)

  return(
    <main>
      {win && <Confetti width={width} height={height} />}
      <div aria-live="polite" className="sr-only">
        {win && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dices}
      </div>

      <button onClick={win?() => setValues(randomDiceArr):changeArr} ref={ref} className="btn-roll">{win?"New Game":"Roll"}</button>
    </main>
  )
}