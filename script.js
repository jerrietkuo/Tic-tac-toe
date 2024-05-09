$(document).ready(function() {
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameMode = '';
    let hasWinner = false;

    $('#pvpMode').on('click touchstart', function() {
        gameMode = 'PVP';
        $('#modeSelection').hide();
        $('#gameArea').show();
        $('#statusArea').text('Player X\'s turn');
    });

    $('#pveMode').on('click touchstart', function() {
        gameMode = 'PVE';
        $('#modeSelection').hide();
        $('#gameArea').show();
        $('#statusArea').text('Your turn!');
    });

    function aiMove() {
        let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        if (availableCells.length > 0) {
            let aiCellIndex = getBestMove();
            board[aiCellIndex] = 'O';
            $(`.cell:eq(${aiCellIndex})`).text('O').delay(200);
            if (checkWinner('O')) {
                $('#statusArea').text('AI wins!');
                hasWinner = true;
            } else if (!board.includes('')) {
                $('#statusArea').text('It\'s a tie!');
                hasWinner = true;
            } else {
                currentPlayer = 'X';
                $('#statusArea').text('Your turn!');
            }
        }
    }

    function getBestMove() {
        let bestScore = -Infinity;
        let bestMove;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, 0, false);
                board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }

    function minimax(board, depth, isMaximizing) {
        let scores = {
            X: -1,
            O: 1,
            tie: 0
        };

        if (checkWinner('X')) {
            return scores.X;
        } else if (checkWinner('O')) {
            return scores.O;
        } else if (!board.includes('')) {
            return scores.tie;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    $('.cell').on('click touchstart', function() {
        let cellIndex = $(this).index();

        if (board[cellIndex] === '' && currentPlayer === 'X' && !hasWinner && gameMode === 'PVP') {
            $(this).text(currentPlayer);
            board[cellIndex] = currentPlayer;
            if (checkWinner(currentPlayer)) {
                $('#statusArea').text('Player ' + currentPlayer + ' wins!');
                hasWinner = true;
            } else if (!board.includes('')) {
                $('#statusArea').text('It\'s a tie!');
                hasWinner = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                $('#statusArea').text('Player ' + currentPlayer + '\'s turn');
            }
        } else if (board[cellIndex] === '' && currentPlayer === 'O' && !hasWinner && gameMode === 'PVP') {
            $(this).text(currentPlayer);
            board[cellIndex] = currentPlayer;
            if (checkWinner(currentPlayer)) {
                $('#statusArea').text('Player ' + currentPlayer + ' wins!');
                hasWinner = true;
            } else if (!board.includes('')) {
                $('#statusArea').text('It\'s a tie!');
                hasWinner = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                $('#statusArea').text('Player ' + currentPlayer + '\'s turn');
            }
        } else if (board[cellIndex] === '' && currentPlayer === 'X' && !hasWinner && gameMode === 'PVE') {
            $(this).text(currentPlayer);
            board[cellIndex] = currentPlayer;
            if (checkWinner(currentPlayer)) {
                $('#statusArea').text('You win!');
                hasWinner = true;
            } else if (!board.includes('')) {
                $('#statusArea').text('It\'s a tie!');
                hasWinner = true;
            } else {
                currentPlayer = 'O';
                $('#statusArea').text('AI\'s turn...');
                setTimeout(aiMove, 500);
            }
        }
    });

    $('#resetGame').click(function() {
        $('.cell').empty();
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        hasWinner = false;
        $('#statusArea').text(gameMode === 'PVE' ? 'Your turn!' : 'Player X\'s turn');
    });

    function checkWinner(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(function(pattern) {
            if (pattern.every(index => board[index] === player)) {
                return true;
            }
            return false;
        });
    }
});
