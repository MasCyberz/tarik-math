import React, { useState } from "react";
import { useSound } from "./SoundManager";

function NameInputScreen({ onSubmit }) {
   const [player1, setPlayer1] = useState("");
   const [player2, setPlayer2] = useState("");

   const [error1, setError1] = useState(false);
   const [error2, setError2] = useState(false);
   const { playClick } = useSound();

   return (
      <>
         <div className="w-full h-screen flex justify-center items-center bg-yellow-100">
            <div className="text-center bg-white p-10 rounded-xl shadow-xl">
               <h1 className="text-4xl font-bold mb-5">Masukkan Nama Pemain</h1>

               <p className="text-gray-600 mb-6">
                  Masukkan nama pemain untuk memulai pertandingan!
               </p>
               <div className="flex flex-row gap-2 mb-4">
                  <input
                     type="text"
                     placeholder="Nama Player 1"
                     className={`border p-3 rounded-lg w-80 text-lg ${
                        error1 ? "border-red-500 border-2" : "border-gray-300"
                     }`}
                     value={player1}
                     onChange={(e) => {
                        setPlayer1(e.target.value);
                        setError1(false);
                     }}
                  />

                  <input
                     type="text"
                     placeholder="Nama Player 2"
                     className={`border p-3 rounded-lg w-80 text-lg ${
                        error2 ? "border-red-500 border-2" : "border-gray-300"
                     }`}
                     value={player2}
                     onChange={(e) => {
                        setPlayer2(e.target.value);
                        setError2(false);
                     }}
                  />
               </div>

               <button
                  onClick={() => {
                     const e1 = player1.trim() === "";
                     const e2 = player2.trim() === "";
                     playClick();

                     setError1(e1);
                     setError2(e2);

                     if (!e1 && !e2) {
                        onSubmit(player1, player2);
                     }
                  }}
                  className=" w-full py-2 bg-blue-600 text-white rounded-xl text-xl font-semibold hover:bg-blue-700"
               >
                  Mulai
               </button>
            </div>
         </div>
      </>
   );
}

export default NameInputScreen;
