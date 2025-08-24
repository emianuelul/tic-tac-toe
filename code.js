const createPlayer = function (name, sign) {
  let pname = name;
  let psign = sign;
  let score = 0;

  const incrementScore = () => {
    score++;
  };

  const getName = () => {
    return pname;
  };

  const getSign = () => {
    return psign;
  };

  const getScore = () => {
    return score;
  };

  return { incrementScore, getScore, getName, getSign };
};

const game = (function () {
  const rows = 3;
  const columns = 3;
  let spacesLeft = 9;
  let board = [];

  const gameBoard = document.querySelector('.game-board');

  let players = [createPlayer('iemi', 'X'), createPlayer('elena', '0')];
  let currentPlayer = 0;

  const initBoard = () => {
    initScores();

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = 0;

        const cell = document.createElement('div');
        cell.classList.add('board-cell');
        gameBoard.appendChild(cell);

        cell.addEventListener('mouseup', (event) => {
          if (event.target.textContent === '') {
            event.target.textContent = players[currentPlayer].getSign();
            board[i][j] = players[currentPlayer].getSign();
            spacesLeft--;
            currentPlayer = Number(!currentPlayer);

            if (spacesLeft === 0 && checkWin(i, j) === 0) {
              alert('Draw!');
              resetBoard();
            }

            if (checkWin(i, j) === 1) {
              updateScores();
              resetBoard();
            }
          }
        });
      }
    }
  };

  const resetBoard = () => {
    spacesLeft = 9;
    const cells = [...document.querySelectorAll('.board-cell')];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        board[i][j] = 0;
        cells[i * 3 + j].textContent = '';
      }
    }
    currentPlayer = 0;
  };

  const initScores = () => {
    const scores = [...document.querySelectorAll('.score')];

    let i = 0;
    for (item of scores) {
      item.textContent = `${players[i].getName()}: ${players[i].getScore()}`;
      i++;
    }
  };

  const updateScores = () => {
    const scores = document.querySelectorAll('.score');
    const p = Number(!currentPlayer);
    players[p].incrementScore();

    scores[p].textContent = `${players[p].getName()}: ${players[p].getScore()}`;
  };

  const checkWin = (lin, col) => {
    const p = players[Number(!currentPlayer)].getSign();

    // row
    if (board[lin][0] === p && board[lin][1] === p && board[lin][2] === p)
      return 1;

    // column
    if (board[0][col] === p && board[1][col] === p && board[2][col] === p)
      return 1;

    // diagonals
    if (
      lin === col &&
      board[0][0] === p &&
      board[1][1] === p &&
      board[2][2] === p
    )
      return 1;
    if (
      lin + col === 2 &&
      board[0][2] === p &&
      board[1][1] === p &&
      board[2][0] === p
    )
      return 1;

    return 0;
  };

  const playGame = () => {
    initBoard();
  };

  return { playGame };
})();

game.playGame();
