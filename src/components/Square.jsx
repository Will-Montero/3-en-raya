//este componente es cada cuadro del tablero del 3 en raya 

//square es cada cuadro
//children será X o O
//update es la actulizacion del tablero 
//isSelected es la parte visual del turno 

export const Square = ({ children, updateBoard, index, isSelected }) => {

    //aqui le decimos visualmente de quien es el turno 
    const className = `square ${isSelected ? 'isSelected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div onClick={handleClick} className={className}>
              {children}
        </div>
    )
}