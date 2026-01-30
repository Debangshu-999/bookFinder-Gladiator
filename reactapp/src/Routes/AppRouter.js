import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookForm from '../BookRecommenderComponents/BookForm'
import ErrorPage from '../Components/ErrorPage'
import ViewBook from '../BookRecommenderComponents/ViewBook'
import HomePage from '../Components/HomePage'

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/error' element={<ErrorPage />} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/newBook' element={<BookForm />} />
          <Route path='/editBook/:id' element={<BookForm />} />
          <Route path='/viewbook' element={<ViewBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter