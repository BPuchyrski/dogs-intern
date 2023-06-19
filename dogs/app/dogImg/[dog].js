import { Stack, useSearchParams } from "expo-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

const dogPhotos = () => {
  const { dog } = useSearchParams();
  const [photos, setPhotos] = useState();

  const getDogPhotos = async () => {
    await axios
      .get(`https://dog.ceo/api/breed/${dog}/images/random`)
      .then((res) => {
        console.log(res.data.message);
        setPhotos((prev) => (prev = res.data.message));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDogPhotos();
  }, [dog]);

  return (
    <div>
      <Stack.Screen options={{ headerTitle: `${dog}` }} />
      {photos ? (
        <img src={photos} alt={dog} />
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

export default dogPhotos;
