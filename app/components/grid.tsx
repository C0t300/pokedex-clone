"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";

interface Item {
  name: string;
  id: number;
  url?: string;
}

const Grid: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [offset, setOffset] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    initialFetchData();
  }, []);

  const initialFetchData = async () => {
    let offset = items.length;
    let limit = itemsPerPage;
    console.log("Fetching data...", offset, limit);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      console.log(data);
      const formattedData = data.results.map((element: { url: string }) => {
        let url = element.url;
        let id = url.split("/")[6];
        return { ...element, id }; // Create a new object with the id added
      });
      setItems(formattedData);
      setOffset(offset + itemsPerPage); // Update the offset for the next fetch
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    let offset = items.length;
    let limit = itemsPerPage;
    console.log("Fetching data...", offset, limit);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      console.log(data);
      const formattedData = data.results.map((element: { url: string }) => {
        let url = element.url;
        let id = url.split("/")[6];
        return { ...element, id }; // Create a new object with the id added
      });
      setItems((prevItems) => [...prevItems, ...formattedData]);
      setOffset(offset + itemsPerPage); // Update the offset for the next fetch
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {items.map((item: { name: string; id: number }) => (
          <div className="col-md-4" key={item.id}>
            <Card id={item.id} />
          </div>
        ))}
      </div>
      <div className="row text-center mb-5">
        <div className="col-md-12">
          <button className="btn btn-primary" onClick={fetchData}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grid;
