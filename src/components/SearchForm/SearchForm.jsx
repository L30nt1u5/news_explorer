import { useState } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!keyword.trim()) {
      setError('Please enter a keyword')
      return
    }

    onSearch(keyword.trim())
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Enter topic"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value)
          if (error) setError('')
        }}
        maxLength={100}
      />
      {error && <span className="search-form__error">{error}</span>}
      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  )
}

export default SearchForm
