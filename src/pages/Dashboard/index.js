import React from "react";
import { useHistory } from "react-router-dom"

const Dashboard = () => {
  const history = useHistory();

  function handleLogout(e) {
    e.preventDefault();

    localStorage.clear();

    history.push("/");
  }

  return (
    <div>
      <h1>Dashboard Page</h1>

      <form onSubmit={handleLogout}>
        <button type="submit">
          Sair
        </button>        
      </form>
    </div>
  );
};

export default Dashboard;