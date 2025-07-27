import { type ChangeEvent, useState } from 'react'
import JSZip from 'jszip'
import clsx from 'clsx'
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
    <div className='px-5 space-y-3'>
      <div className='flex justify-center mt-3'>
        <label
          htmlFor='fileInput'
          className='cursor-pointer text-sm py-1 px-3 border font-medium bg-stone-50 text-stone-700 hover:bg-blue-50 hover:text-blue-700'
        >
          Pick up a comics
        </label>
        <input
          onChange={handleChange}
          className='hidden'
          id='fileInput'
          type='file'
        />
      </div>
      <div className={clsx('flex justify-center', !pages.length && 'hidden')}>
        <p>
          {currentPage + 1}/{pages.length}
        </p>
      </div>
      <div className='flex justify-center items-center h-full w-full'>
        <button
          className='size-1/6'
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {Boolean(pages.length) && currentPage !== 0 && <ArrowLeftIcon />}
        </button>

        <div className='flex-grow flex justify-center px-[8.33%] w-max'>
          <img
            className='max-h-full max-w-full object-contain border rounded-lg'
            src={pages[currentPage]}
            alt='Here would be comics'
          />
        </div>

        <button
          className='size-1/6'
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {Boolean(pages.length) && currentPage !== pages.length - 1 && (
            <ArrowRightIcon />
          )}
        </button>
      </div>
    </div>
  )
}
