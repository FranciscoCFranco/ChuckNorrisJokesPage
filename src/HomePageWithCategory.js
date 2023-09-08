import { useEffect } from 'react';
import './App.css';

function HomePageWithCategory({ selectedCategory }) {

  useEffect(() => {
    fetchJoke();
  }, [selectedCategory]);

  const fetchJoke = async () => {
    try {
      const apiUrl = selectedCategory
        ? `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
        : 'https://api.chucknorris.io/jokes/random';

      const response = await fetch(apiUrl);
      const data = await response.json();

    } catch (error) {
      console.error('Erro ao buscar piada:', error);
    }
  };

}

export default HomePageWithCategory;
