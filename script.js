const gameBoard = (() => {
    let grid = new Array(9);
    let winner;

    const play = (mark, i) => {
        if(!grid[i]) {
            grid[i] = mark;
        }
        return grid;
    };

    const getGrid = () => grid;
    const getWinner = () => winner;

    const checkThree = (str) => {
        let marks = gameEngine.getPlayerMarks();
        for (let i=0; i<marks.length; i++) {
            if (str === marks[i].repeat(3)) {
                winner = i;
                return true;
            }
        }
    };

    const wipe = () => {
        grid.fill(undefined);
    }

    const winState = () => {
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

    return {getWinner, getGrid, play, winState, wipe}
})();

const Player =  (mark) => {
    this.mark = mark;
    const getMark = () => mark;
    return {getMark}
}




const gameEngine = (() => {
    const players = [Player('❌'), Player('⭕')];
    let currentPlayer = 0;

    const playRound = (index) => {
        gameBoard.play(players[currentPlayer].getMark(), index);
        currentPlayer = (currentPlayer + 1) % players.length;
        displayController.announce(`Player ${currentPlayer + 1}'s turn`)
        if (gameBoard.winState()) {
            displayController.announce(`Player ${gameBoard.getWinner() + 1} wins!`)
            displayController.disable();
        }

    }

    const getPlayerMarks = () => {
        return players.map(player => player.getMark());
    }

    const restart = () => {
        gameBoard.wipe();
        displayController.reset();
    }

    return {playRound, getPlayerMarks, restart}
})();

const displayController = (() => {
    let squares = document.querySelectorAll('.square');
    let announcer = document.querySelector('#announcer');
    let restart = document.querySelector('#restart');

    const chooseSquare = (e) => {
        gameEngine.playRound(e.target.dataset.index);
        updateBoard();
    }

    const markSquare = (mark, i) => squares.item(i).textContent = mark;
    
    const updateBoard = () => gameBoard.getGrid().forEach(markSquare);

    const announce = (text) => announcer.textContent = text;

    const disable = () => squares.forEach(square => square.removeEventListener('click', chooseSquare));

    const reset = () => {
        updateBoard();
        disable();
        enable();
        announce(`Player 1's turn`);
    }

    const enable = () => squares.forEach(square => square.addEventListener('click', chooseSquare, {'once': true}));

    restart.addEventListener('click', gameEngine.restart)
    enable();

    return {updateBoard, announce, disable, reset}
})();