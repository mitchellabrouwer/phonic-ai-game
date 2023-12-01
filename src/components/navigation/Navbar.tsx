import { useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiBackpack } from "react-icons/pi"; // Make sure this import is correct

function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const iconSize = "60";

  const toggleMenu = () => setIsExpanded(!isExpanded);

  return (
    <div className="fixed left-0 right-0 top-0 z-10">
      <div
        className={`bg-pink-600 p-3 transition-all duration-300 ease-in-out ${
          isExpanded ? "h-auto" : "h-20"
        }`}
      >
        <div
          className={`flex flex-col items-center justify-between ${
            isExpanded ? "space-y-4" : "space-y-0"
          }`}
        >
          {isExpanded && (
            <div className="flex items-center justify-between">
              <button type="button" aria-label="Home" className="text-4xl">
                <AiOutlineHome size={iconSize} />
                <span className="text-sm">Home</span>
              </button>

              <button type="button" aria-label="Progress" className="text-4xl">
                <IoSpeedometerOutline size={iconSize} />
                <span className="text-sm">Progress</span>
              </button>

              <button type="button" aria-label="Inventory" className="text-4xl">
                <PiBackpack size={iconSize} />
                <span className="text-sm">Inventory</span>
              </button>

              <button type="button" aria-label="Settings" className="text-4xl">
                <AiOutlineSetting size={iconSize} />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="p-2 text-4xl"
          >
            {isExpanded ? (
              <AiOutlineArrowUp size={40} />
            ) : (
              <AiOutlineArrowDown size={40} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
