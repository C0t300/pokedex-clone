"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { types } from "util";

interface ModalProps {
  id: number;
  show: boolean;
  handleClose: () => void;
}

interface Pokemon {
  id: number;
  name: string;
  image: string;
  abilities: Ability[];
  stats: Stat[];
  types: Type[];
  moves: Move[];
  height: number;
  weight: number;
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Move {
  move: {
    name: string;
    url: string;
  };
}

interface charactertistic {
  id: number;
  gene_modulo: number;
  possible_values: number[];
  highest_stat: {
    name: string;
    url: string;
  };
  descriptions: description[];
}

interface description {
  description: string;
  language: {
    name: string;
    url: string;
  };
}

const ModalC: React.FC<ModalProps> = ({ show, handleClose, id }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const threedigitid = ("00" + id).slice(-3);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        let pok = {
          id: data.id,
          name: data.name,
          image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${threedigitid}.png`,
          abilities: data.abilities,
          stats: data.stats,
          types: data.types,
          moves: data.moves,
          height: data.height,
          weight: data.weight,
        };
        //console.log(pok);
        setPokemon(pok);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
  }, [id]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title
          style={{ textTransform: "capitalize", textAlign: "center" }}
        >
          {pokemon ? pokemon.name : "Loading..."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pokemon ? (
          <>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <h2 style={{ textTransform: "capitalize" }}>{pokemon.name}</h2>
            <p>
              Height: {pokemon.height} dm | Weight: {pokemon.weight} hg
            </p>
            <table className="table">
              <thead className="text-center">
                <tr>
                  <th>Potential Moves</th>
                  <th>Stats</th>
                  <th>Types</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <ul className="list-group list-group-flush">
                      {pokemon.moves.map((move, index) => (
                        <li
                          className="list-group-item"
                          key={index}
                          style={{ textTransform: "capitalize" }}
                        >
                          {move.move.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul className="text-right list-group list-group-flush">
                      {pokemon.stats.map((stat, index) => (
                        <li
                          className="list-group-item"
                          style={{ textTransform: "capitalize" }}
                          key={index}
                        >
                          {stat.stat.name} - {stat.base_stat}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul className="list-group list-group-flush">
                      {pokemon.types.map((type, index) => (
                        <li
                          className="list-group-item"
                          style={{ textTransform: "capitalize" }}
                          key={index}
                        >
                          {type.type.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalC;
