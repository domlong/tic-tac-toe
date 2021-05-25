const gameBoard = (() => {
    let grid = new Array(9);

    const play = (mark, i) => {
        if(!grid[i]) {
            grid[i] = mark;
        }
        return grid;
    };

    const getGrid = () => grid;

    const checkThree = (str) => {
        return (str === 'XXX' || str === 'OOO');
    };

    const winState = () => {
        // 3 in a row
        // 012
        // 345
        // 678

        // 3 column
        // 036
        // 147
        // 258

        // diagonal
        // 048
        // 246

        const winCondition = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        for(let i=0; i<winCondition.length; i++){
            if(checkThree(winCondition[i].map(i => grid[i]).join(''))) {
                return true
            }
        }

        return false;
    }

    return {getGrid, play, winState}
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
    gameBoard.play('X',0);
    gameBoard.play('O',2);
    gameBoard.play('X',7);
    gameBoard.play('O',8);


    // for(let i=0; i<9; i++){
    //     gameBoard.getGrid()[i]=i;
    // }
    displayController.updateBoard(gameBoard);
    console.log(gameBoard.winState());
})();