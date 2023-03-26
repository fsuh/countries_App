import React from "react";
import { Link } from "react-router-dom";
import map from "../assets/worldMap.svg";
import Wrapper from "../assets/css/homeCss";

const Home = () => {
  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h1>
            <span>World</span> Atlas
          </h1>
          <p>
            Art party big mood roof party pug photo booth messenger bag
            vibecession gluten-free. Knausgaard waistcoat snackwave, shabby chic
            JOMO lyft tilde sus wayfarers vibecession. Brunch yes plz plaid,
            shoreditch master cleanse kogi fam vibecession copper mug migas
            hoodie sus sustainable.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={map} alt="WorldMap" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Home;
