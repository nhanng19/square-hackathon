import { getPokemon } from "@/lib/pokemonAPI";
import Image from "next/image";
import { PokemonImage } from "@/components/ui/pokemon-image";
// localhost:3000/pikachu

// pokemonName

// pokemonName = "pikuchu" -> show the Pikachu page

export default async function PokemonPage( { params } : { params: { pokemonName: string }}) {
    // Object destructuring 
    const { pokemonName } = params;
    // pikachu
    // get the API data for pikachu
    const pokemonObject = await getPokemon(pokemonName);

    console.log(pokemonObject)

    return (
        <>
            <h1 className="text-4xl text-bold pt-4">{pokemonName}</h1>
            <div className="m-4" style={{position: "relative", width: "300px", height: "300px"}} >
                <PokemonImage 
                    image={pokemonObject.sprites.other['official-artwork'].front_default}
                    name={pokemonName}
                />
            </div>
           
        </>
    )
}