import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ReaderPage } from '../../pages/readerPage'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={<ReaderPage />}
      />
    </Routes>
  </BrowserRouter>
)
