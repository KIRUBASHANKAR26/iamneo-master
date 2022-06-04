import React, { useEffect, useState } from "react";
import LeftNavBar from "./Components/leftnavbar";
import PanelHeader from "./Components/panelheader";
import PanelNav from "./Components/panelnav";
import DndContent from "./Components/dndcontent";
import Footer from "./Components/footer";
import "./App.css";
import Board from "./Components/Board";

function App() {
  const [Users, setUsers] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const url = "https://randomuser.me/api/?results=10";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        const randomuser = json.results;
        setloading(false);
        setUsers({
          open: randomuser.slice(0, 5),
          contacted: randomuser.slice(5, 10),
          techincal: randomuser.slice(10, 15),
        });
      } catch (error) {
        setloading(false);
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  console.log("Users", Users);

  return (
    <div className="main-container">
      <div className="left-nav">
        <LeftNavBar />
      </div>
      <div className="right-nav">
        <div className="panel-header">
          <PanelHeader />
        </div>
        <div className="panel-nav">
          <PanelNav />
        </div>
        <div className="dnd-content">
          {/* {loading ? <div>Loading...</div> : <DndContent users={Users} />} */}
          {loading ? <div>Loading...</div> : <Board initial={Users} />}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
