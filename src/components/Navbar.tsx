import {  FiGlobe , FiUser , FiMenu , FiX , FiHome , FiCompass} from "react-icons/fi"; 
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="  top-0 z-50">
        <div className="flex justify-between items-center p-4  mx-auto">
      <a href="/"> <img src="/Logo.png" alt="Logo"  className="" width={150} height={150} /></a> 
       <div className=" hidden md:flex itmes-center gap-6 p-8">
        <a href="/" className="flex items-center gap-1 py-2 text-gray-600 font-medium hover:text-black transition-colors">Homes</a>
        <a href="/" className="flex items-center gap-1 py-2 text-gray-600 font-medium hover:text-black transition-colors">Experience</a>
       </div>
       <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-1  text-black  hover:text-gray-400 transition-colors font-medium">
            airbnb your home
        </button>
        <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full ">
        <FiGlobe className="text-lg " /> 
        </button>
        <div className="flex items-center gap-2 border-2 border-gray-300 hover:shadow-md rounded-full p-2 pl-4 transition-all cursor-pointer">
            <FiMenu className="text-lg " />
            <FiUser className="text-lg " size={24}/>
        </div>

        <button className="md:hidden p-2 ml-2 " onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}   </button>
       </div>
       </div>
       {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
            <div className="flex flex-col p-4 space-y-3">
                <a href="/" className="flex items-center gap-2 text-gray-600 font-medium py-2 px-4 hover:bg-gray-100 rounded-lg">
                 <FiHome className="text-lg" /> Homes
                </a>
                <a href="/" className="flex items-center gap-2 text-gray-600 font-medium py-2 px-4 hover:bg-gray-100 rounded-lg">
                 <FiCompass className="text-lg" /> Experience
                </a>
                <a href="/" className="flex items-center gap-2 text-gray-600 font-medium py-2 px-4 hover:bg-gray-100 rounded-lg">
                 <FiGlobe className="text-lg" />  airbnb your home
                </a>
            </div>
        </div>
          )}
       
    </div>
  );
};

export default Navbar;
