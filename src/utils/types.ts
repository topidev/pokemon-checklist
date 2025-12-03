// Así (bueno no así, pero es parte de lo que ) llega de la API 
export interface PokemonApiResponse {
    id: number;
    name: string;
    sprites: { front_default: string; };
}

// Este tipado necesito yo
export interface Pokemon extends PokemonApiResponse{
    catched:boolean;
}

export type CatchedState = {
    [id: number]: boolean;
}