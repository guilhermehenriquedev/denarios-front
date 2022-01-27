import React, { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        name: "",
        completed: false
      },
      todoList: []
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://denarios.herokuapp.com/api/exchanges/list/');
      const todoList = await res.json();
      console.log(todoList)
      this.setState({
        todoList
      });
    } catch (e) {
      console.log(e);
    }
  }
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
      >
        {item.name}
      </li>
    ));
  };

  render() {
    return (
      <div>
        {this.renderItems()}
      </div>
    )
  }
}

export default App;