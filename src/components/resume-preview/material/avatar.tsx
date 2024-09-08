"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps, StaticImageData } from "next/image";

interface AvatarProps extends ImageProps {
  src: string | StaticImageData;
  type?: "circle" | "square";
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  type = "circle",
  size = 40,
  ...props
}) => {
  return (
    <Image
      className={cn({
        "rounded-full": type === "circle",
        "rounded-md": type === "square",
      })}
      src={src}
      width={size}
      height={size}
      {...props}
      objectFit="cover"
      alt="Avatar"
    />
  );
};

export default Avatar;
