// $(document).ready(function() {
//     let currentPlayer = "X";
//     let board = ["", "", "", "", "", "", "", "", ""];
//     let gameActive = true;

//     function checkWin() {
//         const winningCombinations = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6]
//         ];

//         return winningCombinations.some(combination => {
//             if (board[combination[0]] === board[combination[1]] && board[combination[1]] === board[combination[2]]) {
//                 return board[combination[0]];
//             } else {
//                 return false;
//             }
//         });
//     }

//     function updateBoard(index) {
//         board[index] = currentPlayer;
//     }

//     $('.cell').click(function() {
//         const cellIndex = $(this).data('cell-index');

//         if (board[cellIndex] !== "" || !gameActive) {
//             return;
//         }

//         updateBoard(cellIndex);
//         $(this).text(currentPlayer);

//         if (checkWin()) {
//             alert(`${currentPlayer} wins!`);
//             gameActive = false;
//             return;
//         }

//         currentPlayer = currentPlayer === "X" ? "O" : "X";
//     });

//     $('#restartButton').click(function() {
//         $('.cell').text('');
//         board = ["", "", "", "", "", "", "", "", ""];
//         currentPlayer = "X";
//         gameActive = true;
//     });
// });

$(document).ready(function() {
    let currentPlayer = 'X';  // Player is always 'X', AI is 'O'
    let board = ['', '', '', '', '', '', '', '', ''];
    let hasWinner = false;

    function aiMove() {
        // Simple AI: random move
        let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        if (availableCells.length > 0) {
            let aiCellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            board[aiCellIndex] = 'O';
            $(`.cell:eq(${aiCellIndex})`).text('O');
            if (checkWinner('O')) {
                $('#statusArea').text('AI wins!');
                hasWinner = true;
                return;
            }
        }
        currentPlayer = 'X';
        $('#statusArea').text('Your turn!');
    }

    $('.cell').click(function() {
        let cellIndex = $(this).index();

        if (board[cellIndex] === '' && currentPlayer === 'X' && !hasWinner) {
            $(this).text('X');
            board[cellIndex] = 'X';
            if (checkWinner('X')) {
                $('#statusArea').text('You win!');
                hasWinner = true;
                return;
            }
            currentPlayer = 'O';
            $('#statusArea').text('AI\'s turn...');
            setTimeout(aiMove, 500); // Delay AI move for better UX
        }
    });

    $('#resetGame').click(function() {
        $('.cell').empty();
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        hasWinner = false;
        $('#statusArea').text('Your turn!');
    });

    function checkWinner(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            return pattern.every(index => board[index] === player);
        });
    }
});
