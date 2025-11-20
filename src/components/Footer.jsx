import React from "react";
function Footer() {
   return (
      <div className="p-6 text-center text-gray-600 fixed bottom-0 left-0 w-full">
         <p>
            Copyright &copy; {new Date().getFullYear()} Tarik Matematika. Made
            by Dimas with <span className="text-red-500">❤️</span>
         </p>
      </div>
   );
}

export default Footer;
