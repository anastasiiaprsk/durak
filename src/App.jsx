
import './App.css';
import {Durak} from "./comp/components/GameBoard/Durak/Durak-AllComp";
import {Card} from "./comp/components/GameBoard/OneCard/Card";
import {CardStack} from "./comp/components/GameBoard/AllCardsStack/CardStack";
import {useState} from "react";



function App() {
    return (
        <div className="App">
            <Durak/>
        </div>
    );
}

export default App;
