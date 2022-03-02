import { useState } from "react";
import {
  buildThing,
  addUrl,
  setThing,
  getThingAll,
  getStringNoLocale,
  asUrl,
} from "@inrupt/solid-client";
import { useThing, useResource } from "swrlit";
import { RDF, DCTERMS } from "@inrupt/vocab-common-rdf";
import { WM, SIOC, ExquisiteCorpse} from "../vocab"

const CollageBaseUrl =
  "https://exquisite-corpse.mysilio.me/mozfest2022/collage.ttl"; 
const StoryBaseUrl =
  "https://exquisite-corpse.mysilio.me/mozfest2022/story.ttl";

function urlForStoryLine(n) {
  return `${StoryBaseUrl}#${n}`;
}

function hasRDFTypes(thing, ts) {
  const types = getUrlAll(thing, RDF.type);
  let hasAllTypes = true;
  for (let t of ts) {
    hasAllTypes = hasAllTypes && types.includes(t);
  }
  return hasAllTypes;
}

function hasRDFType(thing, t) {
  return hasRDFTypes(thing, [t]);
}

function getLineNum(line) {
  const url = new URL(asUrl(line))
  return parseInt(url.hash)
}

function getContent(line) {
  return getStringNoLocale(line, SIOC.content);
}

function getLastLine(story) {
  return Math.max(getLines(story).map(getLineNum))
}

function getLines(story) {
  return getThingAll(story).filter(t => hasRDFType(t, ExquisiteCorpse.Line))
}

function createLineThing(content, payTo, n) {
  return buildThing(createThing({ url: urlForStoryLine(n) }))
    .addUrl(RDF.type, ExquisiteCorpse.Line)
    .addUrl(SIOC.content, content)
    .addUrl(WM.PaymentPointer, payTo)
    .addUrl(DCTERMS.created, Date.now())
    .build();
}

function addLine(story, content, payTo) {
  const prevLine = getLastLine(story);
  const prevNum = getLineNum(prevLine);
  const newLine = createLineThing(line, content, payTo, prevNum++);
  return setThing(story, newLine);
}

function AddToStory({ story, saveStory }) {
  const lastLine = getLastLine(story);

  const { payTo, setPayTo } = useState("");
  const { content, setContent } = useState("");
  const onSubmit = async () => {
    if (story && content && payTo) {
      const newStory = addLine(story, content, payTo);
      await saveStory(newStory);
    }
  };

  return (
    <>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start px-6 py-5">
        <label className="text-sm font-medium text-gray-900">
          What just happened?
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2 flex flex-col">
          <h3>{getContent(lastLine)}</h3>
        </div>
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
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start px-6 py-5">
        <div className="mt-1 sm:mt-0 sm:col-span-2 flex flex-col">
          <p>{getContent(line)}</p>
        </div>
      </div>;
}

function DisplayStory({ story }) {
  return (
    <>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start px-6 py-5">
        {getLines(story).map(line => <DisplayLine line=)}
        <div className="mt-1 sm:mt-0 sm:col-span-2 flex flex-col">
          <p>{getContent(lastLine)}</p>
        </div>
      </div>
    </>
  );
}

export default function IndexPage() {
  const { resource: story, saveResource: saveStory } = useResource(StoryUrl);
  const { fullStoryDisplay, setFullStoryDisplay } = useState(false);

  const saveAndDisplayStory = async () => {
    await saveStory();
    setFullStoryDisplay(true);
  }

  return (
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
        <DisplayStory story={story} />
      ) : (
        <AddToStory story={story} saveStory={saveAndDisplayStory} />
      )}
    </div>
  );
}
