export default function Dice(props){
  const style={
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  return(
    <button 
      style={style} 
      value={props.value} 
      onClick={() => props.changeHeld(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
    ><span>{props.value}</span></button>
  )
}





