const gameBoard = (() => {
    let grid = new Array(9);

    const play = (mark, i) => {
        if(!grid[i]) {
            grid[i] = mark;
        }
        return grid;
    };

    const getGrid = () => grid;

    return {getGrid, play, grid}
})();

const Player =  (num, mark) => {
    this.num = num;
    this.mark = mark;
    const getNum = () => num;
    const getMark = () => mark;
    return {getNum, getMark}
}

const displayController = (() => {
    let squares = document.querySelectorAll('.square');

    const markSquare = (mark, i) => {
        squares.item(i).textContent = mark;
    }
    
    const updateBoard = (board) => {
        board.getGrid().forEach(markSquare)
    }

    return {updateBoard}
})();


const gameEngine = (() => {
    const player1 = Player(1, 'X');
    const player2 = Player(2, 'O');
    gameBoard.play('X',4);
    gameBoard.play('O',5);
    gameBoard.play('X',1);
    gameBoard.play('O',7);
    displayController.updateBoard(gameBoard);
})();