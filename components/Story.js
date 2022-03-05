import { useState } from "react";
import Head from "next/head";
import {
  getLastLine,
  getMonetization,
  useRandomMonetization,
  addLine,
  getLines,
  getContent,
} from "../model/story";
import { MonetizationPicker } from "./MonetizationPicker";

export function AddToStory({ story, saveStory }) {
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
      <h3 className="text-3xl mb-10">The story so far ends with:</h3>
      <span className="mt-8 text-xl text-gray-700 leading-8">
        &hellip; {getContent(lastLine)}
      </span>

      <div className="mt-1">
        <textarea
          rows={4}
          name="nextLine"
          id="nextLine"
          className="shadow-sm block w-full border-0 rounded-md text-xl mb-6 bg-transparent"
          placeholder="add the next line..."
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

export function DisplayLine({ line }) {
  return (
    <p className="mt-8 text-xl text-gray-700 leading-8">{getContent(line)}</p>
  );
}

export function DisplayStory({ story }) {
  const monetization = useRandomMonetization(story);
  return (
    <>
      <Head>{monetization && <meta name="monetization" content={monetization} />}</Head>
      {getLines(story).map((line) => (
        <DisplayLine line={line} />
      ))}
    </>
  );
}
