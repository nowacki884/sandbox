import { AdvancedImage } from "@cloudinary/react"

import cloudinary from "../cloudinary"

interface CloudImageProps {
  imageUrl: string
}

export default function CloudImage({ imageUrl }: CloudImageProps) {
  return <AdvancedImage cldImg={cloudinary.image(imageUrl)} />
}
