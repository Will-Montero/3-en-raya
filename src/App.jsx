import { useState } from 'react'
import { TURNS } from './constants'
import { Square } from './components/Square'
import { checkEndGame, checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import './App.css'
import confetti from 'canvas-confetti'

function App() {

  //inicio de partida con valores nuevos o guardados
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
   if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
   
  ///estado que medice de quien es el turno 
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  })

  //con este estado para saber si hay un ganador o hay un empate (null)
  const [winner, setWinner] = useState(null)

  //aqui reseteamos el juego con lo svalores por defecto de null
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }


  //parte importante ya que esta nos permite saber quien es el ganador, turnos, actuliza los turnos y cabia de estados
  const updateBoard = (index) => {

    //evitamos que se sobreescriba y que no se pueda escribir mas si ya hay un ganador
    if(board[index] || winner) return


    //usamos spredOperator para tratar los estados como inmutables y que no se sobreescriba sobre lo que ya hay
    const newBoard = [...board]

    newBoard[index] = turn  //el newBoard recibe el valor del indice del turno actual y asu cuando se de click en esa posicion se guarda el turno 

    setBoard(newBoard) //aqui actualizamos el board


    //aqui decimos de quien es el turno, si de las X  o O
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

    setTurn(newTurn) //se actualiza el nuevo valor



    // antes de saber si hay un ganador vamos a guardar la partida en el localStorage para saber si queda a medio jugar y una vez se ingrese de nuevo, esta siga tal y como la dejó el jugador
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //lee el tablero actualizado para saber si hay un ganador y actualiza las posiciones 
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){ //si hay un ganador saldra confeti 
      confetti()
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)){
      setWinner(false) //si no hay ganador, seguirá el turno 
    }
  }



  return (
   <main className='board'>
    <h1>3 en raya</h1>
    <button onClick={resetGame}> comezar de nuevo</button>
    <section className='game'>
      {board.map((_, index) => {
        return (
          <Square
          key={index}
          index={index}
          updateBoard={updateBoard}
          >
            {board[index]}
          </Square>
        )
      })}
    </section>

    <section className='turn'>
<Square isSelected={turn === TURNS.X}> {TURNS.X}</Square>
<Square isSelected={turn === TURNS.O}> {TURNS.O}</Square>
    </section>


<WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
   </main>
  )
}

export default App
