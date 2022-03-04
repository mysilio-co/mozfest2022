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
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start px-6 py-5">
        <label className="text-sm font-medium text-gray-900">
          What just happened?
        </label>
        <DisplayLine line={lastLine} />
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start px-6 py-5">
        <label className="text-sm font-medium text-gray-900">
          What happens next?
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2 flex flex-col">
          <textarea
            type="text"
            name="nextLine"
            id="nextLine"
            className="ipt"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className="divide-1 divide-gray-100">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start px-6 py-5">
          <label htmlFor="url" className="text-sm font-medium text-gray-900">
            Who should we monetize this for? (Input a Payment Pointer)
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2 flex flex-col">
            <PaymentPicker setPayment={setPayment} />
          </div>
        </div>
        <div className="h-20 bg-gray-50 flex flex-row justify-end items-center px-6">
          <button
            type="submit"
            className="btn-md btn-filled btn-square h-10 ring-my-green text-my-green flex flex-row justify-center items-center"
            onClick={onSubmit}
          >
            Add to the story
          </button>
        </div>
      </div>
    </>
  );
}

export function DisplayLine({ line }) {
  return (
    <div className="mt-1 sm:mt-0 sm:col-span-2 flex flex-col">
      <p>{getContent(line)}</p>
    </div>
  );
}

export function DisplayStory({ story }) {
  const payment = useRandomPayment(story);
  return (
    <>
      <Head>{payment && <meta name="monetization" content={payment} />}</Head>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start px-6 py-5">
        {getLines(story).map((line) => (
          <DisplayLine line={line} />
        ))}
      </div>
    </>
  );
}
