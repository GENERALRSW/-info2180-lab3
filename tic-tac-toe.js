const player_x = "X";
const player_y = "O";
let count_x = 0;
let count_x_list = [];
let count_y = 0;
let count_y_list = [];
let c_player = player_x;
let gameOver = false;  // Added gameOver flag

let arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

const win = (player, player_list) => {
    player_list.sort((a, b) => a - b);
    console.log(player_list + " player list");
    const win_list = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let win of win_list) {
        console.log(win + " win");
        if (arraysEqual(player_list, win)) {
            console.log(`${player} wins!`);
            return true;
        }
        let match_count = 0;
        for (let i = 0; i < win.length; i++) {
            if (player_list.includes(win[i])) {
                match_count++;
            }
            if (match_count === 3) {
                console.log(`${player} wins!`);
                return true;
            }
        }
    }

    return false;
}

document.addEventListener("DOMContentLoaded", () => {
    const squares = document.getElementById("board").querySelectorAll("div");
    squares.forEach((square, index) => {
        square.classList.add("square");
        square.addEventListener("click", () => {
            // Check if game is over or square is already filled
            if (gameOver || square.textContent !== "") {
                return;
            }
            if (c_player === player_x) {
                count_x_list.push(index);
                square.textContent = player_x;
                square.classList.add("X");
                count_x += 1;
                if (count_x >= 3) {
                    if (win(player_x, count_x_list)) {
                        document.getElementById("status").textContent = `Congratulations! ${player_x} is the Winner!`;
                        document.getElementById("status").classList.add("you-won");
                        gameOver = true;  // Set gameOver to true when X wins
                        return;
                    }
                }
                c_player = player_y;
            } else if (c_player === player_y) {
                count_y_list.push(index);
                square.textContent = player_y;
                square.classList.add("O");
                count_y += 1;
                if (count_y >= 3) {
                    if (win(player_y, count_y_list)) {
                        document.getElementById("status").textContent = `Congratulations! ${player_y} is the Winner!`;
                        document.getElementById("status").classList.add("you-won");
                        gameOver = true;  
                        return;
                    }
                }
                c_player = player_x;
            }
            if ((count_x + count_y >= 9) && !win(player_y, count_y_list) && !win(player_x, count_x_list)) {
                document.getElementById("status").textContent = "Game ends in a draw!";
                gameOver = true;  
            }
        });

        square.addEventListener("mouseover",() =>{
            if (!gameOver && square.textContent === "") {  
                square.classList.add("hover");
            }
        });

        square.addEventListener("mouseout",()=>{
            square.classList.remove("hover");
        });
    });

    document.querySelector("button").addEventListener("click", () => {
        squares.forEach(square => {
            square.textContent = "";
            square.classList.remove("X", "O");
            document.getElementById("status").textContent = "";
            count_x = 0;
            count_x_list = [];
            count_y = 0;
            count_y_list = [];
            c_player = player_x;
            gameOver = false; 
            document.getElementById("status").classList.remove("you-won");
            document.getElementById("status").textContent = "Move your mouse over a square and click to play an X or an O.";
        });
    });
});