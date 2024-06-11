// SearchBar.js

import { useState } from 'react';
import './SearchBar.css'
import { HiOutlineSearch } from 'react-icons/hi'; // Importa el icono de búsqueda

export function SearchBar({ placeholder, onSearch }) {
  const [valor, setValor] = useState('');
  const handleInputChange = (event) => {
    setValor(event.target.value);
  };

  const handleSearch = () => {
    const parameter =`?word=${valor}`;
    onSearch(parameter);
  };

  const handleKeyPress = (event) => {
    // Verificar si la tecla presionada es "Enter"
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="parent-search">
      <input type="text" value={valor} placeholder={placeholder} onChange={handleInputChange}  onKeyDown={handleKeyPress}/>
      <button onClick={
          handleSearch
      }>
        <HiOutlineSearch />
      </button>
    </div>
  );
}