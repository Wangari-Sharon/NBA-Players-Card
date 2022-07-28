import React from 'react'
import {useEffect, useState} from "react";
import PlayerContainer from "./Components/PlayerContainer";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";

import { Route, Routes} from "react-router-dom";

function App() {
  const [players, setPlayers] = useState([]);
  const [searchPlayer, setSearchPlayer] = useState("")
  const [playerPositionFilter, setPlayerPositionFilter] = useState("")
  

  useEffect (() => {
    fetch("http://localhost:3001/players")
    .then((response) => response.json())
    .then((players) => setPlayers(players));
  },[]);

  const addNewPlayer = (newPlayerObj) => {
    setPlayers((prevPlayer) => [newPlayerObj,...prevPlayer])
  }


  const filteredPlayers = players.filter((playerObj) => playerObj.name.toLowerCase().includes(searchPlayer.toLowerCase()))

  const filterGuards = filteredPlayers.filter((playerObj) => playerObj.position.toLowerCase() === "guard")

  const filterWings = filteredPlayers.filter((playerObj) => playerObj.position.toLowerCase() === "wing")

  const filterBigs = filteredPlayers.filter((playerObj) => playerObj.position.toLowerCase() === "big")

  const filterTeams = filteredPlayers.filter((playerObj) => playerObj.position.toLowerCase() === "team")


 

  return (
    <div className="app">
      <Header />
      <NavBar addNewPlayer={addNewPlayer} setSearchPlayer={setSearchPlayer} />
      
      <Routes>
        <Route path="/Guard">
            <PlayerContainer players={filterGuards} />
          </Route> 
          <Route path="/Wing">
            <PlayerContainer players={filterWings} />
          </Route> 
          <Route path="/Big">
            <PlayerContainer players={filterBigs} />
          </Route>
          <Route path="/Team">
            <PlayerContainer players={filterTeams} />
          </Route>
          <Route path="/">
            <PlayerContainer players={filteredPlayers} filteredPlayers={filteredPlayers} />
            </Route>   
      </Routes>
      
    </div>
  );
}

export default App;
