"use client"
import Image from "next/image"

interface AvatarProps extends React.HTMLAttributes<HTMLImageElement> {
  image?: string | null
}

const Avatar: React.FC<AvatarProps> = ({ image }) => (
  <div className="relative w-14 h-14">
    <Image
      src={image || "/placeholder.jpg"}
      alt="avatar"
      fill
      className="
        ring 
        ring-offset-2 
        ring-gray-300
        rounded-full 
        overflow-hidden
      "
    />
  </div>
)
export default Avatar
