import React from "react";
import { useSound } from "./SoundManager";

function StartScreen({ onStart }) {
   const { playClick } = useSound();
   return (
      <>
         <div className="h-screen flex justify-center items-center bg-yellow-100">
            <div className="text-center">
               <h1 className="text-6xl font-bold">TARMATH</h1>
               <p className="mb-5 text-xl text-gray-800">Tarik Matematika</p>

               <p className="text-gray-600 mb-10">
                  Adu cepat hitung perkalian untuk memenangkan pertandingan!
               </p>

               <button
                  onClick={() => {
                     onStart();
                     playClick();
                  }}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl text-xl font-semibold hover:bg-blue-700"
               >
                  Mulai Game
               </button>
            </div>
         </div>
      </>
   );
}

export default StartScreen;
