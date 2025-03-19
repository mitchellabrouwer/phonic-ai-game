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
    <div className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="flex h-20 flex-row items-center justify-between px-4">
        <Link
          href="/"
          className="rounded-full bg-white/10 p-3 text-5xl text-white transition duration-300 ease-in-out hover:scale-110 hover:bg-white/20 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <AiOutlineHome />
        </Link>

        <button
          type="button"
          aria-label="Progress"
          className="rounded-full bg-white/10 p-3 text-5xl text-white transition duration-300 ease-in-out hover:scale-110 hover:bg-white/20 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <IoSpeedometerOutline />
        </button>

        <button
          type="button"
          aria-label="Inventory"
          className="rounded-full bg-white/10 p-3 text-5xl text-white transition duration-300 ease-in-out hover:scale-110 hover:bg-white/20 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <PiBackpack />
        </button>

        <div className="hidden h-16 w-16 md:block">
          <Image
            src="/assets/artwork/alphabet_wonderland_3.png"
            width={250}
            height={250}
            alt="Alphabet Wonderland logo"
            className="transform transition-transform hover:scale-110"
          />
        </div>

        <button
          type="button"
          aria-label="Help"
          className="rounded-full bg-white/10 p-3 text-5xl text-white transition duration-300 ease-in-out hover:scale-110 hover:bg-white/20 sm:text-4xl md:text-5xl lg:text-6xl"
          onClick={() => dispatch(displayInstructions())}
        >
          <IoIosHelpCircleOutline />
        </button>

        <button
          type="button"
          aria-label="Sound"
          className="rounded-full bg-white/10 p-3 text-5xl text-white transition duration-300 ease-in-out hover:scale-110 hover:bg-white/20 sm:text-4xl md:text-5xl lg:text-6xl"
          onClick={toggleMute}
        >
          {isMuted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
        </button>

        <button
          type="button"
          aria-label="Settings"
          className="rounded-full bg-white/10 p-3 text-5xl text-white transition duration-300 ease-in-out hover:scale-110 hover:bg-white/20 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <AiOutlineSetting />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
