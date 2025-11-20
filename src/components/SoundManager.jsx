import { createContext, useContext, useEffect, useRef } from "react";
import backsound from "../assets/backsound.mp3";
import correctSfx from "../assets/correct.mp3";
import incorrectSfx from "../assets/incorrect.wav";
import clickSfx from "../assets/click.wav";

const SoundContext = createContext();

export function SoundProvider({ children }) {
   const bgmRef = useRef(new Audio(backsound));
   const correctRef = useRef(new Audio(correctSfx));
   const incorrectRef = useRef(new Audio(incorrectSfx));
   const clickRef = useRef(new Audio(clickSfx));

   // --- Global volume
   const volume = 0.5;

   // --- Fade in duration 1.5s
   const fadeIn = (audio) => {
      audio.volume = 0;
      audio.play();
      let x = 0;

      const fade = setInterval(() => {
         x += 0.05;
         audio.volume = Math.min(x * volume, volume);

         if (audio.volume >= volume) clearInterval(fade);
      }, 100);
   };

   // --- Fade out for transition
   const fadeOut = (audio) => {
      let x = audio.volume;

      const fade = setInterval(() => {
         x -= 0.05;
         audio.volume = Math.max(0, x);

         if (audio.volume <= 0) {
            clearInterval(fade);
            audio.pause();
         }
      }, 100);
   };

   // BackSound always loops
   useEffect(() => {
      const bgm = bgmRef.current;
      bgm.loop = true;

      // Play only after any click (browser autoplay policy)
      const startBgm = () => {
         fadeIn(bgm);
         window.removeEventListener("click", startBgm);
      };

      window.addEventListener("click", startBgm);

      return () => {
         bgm.pause();
         bgm.currentTime = 0;
      };
   }, []);

   // --- Public methods to be used anywhere
   const playCorrect = () => {
      correctRef.current.volume = volume;
      correctRef.current.currentTime = 0;
      correctRef.current.play();
   };

   const playIncorrect = () => {
      incorrectRef.current.volume = volume;
      incorrectRef.current.currentTime = 0;
      incorrectRef.current.play();
   };

   const playClick = () => {
      clickRef.current.volume = volume;
      clickRef.current.currentTime = 0;
      clickRef.current.play();
   };

   const stopBgm = () => fadeOut(bgmRef.current);

   return (
      <SoundContext.Provider
         value={{
            playCorrect,
            playIncorrect,
            playClick,
            stopBgm,
         }}
      >
         {children}
      </SoundContext.Provider>
   );
}

export function useSound() {
   return useContext(SoundContext);
}
