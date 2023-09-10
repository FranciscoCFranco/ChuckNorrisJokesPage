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
    <div className='image'>
      <h1 className="title">Piadas do Chuck Norris</h1>
      <CategoryFilter onSelectCategory={handleCategorySelect} />
      {loading ? (
        <p className="title-loading" aria-live="polite">
          Carregando piada...
        </p>
      ) : (
        <div>
          <div className="content5" role="status">
            <p>{joke.value}</p>
          </div>
          <div className="content">
            <a
              className="animated-button"
              href={joke.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver Piada Completa"
            >
              Ver Piada Completa
            </a>
          </div>
          <div className="content">
            <button
              className="animated-button content"
              onClick={() => fetchJoke(selectedCategory)}
              aria-label="Próxima Piada"
            >
              Próxima Piada
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
