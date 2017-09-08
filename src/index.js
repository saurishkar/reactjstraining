import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        { this.props.value }
      </button>
    );
  }
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      isDrawn: false,
      xIsNext: true,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber : step,
      xIsNext: (step%2) === 0,
    });
  }

  handleClick(i) {
    //console.log('click');
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    this.setState({
      stepNumber: history.length,
    });
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext?'X':'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext
    });
    if (!checkIfEmpty(squares) && !calculateWinner(squares)) {
        this.setState({isDrawn: true});
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Player '+ winner +' wins';
    } else {
      if (this.state.isDrawn) {
        status = 'Match Drawn';
      } else {
        status= 'Next Player: '+ (this.state.xIsNext?'X':'O');
      }
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            xIsNext = {this.state.xIsNext}
            isDrawn = {this.state.isDrawn}
            onClick = {(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function checkIfEmpty(squares) {
  for (let i=0;i<squares.length; i++) {
    if (squares[i] === null) {
      return true;
    }
  }
  return false;
}
