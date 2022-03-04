import { useState } from "react";
import Head from "next/head";
import { getAllTiles, getImage, useRandomMonetization } from "../model/collage";
import { MonetizationPicker } from "./MonetizationPicker";


export function AddToCollage({ collage, saveCollage}) {
  const lastLine = getLastLine(story);
  const lastMonetization = getMonetization(lastLine);

  const [monetization, setMonetization] = useState("");
  const [content, setContent] = useState("");
  const onSubmit = async () => {
    if (story && content && monetization) {
      const newStory = addLine(story, content, monetization);
      await saveStory(newStory);
    }
  };

  return (
    <>
      <Head>
        {lastMonetization && <meta name="monetization" content={lastMonetization} />}
      </Head>
      <DisplayLine line={lastLine} />
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700"
      >
        Add the next line
      </label>
      <div className="mt-1">
        <textarea
          rows={4}
          name="nextLine"
          id="nextLine"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-xl"
          defaultValue={""}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <MonetizationPicker setMonetization={setMonetization} />
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

export function DisplayTile({ tile }) {
  return (
    <img src={getImage(tile)}></img>
  );
}

export function DisplayCollage({ collage }) {
  const monetization = useRandomMonetization(collage);
  return (
    <>
      <Head>
        {monetization && <meta name="monetization" content={monetization} />}
      </Head>
      {getAllTiles(collage).map((tile) => (
        <DisplayTile tile={tile} />
      ))}
    </>
  );
}
