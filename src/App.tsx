import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchForm from './components/SearchForm/SearchForm'
import SearchResults from './components/SearchResults/SearchResults'

function App() {
  return (
    <>
      <SearchForm />
      <SearchResults />
    </>
  )
}

export default App
