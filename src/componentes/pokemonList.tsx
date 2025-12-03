import usePokemon from '../utils/fetchData'

export default function PokemonList() {

    const { pokemonMasterList, isLoading, toggleCatched } = usePokemon()

    if (isLoading) {
        return <div className="text-center text-3xl">Cargando la Pokédex...</div>;
    }

    return (
        <div className='container'>
            <h2> Pokemon chocolate chart </h2>
            <ul className="dexEntry ">
            {
                pokemonMasterList.map(pokemon => (
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