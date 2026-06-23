import GalleryPhoto from "./GalleryPhoto"

type Photo = {
  id: string
  url: string
  alt?: string
}

type GalleryData = Record<string, Photo[]>

type Props = {
  gallery: { gallery: GalleryData }
}

export default function Gallery({ gallery }: Props) {
  return (
    <div>
      {Object.entries(gallery.gallery).map(([key, photosData]) => (
        <div className="mb-8" key={key}>
          <p className="text-2xl md:text-3xl font-bold mb-4">{key}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photosData.map((photo, index) => (
              <GalleryPhoto key={index} photo={photo} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
