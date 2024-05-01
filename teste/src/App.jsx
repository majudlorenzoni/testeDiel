import React from "react";
import './styles/App.css';
import AppRoutes from "./Routes.js";
// import Welcome from "./components/calendario/welcome/Welcome";

class App extends React.Component {

  render(){
    return (
      <AppRoutes />
    );
  }
}

export default App;
