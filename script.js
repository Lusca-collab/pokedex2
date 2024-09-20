
document.addEventListener('DOMContentLoaded', () => {
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonType = document.getElementById('pokemon-type');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const buscar = document.getElementById('buscar');
    const inserir = document.getElementById('inserir');

    let currentPokemonId = 1;

    const fetchPokemon = async (id) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            const data = await response.json();

            pokemonImage.src = data.sprites.front_default;
            pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            pokemonType.textContent = `Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;

            // Mudança de cor de fundo com base no tipo principal
            document.body.style.backgroundColor = getTypeColor(data.types[0].type.name);
        } catch (error) {
            console.error('Erro ao buscar o Pokémon:', error);
        }
    };

    const getTypeColor = (type) => {
        const typeColors = {
            fire: '#FF0000',
            water: '#aaf0f0',
            grass: '#00FF00',
            electric: '#FFFF00',
            ice: '#e0f0f0',
            fighting: '#f08080',
            poison: '#a040a0',
            ground: '#A66948',
            flying: '#d0d0ff',
            psychic: '#f0c0c0',
            bug: '#d0f0a0',
            rock: '#d0d0b0',
            ghost: '#a0a0f0',
            dragon: '#f0c0ff',
            dark: '#a0a0a0',
            steel: '#d0d0d0',
            fairy: '#f0a0f0',
        };
        return typeColors[type] || '#ffffff';
    };

    prevBtn.addEventListener('click', () => {
        if (currentPokemonId > 1) {
            currentPokemonId--;
            fetchPokemon(currentPokemonId);
        }
    });

    nextBtn.addEventListener('click', () => {
        currentPokemonId++;
        fetchPokemon(currentPokemonId);
    });

    buscar.addEventListener('click', () => {
        const searchQuery = inserir.value.trim().toLowerCase();
        if (searchQuery) {
            fetchPokemon(searchQuery);
        }


    })

    fetchPokemon(currentPokemonId);
});
