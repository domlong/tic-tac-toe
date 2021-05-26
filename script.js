const gameBoard = (() => {
    let grid = new Array(9);
    let winner = 'test failed';

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
        // return (str === 'XXX' || str === 'OOO');
    };

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

    return {getWinner, getGrid, play, winState}
})();

const Player =  (mark) => {
    this.mark = mark;
    const getMark = () => mark;
    return {getMark}
}

const displayController = (() => {
    let squares = document.querySelectorAll('.square');
    let announcer = document.querySelector('#announcer')

    const chooseSquare = (e) => {
        gameEngine.playRound(e.target.dataset.index);
        updateBoard();
    }

    const markSquare = (mark, i) => {
        squares.item(i).textContent = mark;
    }
    
    const updateBoard = () => {
        gameBoard.getGrid().forEach(markSquare)
    }

    const announce = (text) => {
        announcer.textContent = text;
    }

    squares.forEach(square => square.addEventListener('click', chooseSquare, {'once': true}))

    return {updateBoard, announce}
})();


const gameEngine = (() => {
    const players = [Player('X'), Player('O')];
    let currentPlayer = 0;

    const playRound = (index) => {
        gameBoard.play(players[currentPlayer].getMark(), index);
        currentPlayer = (currentPlayer + 1) % players.length;
        if (gameBoard.winState()) {
            displayController.announce(`Player ${gameBoard.getWinner() + 1} wins!`)
        }
    }

    // const getPlayerByMark = (mark) => {
    //     return players.findIndex(mark);
    // }

    const getPlayerMarks = () => {
        return players.map(player => player.getMark());
    }

    return {playRound, getPlayerMarks}
})();