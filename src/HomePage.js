import React, { useState, useEffect } from 'react';
import CategoryFilter from './CategoryFilter';
import './App.css';

function HomePage() {
  const [joke, setJoke] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchJoke(selectedCategory);
  }, [selectedCategory]);

  const fetchJoke = async (category = '') => {
    setLoading(true);
    try {
      let apiUrl = 'https://api.chucknorris.io/jokes/random';
      if (category) {
        apiUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      setJoke(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar piada:', error);
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h1 className="title">Piadas do Chuck Norris!!!</h1>
      <CategoryFilter onSelectCategory={handleCategorySelect} />
      {loading ? (
        <p className="title-loading">Carregando piada...</p>
      ) : (
        <div>
          <p className="content">{joke.value}</p>
          <div className='content'>
            <a className="animated-button" href={joke.url} target="_blank" rel="noopener noreferrer">
              Ver Piada Completa
            </a>
          </div>
          <div className='content'>
            <button className='animated-button' onClick={() => fetchJoke(selectedCategory)}>
              Próxima Piada
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;


