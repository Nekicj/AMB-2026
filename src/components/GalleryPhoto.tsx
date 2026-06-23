import Image from "next/image"

type Props = {
  photo: { url: string }
}

export default function GalleryPhoto({ photo }: Props) {
  return (
    <div className="relative w-full sm:w-64 md:w-80 lg:w-72 h-48 sm:h-56 md:h-64">
      <Image
        src={`/images/gallery/${photo.url}`}
        alt="Gallery Photo"
        fill
        className="object-cover rounded-xl"
      />
    </div>
  )
}
