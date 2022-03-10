import { useState, useCallback } from "react";
import Head from "next/head";
import {
  getMonetization,
  useRandomMonetization,
  addLine,
  getContent,
  useLines
} from "../model/story";
import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';
import { MonetizationPicker, orgForPointer } from "./MonetizationPicker";
import { getUUID, useWebMonetization } from "../model/utils";

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
    .min(140, "Please write a little more about what you liked about MozFest.")
    .required("Let us know what you liked about MozFest in order to submit!")
    .max(
      280,
      "Keep it brief! Submissions should be no longer than a Tweet (280 characters)"
    ),
});

export function AddToStory({ story, saveStory }) {
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
            placeholder="What was your favorite part of MozFest?"
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

export function DisplayLine({
  line,
  selectedLine,
  textColor = "text-gray-700",
  onClick,
}) {
  const myTextColor =
    selectedLine === undefined
      ? textColor
      : selectedLine === line
      ? textColor
      : "text-gray-700";
  return (
    <div
      id={getUUID(line)}
      className={`text-2xl mb-10 ${myTextColor} font-[krete] leading-8 cursor-pointer`}
      onClick={(e) => onClick(e, line)}
    >
      {getContent(line)}
    </div>
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
  const { isMonetizing } = useWebMonetization();
  const lines = useLines(story);

  const randomMonetization = useRandomMonetization(story);
  const [selectedLine, setSelectedLine] = useState();
  const selectLine = useCallback(function (e, line) {
    setSelectedLine(line);
  });
  const selectedMonetization = selectedLine && getMonetization(selectedLine);
  const monetization = selectedMonetization || randomMonetization;
  return (
    <>
      <Head>
        {monetization && (
          <meta name="monetization" content={monetization} key="monetization" />
        )}
      </Head>
      <h3 className="text-4xl mb-10 text-center">
        Here's what folks have been saying:
      </h3>
      {!isMonetizing ? (
        <h4 className="text-center mb-10 my-4">
          This page is not being monetized
        </h4>
      ) : (
        <>
          <h4 className="text-center my-4">
            It's being monetized for:&nbsp;
            <span className="font-bold">{orgForPointer(monetization)}</span>
          </h4>
          <p className="text-center mb-10">
            You can use your web monetization extension to send them a tip! If
            you click a comment below it will change who the page is monetized
            for, and let you tip - try clicking your favorite line and sending
            some cash to the very special organization chosen by the line's
            author!
          </p>
        </>
      )}
      {lines.map((line, i) => (
        <DisplayLine
          key={getUUID(line)}
          line={line}
          selectedLine={selectedLine}
          textColor={displayLineColor(i)}
          onClick={selectLine}
        />
      ))}
    </>
  );
}
