import Image from "next/image";
import { ReactNode } from "react";

interface BackgroundProps {
  src: string;
  children?: ReactNode;
}

function Background({ src, children }: BackgroundProps) {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute -z-10 h-full w-full">
        <Image src={src} fill objectFit="cover" alt="Background image" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default Background;
