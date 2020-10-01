import React from "react";
import { useHistory } from "react-router-dom"

import "./styles.css";

const Dashboard = () => {
  const history = useHistory();

  function handleLogout(e) {
    e.preventDefault();

    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="container-dashboard">
      <h1>Dashboard Page</h1>

      <form onSubmit={handleLogout}>
        <button type="submit" className="button">
          Sair
        </button>        
      </form>
    </div>
  );
};

export default Dashboard;