import Image from "next/image";
import Link from "next/link";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiBackpack } from "react-icons/pi";

function Navbar() {
  const iconSize = "70";

  return (
    <div className="bg-blue-600 shadow-lg">
      {" "}
      <div className="flex flex-row items-center justify-between p-2">
        <Link
          href="/"
          className="rounded-full p-2 text-4xl transition duration-300 ease-in-out hover:bg-blue-500 md:ml-10"
        >
          <AiOutlineHome size={iconSize} />
        </Link>

        <button
          type="button"
          aria-label="Progress"
          className="rounded-full p-2 text-4xl transition duration-300 ease-in-out hover:bg-blue-500"
        >
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

        <button
          type="button"
          aria-label="Inventory"
          className="rounded-full p-2 text-4xl transition duration-300 ease-in-out hover:bg-blue-500"
        >
          <PiBackpack size={iconSize} />
        </button>

        <button
          type="button"
          aria-label="Settings"
          className="rounded-full p-2 text-4xl transition duration-300 ease-in-out hover:bg-blue-500 md:mr-10"
        >
          <AiOutlineSetting size={iconSize} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
