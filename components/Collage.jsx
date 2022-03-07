import { useState } from "react";
import Head from "next/head";
import {
  getAllTiles,
  getImage,
  useRandomMonetization,
  useMaxCoordinates,
  getVisibleTiles,
  getCoordinates,
} from "../model/collage";
import { MonetizationPicker, MysilioPointer } from "./MonetizationPicker";
import { ImageUploadModal } from "./ImageUploader";

export function AddToCollage({ collage, saveCollage}) {
  const { x, y } = useMaxCoordinates(collage);

  const [monetization, setMonetization] = useState("");
  const [image, setImage] = useState("");
  const [coordinates, setCoordinates] = useState(undefined);

  const openModal = () => {
    setCoordinates({ x, y });
  }


  const closeModal = () => {

  }


  const onSubmit = async () => {
    if (collage && image && monetization && coordinates) {
      const newCollage = addTile(collage, image, monetization, coordinates);
      await saveCollage(newCollage);
    }
  };

  return (
    <>
      <Head>
        <meta name="monetization" content={MysilioPointer} />
      </Head>
      <MonetizationPicker setMonetization={setMonetization} />
      <div class={`grid grid-cols-${x + 1} grid-rows-${y + 1}`}>
        {getVisibleTiles(collage).map((tile) => (
          <DisplayTile tile={tile} />
        ))}
        {getHiddenTiles(collage).map((tile) => (
          <DisplayTile className="blur" tile={tile} />
        ))}
        {getAddTileCoordinates(collage)
          .values()
          .map(({ x, y }) => (
            <ImageUploadTile x={x} y={y} />
          ))}
      </div>
      <div className="h-20 flex flex-row justify-end items-center px-6">
        <button
          type="submit"
          className="btn-md btn-filled btn-square h-10 ring-my-green text-my-green flex flex-row justify-center items-center"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export function ImageUploadTile({x, y, openModal}) {
  return (
    <div className={`col-start-${x} row-start-${y}`}>
      <button className="text-4xl" onClick={() => openModal({x, y})}>
        +
      </button>
    </div>
  )
}

export function DisplayTile({ tile }) {
  const { x, y } = getCoordinates(tile);
  return (
    <div className={`col-start-${x} row-start-${y}`}>
      <img src={getImage(tile)} />
    </div>
  );
}

export function DisplayCollage({ collage }) {
  const monetization = useRandomMonetization(collage);
  const { x, y } = useMaxCoordinates(collage);

  return (
    <>
      <Head>
        {monetization && <meta name="monetization" content={monetization} />}
      </Head>
      <div className={`grid grid-cols-${x} grid-rows-${y}`}>
        {getAllTiles(collage).map((tile) => (
          <DisplayTile tile={tile} />
        ))}
      </div>
    </>
  );
}
