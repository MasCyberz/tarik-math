import { useState, useEffect } from "react";

export default function Calculator({ playerId, question, onCorrect }) {
   const [answer, setAnswer] = useState("");

   const press = (key) => {
      if (key === "C") {
         setAnswer("");
         return;
      }

      if (key === "=") {
         check();
         return;
      }

      setAnswer((prev) => prev + key);
   };

   const check = () => {
      if (Number(answer) === question.answer) {
         onCorrect(); // generate soal baru
      }
      setAnswer("");
   };

   // Keyboard
   useEffect(() => {
      const handleKey = (e) => {
         // PLAYER 1 -> angka biasa
         if (playerId === 1) {
            if (e.code.startsWith("Digit")) {
               press(e.key);
            }
            if (e.key === "Enter") press("=");
            if (e.key === "Backspace") press("C");
         }

         // PLAYER 2 -> NUMPAD ONLY
         if (playerId === 2) {
            if (e.code.startsWith("Numpad") && !isNaN(e.key)) {
               press(e.key);
            }
            if (e.code === "NumpadEnter") press("=");
            if (e.code === "NumpadDecimal") press("C"); // opsional
         }
      };

      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
   }, [answer]);

   const [fontSize, setFontSize] = useState("text-2xl");

   useEffect(() => {
      const len = answer.length;

      if (len <= 8) setFontSize("text-2xl");
      else if (len <= 12) setFontSize("text-xl");
      else if (len <= 16) setFontSize("text-lg");
      else setFontSize("text-base");
   }, [answer]);

   return (
      <div className="m-12 grid grid-cols-1 bg-blue-200 shadow-xl p-5 rounded-xl">
         {/* Soal */}
         <div className="bg-white flex flex-col justify-center items-center shadow-lg p-3 mt-3 rounded-2xl">
            <span className="text-2xl font-semibold">
               {question.a} × {question.b}
            </span>
         </div>

         {/* Jawaban Player */}
         <div
            className="bg-white flex flex-col justify-center items-center shadow-lg p-3 my-4 rounded-2xl cursor-pointer"
            onClick={() => setActivePlayer(playerId)}
         >
            <span className={`${fontSize} font-semibold break-all`}>
               {answer || 0}
            </span>
         </div>

         {/* Tombol */}
         <div className="p-3 grid grid-cols-3 gap-4 sm:gap-6 text-3xl font-semibold">
            {["7", "8", "9", "4", "5", "6", "1", "2", "3", "C", "0", "="].map(
               (btn) => (
                  <button
                     key={btn}
                     onClick={() => press(btn)}
                     className="
               bg-blue-500 
               text-white
               p-3 
               sm:p-4 
               rounded-lg
               w-full
               flex items-center justify-center
               hover:bg-blue-600
               transition-all
            "
                  >
                     {btn}
                  </button>
               )
            )}
         </div>
      </div>
   );
}
