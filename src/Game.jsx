import tarik from "./assets/tarik.png";
import garisTengah from "./assets/garisTengah.png";
import { useState } from "react";
import Calculator from "./components/Calculator";
import WinScreen from "./components/WinScreen";
import { useSound } from "./components/SoundManager";

function Game({ players }) {
   const [activePlayer, setActivePlayer] = useState(null);
   const { playCorrect, playIncorrect } = useSound();

   const generateQuestion = () => {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      return { a, b, answer: a * b };
   };

   const [question1, setQuestion1] = useState(generateQuestion());
   const [question2, setQuestion2] = useState(generateQuestion());

   const [winner, setWinner] = useState(null);
   const [ropePosition, setRopePosition] = useState(0);

   const handleCorrect = (playerId) => {
      if (playerId === 1) {
         setQuestion1(generateQuestion());
         setRopePosition((prev) => {
            const newPos = prev - 20;
            if (newPos <= -100) setWinner(1);
            return newPos;
         });
         playCorrect();
      } else {
         setQuestion2(generateQuestion());
         setRopePosition((prev) => {
            const newPos = prev + 20;
            if (newPos >= 100) setWinner(2);
            return newPos;
         });
         playCorrect();
      }

      setActivePlayer(null);
   };

   if (winner) {
      return (
         <WinScreen
            winner={winner}
            winnerName={winner === 1 ? players.p1 : players.p2}
            onRestart={() => window.location.reload()}
         />
      );
   }

   return (
      <>
         <div className="grid grid-cols-1 lg:grid-cols-3 h-screen items-center justify-center px-6 bg-yellow-100">
            <div className="text-center">
               <h1 className="text-4xl font-bold">{players.p1}</h1>
               <Calculator
                  playerId={1}
                  question={question1}
                  activePlayer={activePlayer}
                  setActivePlayer={setActivePlayer}
                  onCorrect={() => handleCorrect(1)}
               />
            </div>
            <div className="flex flex-col items-center justify-center">
               <h1 className="text-4xl font-bold">Mathematic Battle</h1>
               <p>Jawab Soal Matematika Untuk Menang</p>
               <div className="relative justify-center w-full">
                  <img src={garisTengah} alt="" />
                  <img
                     src={tarik}
                     alt=""
                     className="absolute -top-1 transition-all duration-300"
                     style={{
                        transform: `translateX(${ropePosition}px)`,
                     }}
                  />
               </div>
            </div>
            <div className="text-center">
               <h1 className="text-4xl font-bold">{players.p2}</h1>
               <Calculator
                  playerId={2}
                  question={question2}
                  activePlayer={activePlayer}
                  setActivePlayer={setActivePlayer}
                  onCorrect={() => handleCorrect(2)}
               />
            </div>
         </div>
      </>
   );
}

export default Game;
