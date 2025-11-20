import React from "react";
import { useSound } from "./SoundManager";

function WinScreen({ winnerName, onRestart }) {
   const { playClick } = useSound();
   return (
      <>
         <div
            className="
         w-full h-screen 
         flex flex-col justify-center items-center 
         bg-yellow-100
         animate-fadeIn
      "
         >
            <h1 className="text-6xl font-bold mb-10 animate-scaleUp uppercase">
               {winnerName} Menang! 🎉
            </h1>

            <button
               onClick={() => {
                  onRestart();
                  playClick();
               }}
               className="px-8 py-3 bg-blue-600 text-white rounded-xl text-xl font-semibold hover:bg-blue-700"
            >
               Main Lagi
            </button>
         </div>
      </>
   );
}

export default WinScreen;
