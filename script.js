const gameBoard = (() => {
    let grid = [[],[],[]];

    const play = (symbol, position) => {
        if(!grid[position]) {
            grid[position] = symbol;
        }
        return grid;
    };

    return {play}
})();

console.log(gameBoard.play('x',[2,1]));