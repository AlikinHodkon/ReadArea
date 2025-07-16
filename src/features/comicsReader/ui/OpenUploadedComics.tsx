import { type ChangeEvent, useState } from 'react'
import JSZip from 'jszip'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

export const OpenUploadedComics = () => {
  const [pages, setPages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    JSZip.loadAsync(e.target?.files?.[0]).then((zip) => {
      const files = Object.values(zip.files).slice(1)

      ;(async () => {
        const allPages = []
        for (const imgEntry of files) {
          try {
            const imgData = await imgEntry.async('uint8array')
            const blob = new Blob([imgData], { type: 'image/jpg' })
            const imgUrl = URL.createObjectURL(blob)

            allPages.push(imgUrl)
          } catch (error) {
            console.error(`Ошибка при обработке ${imgEntry.name}:`, error)
          }
        }
        setPages(allPages)
      })()
    })
  }

  return (
    <>
      <div className="flex justify-center">
        <input
          onChange={handleChange}
          type='file'
        />
      </div>
      <div className="flex justify-center items-center h-full w-full">
        <button className="size-1/5" onClick={() => setCurrentPage(currentPage - 1)}>
          {currentPage !== 0 && ( <ArrowLeftIcon /> )}
        </button>

        {/* Картинка с отступами w-1/12 (8.33%) */}
        <div className="flex-grow flex justify-center px-[8.33%]">
          <img
            className="max-h-full max-w-full object-contain"
            src={pages[currentPage]}
            alt="Here would be comics"
          />
        </div>

        <button className="size-1/5" onClick={() => setCurrentPage(currentPage + 1)}>
          {currentPage !== pages.length - 1 && ( <ArrowRightIcon /> )}
        </button>
      </div>
    </>
  )
}