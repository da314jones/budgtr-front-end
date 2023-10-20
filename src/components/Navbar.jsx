import React from 'react'

export default function Navbar() {

    const toggleDarkMode = () => {
        if(document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localeStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }
  return (
    <nav className="bg-white dark:bg-gray-800 p-4">
      <button
        onClick={toggleDarkMode}
        className="text-white bg-gray-900 dark:bg-gray-100 p-2 rounded"
      >
        Toggle Dark Mode
      </button>
    </nav>
  )
}
