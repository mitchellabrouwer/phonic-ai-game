import Image from "next/image";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiBackpack } from "react-icons/pi";

function Navbar() {
  const iconSize = "60";

  return (
    <div className="bg-pink-600">
      <div className="flex flex-row items-center justify-between p-2">
        <button type="button" aria-label="Home" className="text-4xl md:ml-10">
          <AiOutlineHome size={iconSize} />
        </button>

        <button type="button" aria-label="Progress" className="text-4xl">
          <IoSpeedometerOutline size={iconSize} />
        </button>

        <div className="h-28 w-28">
          <Image
            src="/assets/artwork/alphabet_wonderland_3.png"
            width={250}
            height={250}
            alt="Alphabet Wonderland logo"
          />
        </div>

        <button type="button" aria-label="Inventory" className="text-4xl">
          <PiBackpack size={iconSize} />
        </button>

        <button
          type="button"
          aria-label="Settings"
          className="text-4xl md:mr-10"
        >
          <AiOutlineSetting size={iconSize} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
