// HomePage.js
import React, { useState, useEffect } from 'react';

function HomePage() {
  const [joke, setJoke] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      setJoke(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar piada:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Piadas do Chuck Norris</h1>
      {loading ? (
        <p>Carregando piada...</p>
      ) : (
        <div>
          <p>{joke.value}</p>
          <p>Categoria: {joke.category}</p>
          <a href={joke.url} target="_blank" rel="noopener noreferrer">Ver Piada Completa</a>
          <button onClick={fetchJoke}>Próxima Piada</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;



