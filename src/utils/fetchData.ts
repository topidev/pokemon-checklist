import { useEffect, useState } from "react";
import type { Pokemon, PokemonApiResponse, CatchedState } from "./types"


const POKEMON_COUNT = 150
const CATCHED_STATE_KEY = 'userCatchedState'
const POKEMON_CACHE_KEY = 'cachedPokemonList'

export default function usePokemon() {
    const [isLoading, setIsLoading] = useState(true)
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
    const [catchedState, setCatchedState] = useState<CatchedState>({});
    
    function capitalizeLetter(str: string) {
        if (str.length == 0) { return str; }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        setIsLoading(true)


        // Buscamos en caché los datos
        const savedCatchedState = localStorage.getItem(CATCHED_STATE_KEY);
        if (savedCatchedState) {
            setCatchedState(JSON.parse(savedCatchedState));
        }

        const cachedData = localStorage.getItem(POKEMON_CACHE_KEY)

        if (cachedData) {
            const data: Pokemon[] = JSON.parse(cachedData)
            setPokemonList(data)
            setIsLoading(false)
            return;
        }

        // Si no hay datos
        const loadPokemon = async () => {
            console.log("pokemon isLoading")
            try {
                const promises = []
                for (let i = 1; i <= POKEMON_COUNT; i++) {
                    // Cargar todas las promesas (muchos fetch)
                    promises.push(
                        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json())
                    );
                }
                
                // Esperar a que se cumplan las promesas (lleguen los pokemon)
                const rawResults = await Promise.all(promises)
    
                // Transformar datos
                // Limpiar los datos que llegan, cambiar al tipo de datos que necesito
                const cleanData: Pokemon[] = rawResults.map((data: PokemonApiResponse) => ({
                    id: data.id,
                    name: capitalizeLetter(data.name),
                    sprites: data.sprites,
                    catched: false
                }))

                localStorage.setItem(POKEMON_CACHE_KEY, JSON.stringify(cleanData))
                setPokemonList(cleanData)

            } catch (error) {
                console.error("Error getting API data", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadPokemon()
    }, [])
    
    const toggleCatched = (id: number) => {
        setCatchedState(prev => {
            const newState = {
                ...prev,
                [id]: !prev[id]
            }
            localStorage.setItem(CATCHED_STATE_KEY, JSON.stringify(newState))
            return newState;
        })
    }

    const pokemonMasterList: Pokemon[] = pokemonList.map(p => ({
        ...p,
        catched: !!catchedState[p.id]
    }))


    return { pokemonMasterList, isLoading, toggleCatched }
}
