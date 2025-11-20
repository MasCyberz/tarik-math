import { useState } from "react";
import Game from "./Game";
import StartScreen from "./components/StartScreen";
import NameInputScreen from "./components/NameInputScreen";
import Footer from "./components/Footer";
import { SoundProvider } from "./components/SoundManager";

export default function App() {
   const [screen, setScreen] = useState("start");
   const [players, setPlayers] = useState({ p1: "", p2: "" });

   const handleStart = () => {
      setScreen("name-input");

   };

   const handleSetNames = (p1, p2) => {
      setPlayers({ p1, p2 });
      setScreen("game");
   };

   return (
      <SoundProvider>
         <div>
            {screen === "start" && <StartScreen onStart={handleStart} />}
            {screen === "name-input" && (
               <NameInputScreen onSubmit={handleSetNames} />
            )}
            {screen === "game" && (
               <Game players={players} />
            )}

            <Footer />
         </div>
      </SoundProvider>
   );
}
