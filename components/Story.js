import { useState } from "react";
import Head from "next/head";
import {
  getLastLine,
  getPayTo,
  useRandomPayment,
  addLine,
  getLines,
  getContent,
} from "../model/story";
import { PaymentPicker } from "./PaymentPicker";

export function AddToStory({ story, saveStory }) {
  const lastLine = getLastLine(story);
  const lastPayTo = getPayTo(lastLine);

  const [payment, setPayment] = useState("");
  const [content, setContent] = useState("");
  const onSubmit = async () => {
    if (story && content && payment) {
      const newStory = addLine(story, content, payment);
      await saveStory(newStory);
    }
  };

  return (
    <>
      <Head>
        {lastPayTo && <meta name="monetization" content={lastPayTo} />}
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
      <PaymentPicker setPayment={setPayment} />
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
    <p className="mt-8 text-xl text-gray-500 leading-8">{getContent(line)}</p>
  );
}

export function DisplayStory({ story }) {
  const payment = useRandomPayment(story);
  return (
    <>
      <Head>{payment && <meta name="monetization" content={payment} />}</Head>
      {getLines(story).map((line) => (
        <DisplayLine line={line} />
      ))}
    </>
  );
}
