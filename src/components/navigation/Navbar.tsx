import { Howler } from "howler";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { IoIosHelpCircleOutline } from "react-icons/io";
import {
  IoSpeedometerOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
} from "react-icons/io5";
import { PiBackpack } from "react-icons/pi";
import { useAppDispatch } from "../../lib/redux";
import { displayInstructions } from "../../redux/instructions/instructionsSlice";

function Navbar() {
  const dispatch = useAppDispatch();
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    Howler.mute(!isMuted);
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-blue-600 shadow-lg">
      <div className="flex h-20 flex-row items-center justify-between">
        <Link
          href="/"
          className="rounded-full p-2 text-5xl transition duration-300 ease-in-out hover:bg-blue-500 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <AiOutlineHome />
        </Link>

        <button
          type="button"
          aria-label="Progress"
          className="rounded-full p-2 text-5xl transition duration-300 ease-in-out hover:bg-blue-500 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <IoSpeedometerOutline />
        </button>

        <button
          type="button"
          aria-label="Inventory"
          className="rounded-full p-2 text-5xl transition duration-300 ease-in-out hover:bg-blue-500 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <PiBackpack />
        </button>

        <div className="hidden h-16 w-16 md:block">
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
          className="rounded-full p-2 text-5xl transition duration-300 ease-in-out hover:bg-blue-500 sm:text-4xl md:text-5xl lg:text-6xl"
          onClick={() => dispatch(displayInstructions())}
        >
          <IoIosHelpCircleOutline />
        </button>

        <button
          type="button"
          aria-label="Inventory"
          className="rounded-full p-2 text-5xl transition duration-300 ease-in-out hover:bg-blue-500 sm:text-4xl md:text-5xl lg:text-6xl"
          onClick={toggleMute}
        >
          {isMuted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
        </button>

        <button
          type="button"
          aria-label="Settings"
          className="rounded-full p-2 text-5xl transition duration-300 ease-in-out hover:bg-blue-500 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <AiOutlineSetting />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
