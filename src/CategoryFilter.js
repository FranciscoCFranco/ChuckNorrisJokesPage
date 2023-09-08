import React, { useState, useEffect } from 'react';

function CategoryFilter({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/categories');
      const data = await response.json();

      const translatedCategories = data.map((category) => {
        switch (category) {
          case 'dev':
            return 'Desenvolvimento';
          case 'animal':
            return 'Animais';
          default:
            return category;
        }
      });

      setCategories(translatedCategories);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div>
      <h2>Filtrar por Categoria:</h2>
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Todas as Categorias</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
