"use client";

import Image from "next/image";

interface CircleAvatarProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  size?: number;
}

const RectangleAvatar: React.FC<CircleAvatarProps> = ({
  src,
  alt,
  size = 40,
  ...props
}) => {
  return (
    <div style={{ width: size, height: size }}>
      <Image src={src} alt={alt} width={size} height={size} {...props} />
    </div>
  );
};

export default RectangleAvatar;
