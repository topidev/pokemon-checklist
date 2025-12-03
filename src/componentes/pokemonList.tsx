import usePokemon from '../utils/fetchData'

export default function PokemonList() {

    const { pokemonList, setPokemonList } = usePokemon()

    const toggleCatched = (id: number) => {
        const newList = pokemonList.map(p => 
            p.id === id ? { ... p, catched: !p.catched } : p
        );
        setPokemonList(newList)
    }

    return (
        <div className='container'>
            <h2> Pokemon chocolate chart </h2>
            <ul className="dexEntry ">
            {
                pokemonList.map(pokemon => (
                    <li 
                        className={`pokemon ${pokemon.catched ? 'catched': 'wild'}`} 
                        key={ pokemon.id }
                    >
                        <div 
                            className="pk"
                            onClick={() => toggleCatched(pokemon.id)}
                        >
                            <img
                                src={ pokemon.sprites.front_default }
                                className='img-responsive'
                            />
                            <p className='text-center text-2xl text-black'>
                                { pokemon.name }
                            </p>
                        </div>
                    </li>
                ))
            }
            </ul>
        </div>
    )

}