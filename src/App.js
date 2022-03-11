import React from "react";
import WeatherForm from "./components/WeatherForm";
import Header from './components/Header'
import Footer from './components/Footer'
import "./App.css";

function App() {
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-12 mx-auto">
          <Header />
          <WeatherForm />
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default App;
