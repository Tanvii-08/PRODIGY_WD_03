document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'O';
    let game = Array(9).fill(null);
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleboxClick(e) {
        const index = e.target.dataset.index;
        if (game[index] || Winner()) return;

        game[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (Winner()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            Winningboxes();
        } else if (game.every(box => box)) {
            message.textContent = 'Draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function Winner() {
        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return game[a] && game[a] === game[b] && game[a] === game[c];
        });
    }

    function Winningboxes() {
        winConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (game[a] && game[a] === game[b] && game[a] === game[c]) {
                boxes[a].classList.add('winningbox');
                boxes[b].classList.add('winningbox');
                boxes[c].classList.add('winningbox');
            }
        });
    }

    function resetGame() {
        game = Array(9).fill(null);
        boxes.forEach(box=> {
            box.textContent = '';
            box.classList.remove('winningbox');
        });
        currentPlayer = 'O';
        message.textContent = '';
    }

    boxes.forEach(box => box.addEventListener('click', handleboxClick));
    resetButton.addEventListener('click', resetGame);
});

    