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
import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';
import { MonetizationPicker, MysilioPointer } from "./MonetizationPicker";

export function Input({
  className = "",
  inputClassName = "",
  errorClassName = "",
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  const validationClassName = meta.touched
    ? meta.error
      ? "error"
      : "success"
    : "";
  return (
    <div className={`flex flex-col ${className}`}>
      <input
        className={`ipt ${validationClassName} ${inputClassName}`}
        {...field}
        {...props}
      />
      {meta.error && (
        <span className={`ipt-error-message ${errorClassName}`}>
          {meta.error.toString()}
        </span>
      )}
    </div>
  );
}

const NewLineSchema = Yup.object().shape({
  line: Yup.string()
    .min(140, "That's not enough to advance the story. Try writing more!")
    .required(
      "Even bad art is better than no art. Empty lines are not allowed."
    )
    .max(280, "That's too much! Leave some story for others!"),
});

export function AddToStory({ story, saveStory }) {
  const lastLine = getLastLine(story);

  const [monetization, setMonetization] = useState("");
  const onSubmit = async ({ line }) => {
    if (story && line && monetization) {
      const newStory = addLine(story, line, monetization);
      await saveStory(newStory);
    }
  };

  return (
    <>
      <h3 className="text-3xl mb-10">The story so far ends with:</h3>
      <span className="mt-8 text-xl text-gray-700 leading-8">
        &hellip; {getContent(lastLine)}
      </span>

      <Formik
        initialValues={{ line: "" }}
        validationSchema={NewLineSchema}
        onSubmit={onSubmit}
      >
        <Form className="mt-1">
          <Input
            type="text"
            name="line"
            id="line"
            className="shadow-sm block w-full border-0 border-b-2 text-xl mb-6 bg-transparent focus:ring-0 focus:shadow-none focus:outline-none focus:border-ocean"
            placeholder="add the next line..."
          />
          <MonetizationPicker setMonetization={setMonetization} />
          <div className="h-20 flex flex-row justify-end items-center px-6">
            <button
              type="submit"
              className="btn-md btn-filled btn-square h-10 ring-my-green text-my-green flex flex-row justify-center items-center"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
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
