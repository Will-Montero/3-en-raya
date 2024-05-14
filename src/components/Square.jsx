//este componente es cada cuadro del tablero

export const Square =({ children, updateBoard, index, isSelected}) => {

    //la propiedad children es X o O 
    //updateBoard es la actualizacion del tablero una vez damos click
    ///indcice es para saber cual es el indice del tablero 
    //isSelected es la parte visual de los turnos 


const className = `square ${isSelected ? 'is-selected' : ''}`
//aqui le enseñamos de manera visual de quien es el turno

const handleClick = () => {
    updateBoard(index)
}

return <div onClick={handleClick} className={className}>
    {children}
</div>
}