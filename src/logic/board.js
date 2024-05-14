//este metodo recibe el tablero a chequear 

import { WINNER_COMBOS } from '../constants.js'

export const checkWinnerFrom  = (boadrToCheck) => {
    for(const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if(
            //aqui comparamos el valor de cada combinacion para saber si hay un ganador 
            boadrToCheck[a] &&
            boadrToCheck[a] === boadrToCheck[b]&&
            boadrToCheck[a] && boadrToCheck[c]
        ) {
            return boadrToCheck[a] //devuelve quien es el ganador
        }
    }
    return null //si no hay ganador
} 

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !==null)
    // si todas las posiciones del tablero son diferentes a null, significa que el juego ha terminado
}