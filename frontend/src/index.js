import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {

   handleClick(i){
       const squares = this.state.squares.slice();

       if(calculateWinner(squares)||squares[i]){
        return;
       }

       squares[i] = this.state.xIsNext ? 'X': 'O';
       this.setState({squares: squares, xIsNext: !this.state.xIsNext,});
   }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    let renderobject = [];

    for (let rowcount = 1; rowcount <= 3; rowcount++){
        let row = [];
        for (let colcount = 1; colcount <= 3; colcount++){
        row.push(this.renderSquare((colcount-1) + ((rowcount-1)*3)));
        }
        renderobject.push(<div key = {rowcount} className="board-row">{row}</div>)
    }


    return (
      <div>
        <div className="status"></div>
        {renderobject}
      </div>
    );
  }
}

class Game extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            history: [{
                squares:Array(9).fill(null),
            }],
            clickhistory: [99,],
            stepNumber: 0,
            clicklocation: 99,
            xIsNext: true,
        };
    }

  handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const clickhistory = this.state.clickhistory.slice(0, this.state.stepNumber + 1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]){
          return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
         history: history.concat([{
             squares:squares,
         }]),
         stepNumber: history.length,
         clickhistory: clickhistory.concat([i,]),
         clicklocation: i,
         xIsNext: !this.state.xIsNext,
      });
  }

  jumpTo(step){
      this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
      });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const clicklocation = this.state.clicklocation;
    const clickhistory = this.state.clickhistory;
    const clickvalue = clickhistory[this.state.stepNumber];
    var yaxis = Math.floor((clickvalue + 1)/3) + 1;
    var xaxis = (clickvalue + 1)%3;

    if (xaxis === 0){
        xaxis = 3;
    }

    const moves = history.map((step, move) => {
        const stepclickvalue = clickhistory[move];
        var stepclicky = Math.floor((stepclickvalue + 1)/3) + 1;
        var stepclickx = (stepclickvalue + 1)%3;

        if (stepclickx === 0){
        stepclickx = 3;
        }

        const desc = move ?
        'Go to move #' + move + ", X:" + stepclickx + ", Y:" + stepclicky : 'Go to game start';

        if (move === (history.length-1)){

        return (
            <li key = {move}>
                <button onClick={() => this.jumpTo(move)} style={{color:'red', fontWeight:'bold',}}>{desc}</button>
            </li>

            );

        }else{

        return (
            <li key = {move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
            );
        }
    });

    let status;

    if (winner){
        status = 'Winner:' + winner;
    }else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares =
            {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>Coordinates are : {clicklocation} </div>
          <div>Array Coordinates are : {clickvalue} </div>
          <div>X Axis is : {xaxis} </div>
          <div>Y Axis is : {yaxis} </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares){

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

    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

