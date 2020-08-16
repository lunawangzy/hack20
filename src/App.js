import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add-post" />
        <Route path="/course" />
        <Route path="/" render={(props) => (
          <Home item={classList}/>
        )}/>
      </Switch>
    </Router>
  );
}

let classList = [];
let updateList;

function handleChange(e) {
  updateList(classList.filter(p=> p.includes(e.target.value)));
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: props.item};
  }

  render() {
    return (
      <main>
        <div id="search-bar">
         <span role="img" aria-label="Search" id="filter-icon">🔍</span>
         <input id="filter" onChange={handleChange} />
        </div>

        <div id="list">
        {this.state.items.map((item, index) => (
          <section key={index}>
            <div className='shortInfo'>
              <div>{item}</div>
            </div>
          </section>
        ))}
        </div>
      </main>
    );
  }

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(checkStatus)
      .then(resp => resp.json())
      .then(resp => initData(resp))
      .catch(() => {
        console.log("error")
      });
      updateList = (data) => {
        this.setState({items: data})
      };
  }
}

function initData(data) {
  classList = data.results.map(x => x.name);
  updateList(classList);
}

function checkStatus(response) {
  if (!response.ok) {
    throw Error("Error in request: " + response.statusText);
  }
  return response;
}

export default App;
