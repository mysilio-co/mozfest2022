import { useState, useCallback } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  getLastLine,
  getMonetization,
  useRandomMonetization,
  addLine,
  getLines,
  getContent,
  useRandomStorySlug
} from "../model/story";
import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';
import { MonetizationPicker, orgForPointer } from "./MonetizationPicker";
import { useWebMonetization } from "../model/utils";

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
  const { isMonetizing } = useWebMonetization();

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
            className="block w-full border-0 text-xl mb-6 bg-transparent focus:ring-0 focus:shadow-none focus:outline-none focus:border-ocean"
            placeholder="add the next line..."
          />
          <MonetizationPicker setMonetization={setMonetization} />
          <div className="h-20 flex flex-row justify-end items-center px-6">
            {!isMonetizing ? (
              <h3 className="text-3xl mt-10">
                Please enable Web Monetization to participate
              </h3>
            ) : (
              <button
                type="submit"
                className="btn-md btn-filled btn-square h-10 ring-my-green text-my-green flex flex-row justify-center items-center text-3xl"
              >
                Submit
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
}

export function DisplayLine({ line, selectedLine, textColor = "text-gray-700", onClick }) {
  const myTextColor = selectedLine === undefined ? textColor : (selectedLine === line ? textColor : 'text-gray-700')
  return (
    <span className={`text-2xl ${myTextColor} font-[krete] leading-8 cursor-pointer`} onClick={(e) => onClick(e, line)}>
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

export function DisplayStory({ slug, story }) {
  const nextStorySlug = useRandomStorySlug({ ignore: slug });
  const { isMonetizing } = useWebMonetization();

  const randomMonetization = useRandomMonetization(story);
  const [selectedLine, setSelectedLine] = useState()
  const selectLine = useCallback(function (e, line) {
    setSelectedLine(line)
  })
  const selectedMonetization = selectedLine && getMonetization(selectedLine)
  const monetization = selectedMonetization || randomMonetization
  return (
    <>
      <Head>
        {monetization && (
          <meta name="monetization" content={monetization} key="monetization" />
        )}
      </Head>
      <h3 className="text-4xl mb-10 text-center">The story so far!</h3>
      {!isMonetizing ? (
        <h4 className="text-center mb-10">
          Please enable Web Monetization to participate
        </h4>
      ) : (
        <>
          <h4 className="text-center my-4">
            It's being monetized for:&nbsp;
            <span className="font-bold">{orgForPointer(monetization)}</span>
          </h4>
          <p className="text-center mb-10">
            You can use your web monetization extension to send them a tip! If
            you click a line below it will change who the page is monetized for,
            and let you tip - try clicking your favorite line and sending some
            cash to the very special organization chosen by the line's author!
          </p>
        </>
      )}
      {getLines(story).map((line, i) => (
        <>
          <DisplayLine
            line={line}
            selectedLine={selectedLine}
            textColor={displayLineColor(i)}
            onClick={selectLine}
          />
          &nbsp;
        </>
      ))}
      {nextStorySlug && (
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto text-right">
          <h2>
            <Link href={`/story/${nextStorySlug}`}>
              <a>Join another Story</a>
            </Link>
          </h2>
        </div>
      )}
    </>
  );
}
