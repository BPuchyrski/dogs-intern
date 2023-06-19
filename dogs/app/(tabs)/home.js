import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
const Home = () => {
  const [dogs, setDogs] = useState([]);

  const getDogsList = async () => {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    const listOfDogs = Object.keys(response.data.message);
    setDogs((prev) => prev.concat(listOfDogs));
  };

  useEffect(() => {
    getDogsList();
  }, []);

  const styles = StyleSheet.create({
    list: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      overflow: "auto",
    },
    item: {
      listStyle: "none",
      flexBasis: "calc((100% - 2 * 1rem) / 3)",
    },
  });

  return (
    <ul style={styles.list}>
      {dogs.map((dog) => (
        <li style={styles.item} key={dog}>
          <Link href={`/dogImg/${dog}`}>{dog}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Home;
