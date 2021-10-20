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
        gameEngine.restart();
        updateBoard();
        disable();
        enable();
        announce(`Player 1's turn`);
    }

    const enable = () => squares.forEach(square => square.addEventListener('click', chooseSquare, {'once': true}));

    restart.addEventListener('click', reset)
    enable();

    return {updateBoard, announce, disable, reset}
})();

const gameEngine = (() => {
    const players = [Player('X'), Player('O')];
    let currentPlayer = 0;
    displayController.announce(`${players[currentPlayer].getMark()} Player ${currentPlayer+1}'s turn`)

    const playRound = (index) => {
        gameBoard.play(players[currentPlayer].getMark(), index);
        if (gameBoard.winState()) {
            displayController.announce(`${players[currentPlayer].getMark()} Player ${gameBoard.getWinner() + 1} wins!`)
            displayController.disable();
            return;
        }
        currentPlayer = (currentPlayer + 1) % players.length;
        displayController.announce(`${players[currentPlayer].getMark()} Player ${currentPlayer+1}'s turn`)
    }

    const getPlayerMarks = () => {
        return players.map(player => player.getMark());
    }

    const restart = () => {
        currentPlayer = 0;
        gameBoard.wipe();
    }

    return {playRound, getPlayerMarks, restart}
})();