import React from "react";
function Footer() {
   return (
      <div className="p-6 text-center text-gray-600 fixed bottom-0 left-0 w-full">
         <p>
            Copyright &copy; {new Date().getFullYear()} Tarik Matematika. Made
            by <span><a href="https://www.instagram.com/dimsalif_" className="text-blue-300">Dimas</a></span> with <span>❤️</span>
         </p>
      </div>
   );
}

export default Footer;
