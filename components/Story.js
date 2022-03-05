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
import { MonetizationPicker, MysilioPointer } from "./MonetizationPicker";

export function AddToStory({ story, saveStory }) {
  const lastLine = getLastLine(story);

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
        <meta name="monetization" content={MysilioPointer} />
      </Head>
      <h3 className="text-3xl mb-10">The story so far ends with:</h3>
      <span className="mt-8 text-xl text-gray-700 leading-8">
        &hellip; {getContent(lastLine)}
      </span>

      <div className="mt-1">
        <input
          type="text"
          name="nextLine"
          id="nextLine"
          className="shadow-sm block w-full border-0 border-b-2 text-xl mb-6 bg-transparent focus:ring-0 focus:shadow-none focus:outline-none focus:border-ocean"
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

export function DisplayLine({ line, textColor = "text-gray-700" }) {
  return (
    <span className={`mt-8 text-3xl ${textColor} leading-8 font-[stix-two-text]`}>
      {getContent(line)}
    </span>
  );
}

const displayLineColors = [
  'text-amber-600',
  'text-indigo-700',
  'text-rose-600',
  'text-sky-700',
  'text-fuchsia-700',
  'text-teal-600',
]

function displayLineColor(i) {
  return displayLineColors[i % displayLineColors.length]
}

export function DisplayStory({ story }) {
  const monetization = useRandomMonetization(story);
  return (
    <>
      <Head>{monetization && <meta name="monetization" content={monetization} />}</Head>
      <h3 className="text-3xl mb-10">Here's the story so far:</h3>
      {getLines(story).map((line, i) => (
        <>
          <DisplayLine line={line} textColor={displayLineColor(i)} />&nbsp;
        </>
      ))}
    </>
  );
}
