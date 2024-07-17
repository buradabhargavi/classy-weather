import React, { Component } from "react";

interface State {
  count: number;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { count: 0 };
    this.handleDec = this.handleDec.bind(this);
    this.handleInc = this.handleInc.bind(this);
  }
  handleDec() {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  }

  handleInc() {
    this.setState((prev) => ({
      count: prev.count + 1,
    }));
  }

  render() {
    return (
      <>
        <button onClick={this.handleDec}>-</button>
        <span>Count: {this.state.count}</span>
        <button onClick={this.handleInc}>+</button>
      </>
    );
  }
}

export default App;
