import usePokemon from '../utils/fetchData'
import { useState } from 'react'


export default function PokemonList() {

    const { pokemonMasterList, isLoading, toggleCatched } = usePokemon()
    const [showCatched, setShowCatched] = useState(false)
    const [pokemonFilter, setPokemonFilter] = useState('');

    if (isLoading) {
        return <div className="text-center text-3xl">Cargando la Pokédex...</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonFilter(e.target.value.toLowerCase());
    }

    const filteredPokemon = pokemonMasterList.filter(pokemon => {    
        return pokemon.name.toLowerCase().includes(pokemonFilter)
    })

    const finalFilteredPokemon = showCatched
        ? filteredPokemon.filter(pokemon => pokemon.catched)
        : filteredPokemon;

    return (
        <div className='container w-full'>
            <h2> Pokemon chocolate chart </h2>

            <div className='flex w-full justify-between items-center'>
                <input
                    type="text"
                    name='findPokemon'
                    placeholder='Find Pokemon'
                    className={`w-full block rounded border-2 border-cyan-700 my-8 h-auto] py-2 px-4 text-xl`}
                    onChange={handleChange}
                />
                <button
                    onClick={() => setShowCatched(!showCatched)}
                    className={`pokeball rounded-[50%] text-lg transition-all p-0 duration-350 w-12 h-12 flex justify-center focus:outline-0 items-center text-white ml-4 ${showCatched ? 'opacity-100' : 'opacity-50 shake' }`}
                >
                    {/* ✔ */}
                    <img 
                        src="../../Assets/pokeball-color.svg"
                        className='w-full h-full'
                    />
                </button>
            </div>

            <ul className="dexEntry ">
            {
                finalFilteredPokemon.map(pokemon => (
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
                                { '#' +pokemon.id }
                                <br />
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