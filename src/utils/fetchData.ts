import { useEffect, useState } from "react";

// Así (bueno no así, pero es parte de lo que ) llega de la API 
interface PokemonApiResponse {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
}

// Este tipado necesito yo
interface Pokemon {
    id:number;
    name:string;
    sprites: {
        front_default:string;
    };
    catched:boolean;
}



export default function usePokemon() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
    
    function capitalizeLetter(str: string) {
        if (str.length == 0) { return str; }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        // Funcion para llamar en el useEffect
        const loadPokemon = async () => {
            const promises = []
            for (let i = 1; i < 151; i++) {
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

            setPokemonList(cleanData)
        }

        loadPokemon()
    }, [])
    

    return { pokemonList, setPokemonList }
}
