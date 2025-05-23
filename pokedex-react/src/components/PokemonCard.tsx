import React from "react";
import { useState } from "react";

type Props = {
    name: string;
    height: number;
    weight: number;
    sprites:{
        front_default: string | null;
    };
    types: Array<{
        type: { name: string}
    }>;
}

export function PokemonCard({name, height, weight, sprites, types}: Props){

    // favorito com useState = false -> padrão
    const [favorito, setFavorito] = useState(false);

    return(
        <div className={favorito ? "card fav-pokedex-card" : "card pokedex-card"}>
            <h3 className="pokedex-name">{favorito && "⭐"} {name}</h3>
            {sprites.front_default && (
                <img
                    src={sprites.front_default}
                    alt={name}
                    className="pokedex-image" />
            )}
            <p>
                <strong>Altura:</strong> {height * 10} cm
            </p>
            <p>
                <strong>Peso:</strong> {weight / 10} kg
            </p>
            <p>
                <strong>Tipos:</strong>{" "}
                {types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(" / ")}
            </p>

            {/* ao acionar o botão, o estado muda para favorito */}
            <button onClick={() => setFavorito(!favorito)} className={favorito? "btn pokedex-favorito" : "btn pokedex-normal"}>
                {favorito ? "Remover dos favoritos" : "Favoritar"}
            </button>

        </div>
    )
}