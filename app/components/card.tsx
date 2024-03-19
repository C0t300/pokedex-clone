"use client";
import React, { useEffect, useState } from "react";
import ModalC from "./modal";

interface CardProps {
  id: number;
}

interface Pokemon {
  name: string;
  image: string;
  id: number;
}

const Card: React.FC<CardProps> = ({ id }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [showModal, setShowModal] = useState(false);

  const threedigitid = ("00" + id).slice(-3);
  const imageLink = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${threedigitid}.png`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  if (!pokemon) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card my-3 text-center"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={imageLink}
        className="card-img-top"
        alt={pokemon.name}
        style={{ width: "200px", height: "200px" }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ textTransform: "capitalize" }}>
          {pokemon.name}
        </h5>
        <a onClick={handleOpenModal} className="btn btn-primary">
          Show more info
        </a>
      </div>
      <ModalC show={showModal} handleClose={handleCloseModal} id={pokemon.id} />
    </div>
  );
};

export default Card;
