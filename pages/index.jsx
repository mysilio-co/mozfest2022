import { useMemo, useState } from "react";
import Head from 'next/head'
import {
  buildThing,
  getUrlAll,
  setThing,
  createThing,
  getThingAll,
  getStringNoLocale,
  asUrl,
} from "@inrupt/solid-client";
import { useThing, useResource } from "swrlit";
import { RDF, DCTERMS } from "@inrupt/vocab-common-rdf";
import { WM, SIOC, EXQ } from "../vocab";

const CollageResourceUrl =
  "https://exquisite-corpse.mysilio.me/mozfest2022/collage.ttl"; 
const StoryResourceUrl =
  "https://exquisite-corpse.mysilio.me/mozfest2022/story.ttl";

function urlForStoryLine(n) {
  return `${StoryResourceUrl}#${n}`;
}

function isLiteralTerm(s) {
  return typeof s === "string" || s instanceof String;
}

function hasRDFTypes(thing, ts) {
  const types = getUrlAll(thing, RDF.type);
  console.log(types);
  let hasAllTypes = true;
  for (let t of ts) {
    const s = isLiteralTerm(t) ? t : t.value;
    hasAllTypes = hasAllTypes && types.includes(s);
  }
  return hasAllTypes;
}

function hasRDFType(thing, t) {
  return hasRDFTypes(thing, [t]);
}

function getLineNum(line) {
  const url = line && new URL(asUrl(line));
  return url && parseInt(url.hash);
}

function getContent(line) {
  return line && getStringNoLocale(line, SIOC.content);
}

function getPayTo(line) {
  return line && getStringNoLocale(line, WS.paymentPointer);
}

function getLastLine(story) {
  return story && Math.max(getLines(story).map(getLineNum))
}

function getLines(story) {
  return (
    story &&
    getThingAll(story)
      .filter((t) => hasRDFType(t, EXQ.Line))
      .sort((a, b) => getLineNum(a) - getLineNum(b))
  );
}

function useRandomPayTo(story) {
  return useMemo(() => {
    const lines = story && getLines(story);
    const line = lines[Math.floor(Math.random() * lines.length)];
    return getPayTo(line);
  }, [story]);
}

function createLineThing(content, payTo, n) {
  return buildThing(createThing({ url: urlForStoryLine(n) }))
    .addUrl(RDF.type, EXQ.Line)
    .addDatetime(DCTERMS.created, new Date())
    .addStringNoLocale(SIOC.content, content)
    .addStringNoLocale(WM.PaymentPointer, payTo)
    .build();
}

function addLine(story, content, payTo) {
  const prevLine = story && getLastLine(story);
  const prevNum = prevLine && getLineNum(prevLine);
  const nextNum = prevNum ? prevNum++ : 0;
  const newLine = content && payTo && createLineThing(content, payTo, nextNum);
  return story && setThing(story, newLine);
}

function AddToStory({ story, saveStory }) {
  const lastLine = getLastLine(story);
  const lastPayTo = getPayTo(lastLine);

  const [ payTo, setPayTo ] = useState("");
  const [ content, setContent ] = useState("");
  const onSubmit = async () => {
    if (story && content && payTo) {
      const newStory = addLine(story, content, payTo);
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
            <input
              type="text"
              name="payment"
              id="payment"
              className="ipt"
              onChange={(e) => setPayTo(e.target.value)}
            />
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

function DisplayLine({ line }) {
  return (
    <div className="mt-1 sm:mt-0 sm:col-span-2 flex flex-col">
      <p>{getContent(line)}</p>
    </div>
  );
}

function DisplayStory({ story }) {
  const payTo = useRandomPayTo(story);
  return (
    <>
      <Head>
        {payTo && <meta name="monetization" content={payTo} />}
      </Head>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start px-6 py-5">
        {getLines(story).map((line) => (
          <DisplayLine line={line} />
        ))}
      </div>
    </>
  );
}

export default function ExquisiteCorpse() {
  const { resource, save } = useResource(StoryResourceUrl);
  const { fullStoryDisplay, setFullStoryDisplay } = useState(false);

  async function saveAndDisplayStory(newStory) {
    await save(newStory);
    setFullStoryDisplay(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <section className="content">
        <div className="mx-auto rounded-lg overflow-hidden bg-white flex flex-col items-stretch">
          <div className="flex flex-row justify-between self-stretch h-18 p-6 bg-my-green">
            <div className="flex flex-row justify-start items-start gap-4">
              <h1 className="text-white font-bold text-xl">
                Welcome to Exquisite Corpse
              </h1>
              <h3>TODO Tani</h3>
            </div>
          </div>
          {fullStoryDisplay ? (
            <DisplayStory story={resource} />
          ) : (
            <AddToStory story={resource} saveStory={saveAndDisplayStory} />
          )}
        </div>
      </section>
    </main>
  );
}
