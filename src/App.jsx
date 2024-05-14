import { useState  } from "react";
import { Square } from "./components/Square";
import { TURNS } from './constants'
import { checkWinnerFrom, CheckEndGame} from './logic'
import { WinnerModal } from "./components/WinnerModal";
import confetti from "canvas-confetti";

function App(){
  //se dibuja el tablero de  9 posiciones 

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
  }
// aqui inicializamos el juego, si hay una partida guaradda, inicia con esos valores, de lo caontrario iniciará con los valores por defecto(vacio)
)

const[turn, setTurn] = useState(() => {
  const turnFromLocalStorage = window.localStorage.getItem('turn')
  return turnFromLocalStorage ?? TURNS.X
}
//aqui comenzamos con el turno de las x pero si ya hay una partida guardada, usara el turno que quedo de ultimo
)

const [winner, setWinner] = useState(null)
//esta constante es para saber cuando hay un ganador o si hay un empate


//aqui reseteamos el juego con lo svalores por defecto 
const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)

  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}

const updateBoard = (index) => {
  //esta constante es una de lasmas importantes porque  actualiza los estados, mira los turnos, me dice qcual es el ganodr, etc


  if(board[index] || winner) return 
  //aqui evitamos que se sobreescriba y no se vuelva a actualizar si ya hay un ganador 


  const newBoard = [... board] //usamos un spreadOperator para usar un nuevo tablero y tratar los estados com inmutables

  newBoard[index] = turn //el nuevo board recibe el indice actual y guarda el turno 

  setBoard(newBoard) //aqui actualizamos el board

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  //si el turno es de las x, seguira o

  setTurn(newTurn) //actualizamos el turno

  //guardamos la partida si queda a medias y esto lo hacemos antes de saber si ya hay un ganador

  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', newTurn)

  const newWinner = checkWinnerFrom(newBoard) //checamos si hay un ganador pasandole la newBoard
  if(newWinner){
    confetti()
    setWinner(newWinner)
  }else if(CheckEndGame(newBoard)){
    setWinner(false) //cheacamos si hay un empate para reinciar el juego
  }

}

return (
  
  <main className="board">
    <h1>3 en raya </h1>
    <button onClick={resetGame}> comenzar de nuevo </button>
    <section className="game"> 
      

    </section>
  </main>
)
}

