import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiBackpack } from "react-icons/pi";
import { useOrientation } from "../../context/OrientationProvider";

function Navbar() {
  const orientation = useOrientation();
  const iconSize = "60";

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {orientation === "portrait" ? (
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-pink-600 p-3">
          <div className="flex flex-row items-start justify-between">
            <button type="button" aria-label="Home" className="text-4xl">
              <AiOutlineHome size={iconSize} />
            </button>

            <button type="button" aria-label="Progress" className="mb-2">
              <IoSpeedometerOutline size={iconSize} />
            </button>

            {/* Backpack Icon */}
            <button type="button" aria-label="Inventory" className="mb-2">
              <PiBackpack size={iconSize} />
            </button>

            <button type="button" aria-label="Settings" className="text-4xl">
              <AiOutlineSetting size={iconSize} />
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 z-10 h-full p-2">
          <div className="flex h-full flex-row items-center justify-between">
            <div className="flex h-full flex-col justify-between p-10 pt-10">
              <button type="button" aria-label="Home" className="text-4xl">
                <AiOutlineHome size={iconSize} />
              </button>

              <button type="button" aria-label="Progress" className="mb-2">
                <IoSpeedometerOutline size={iconSize} />
              </button>
            </div>

            <div className="flex h-full flex-col justify-between p-10 pt-10">
              <button type="button" aria-label="Inventory" className="mb-2">
                <PiBackpack size={iconSize} />
              </button>
              <button type="button" aria-label="Settings" className="text-4xl">
                <AiOutlineSetting size={iconSize} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
