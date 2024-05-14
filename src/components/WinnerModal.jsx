import { Square } from './Square'

export function WinnerModal ({winner, resetGame}) {
    if(winner === null) return null
    return (
        //ventana que aparece una vez haya un ganador 

        <section className='winner'>
            <div className='text'>
                <h2>
                    {
                        winner === false
                        ? 'Empate'
                        : 'Ganó'
                    }
                </h2>
                <header className='win'>    
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