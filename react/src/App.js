import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Home function
function Home() {
  return <h3>Home</h3>;
}

// About function
function About() {
  return <h3>Ryota Mine</h3>;
}

// Contact function
function Contact() {
  return <h3>ryotamine@gmail.com</h3>;
}

// App class
class App extends Component {
  // Render app
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </div>
      </Router>
    );
  }
}

export default App;
