import React, { useEffect, useState } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

const DogImg = () => {
  const [dogImg, setDogImg] = useState();
  const [isLoaded, setIsLoaded] = useState(true);
  const searchDog = async (e) => {
    e.preventDefault();
    setIsLoaded(false);
    const form = e.currentTarget;
    const searchTerm = form.elements[0].value;
    await axios
      .get(`https://dog.ceo/api/breed/${searchTerm}/images/random`)
      .then((response) => {
        setDogImg((prev) => (prev = response.data.message));
        console.log(dogImg);
      })
      .catch((err) => {
        console.log(err);
        setDogImg(
          (prev) =>
            (prev = `https://image.spreadshirtmedia.com/image-server/v1/products/T1459A839PA3861PT28D1043419389W10000H6821/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/error-404.jpg`)
        );
      });
  };

  useEffect(() => {
    setIsLoaded(true);
  }, [dogImg]);

  return (
    <div>
      <form onSubmit={searchDog}>
        <input type="text" name="dogSearch" placeholder="Search for a dog" />
        <button>Search</button>
      </form>
      {isLoaded ? (
        <img src={dogImg} alt={dogImg} />
      ) : (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
    </div>
  );
};
export default DogImg;
