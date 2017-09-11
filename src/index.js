import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Clock extends React.Component
{
  constructor() {
    super();
    this.state = {
      date:new Date().toLocaleString(),
    };
  }
  componentDidMount()
  {
    this.timerID = setInterval(
      () => this.tick(), 1000
      );
  }
  compoentWillMount()
  {
    clearInterval(this.timerID);
  }

  tick()
  {
    this.setState({
        date:new Date().toLocaleString(),
    });
  }
  render() {
    return (
      <div>
        <h1> Hi, the Current Date and Time is { this.state.date } </h1>
      </div>
    );
  }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
  );

//setInterval(time, 1000);
// function time()
// {
//   return new Date().toLocaleString();
// }