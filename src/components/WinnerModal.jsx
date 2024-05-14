//ventana que aarece cuando hay un ganador  o un empate 

import { Square } from "./Square";

export function WinnerModal ({winner, resetGame}) {
    if(winner === null) return null
    return (
        //ventana que aparece cuando se gana o hay empate 
        <section className="winner">
         <div className="text">
            <h2>
                {
                    winner === false ? 'Empate': 'Ganador'
                }
            </h2>

            <header className="win">
                {winner && <Square>{winner}</Square>}
            </header>

            <footer>
                <button onClick={resetGame}>
                    empezar de nuevo
                </button>
            </footer>

         </div>
        </section>
    )
}