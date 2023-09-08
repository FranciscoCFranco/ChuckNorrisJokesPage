// HomePage.js
import React, { useState, useEffect } from 'react';

function HomePage({ selectedCategory }) {
    const [joke, setJoke] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJoke();
    }, [selectedCategory]);

    const fetchJoke = async () => {
        setLoading(true);
        try {
            const apiUrl = selectedCategory
                ? `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
                : 'https://api.chucknorris.io/jokes/random';

            const response = await fetch(apiUrl);
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
            <h2>Piadas do Chuck Norris</h2>
            {loading ? (
                <p>Carregando piada...</p>
            ) : (
                <div>
                    <p>{joke.value}</p>
                    <p>Categoria: {joke.category}</p>
                    <a href={joke.url} target="_blank" rel="noopener noreferrer">
                        Ver Piada Completa
                    </a>
                    <button onClick={fetchJoke}>Próxima Piada</button>
                </div>
            )}
        </div>
    );
}

export default HomePage;

