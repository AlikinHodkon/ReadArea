import JSZip from 'jszip'
import { type ChangeEvent, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

function App() {

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
      <div className="flex justify-center gap-2 items-center h-full">
        <ArrowLeftIcon className="size-1/5" onClick={() => setCurrentPage(currentPage - 1)} />
        <img className="w-10/12 h-full" src={pages[currentPage]} alt="comics page" />
        <ArrowRightIcon className="size-1/5" onClick={() => setCurrentPage(currentPage + 1)} />
      </div>
    </>
  )
}

export default App
