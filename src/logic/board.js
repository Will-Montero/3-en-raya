// metodo que recibe el tablero para chequar 
import { WINNER_COMBOS } from "../constants";
 
export const checkWinnerFrom = (boardToCheck) => {
    for(const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if(
            //si a, b o c son x o o hay un ganador
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ){
            return boardToCheck[a]
        }
    }
    return null
}

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
    //una vez todas las posiciones sean diferentes a null, el juego ha terminado 
}