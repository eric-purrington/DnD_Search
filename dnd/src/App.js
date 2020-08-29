import React, {useState} from "react";
import HeroImg from "./components/HeroImg";
import Navbar from "./components/Navbar";
import InspiredInstructions from "./components/InspiredInstructions";
import ClassContainer from "./components/ClassContainer";
import RaceReceptacle from "./components/RaceReceptacle";
import WeaponsVault from "./components/WeaponsVault";
import SpellSack from "./components/SpellSack";
import Footer from "./components/Footer";
import API from "./utils/API";

function App() {
    const nav1Options = ["Classes", "Races", "Weapons", "Spells"];
    const [query, setQuery] = useState("");
    const [nav2Options, setNav2Options] = useState([]);
    const [response, setResponse] = useState({});

    function createNav2(event) {
        let chosenQuery = event.target.value;
        API.getInfo(chosenQuery).then(response => setResponse(response));
        setQuery(chosenQuery);
        switch(chosenQuery) {
            case "Classes":
                setNav2Options([
                    "Barbarian", 
                    "Bard", 
                    "Cleric", 
                    "Druid", 
                    "Fighter", 
                    "Monk", 
                    "Paladin", 
                    "Ranger", 
                    "Rogue", 
                    "Sorcerer", 
                    "Warlock", 
                    "Wizard"
                ]);
                break;
            case "Races":
                setNav2Options([
                    "Dwarf", 
                    "Elf", 
                    "Halfling", 
                    "Human", 
                    "Dragonborn", 
                    "Gnome", 
                    "Half-Elf", 
                    "Half-Orc", 
                    "Tiefling"
                ]);
                break;
            case "Weapons":
                setNav2Options([
                    "Simple Melee", 
                    "Simple Ranged", 
                    "Martial Melee", 
                    "Martial Ranged"
                ]);
                break;
            case "Spells":
                setNav2Options([
                    "Bard", 
                    "Cleric", 
                    "Druid", 
                    "Sorcerer", 
                    "Warlock", 
                    "Wizard"
                ]);
                break;
            default:
                break;
        }
    }

    function createInfoCon(event) {
        let chosenInfoTopic = event.target.value;

    }

    return(
        <div className="container">
            <HeroImg />
            <Navbar chooseQuery={createNav2} options={nav1Options}/>
            {query ? <Navbar chooseQuery={createInfoCon} options={nav2Options}/> : ""}
            {}
            <Footer />
        </div>
    )
}

export default App;