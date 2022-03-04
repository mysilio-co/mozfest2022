import { useMemo } from "react";
import {
  buildThing,
  getUrlAll,
  setThing,
  createThing,
  getThingAll,
  getStringNoLocale,
  asUrl,
} from "@inrupt/solid-client";
import { RDF, DCTERMS } from "@inrupt/vocab-common-rdf";
import { WM, SIOC, EXQ } from "../vocab";
import { useResource } from "swrlit";

const StoryResourceUrl =
  "https://exquisite-corpse.mysilio.me/mozfest2022/story.ttl";

export function urlForStoryLine(n) {
  return `${StoryResourceUrl}#${n}`;
}

export function isLiteralTerm(s) {
  return typeof s === "string" || s instanceof String;
}

export function hasRDFTypes(thing, ts) {
  const types = getUrlAll(thing, RDF.type);
  let hasAllTypes = true;
  for (let t of ts) {
    const s = isLiteralTerm(t) ? t : t.value;
    hasAllTypes = hasAllTypes && types.includes(s);
  }
  return hasAllTypes;
}

export function hasRDFType(thing, t) {
  return hasRDFTypes(thing, [t]);
}

export function getLineNum(line) {
  const url = line && new URL(asUrl(line));
  return url && parseInt(url.hash.substring(1));
}

export function getContent(line) {
  return line && getStringNoLocale(line, SIOC.content);
}

export function getPayTo(line) {
  return line && getStringNoLocale(line, WM.PaymentPointer);
}

export function getLastLine(story) {
  const lines = story && getLines(story);
  const lineNums = lines && lines.map(getLineNum);
  const lastLineNum = lines && lineNums.length > 0 && Math.max(...lineNums);
  const lastLine = story && lines.find((l) => getLineNum(l) === lastLineNum);
  return lastLine;
}

export function getLines(story) {
  return (
    story &&
    getThingAll(story)
      .filter((t) => hasRDFType(t, EXQ.Line))
      .sort((a, b) => getLineNum(a) - getLineNum(b))
  );
}

export function createLineThing(content, payTo, n) {
  return buildThing(createThing({ url: urlForStoryLine(n) }))
    .addUrl(RDF.type, EXQ.Line)
    .addDatetime(DCTERMS.created, new Date())
    .addStringNoLocale(SIOC.content, content)
    .addStringNoLocale(WM.PaymentPointer, payTo)
    .build();
}

export function addLine(story, content, payTo) {
  const prevLine = story && getLastLine(story);
  const prevNum = prevLine && getLineNum(prevLine);
  const nextNum = prevNum >= 0 ? prevNum + 1 : 0;
  const newLine = content && payTo && createLineThing(content, payTo, nextNum);
  return story && setThing(story, newLine);
}

export function useRandomPayTo(story) {
  return useMemo(() => {
    const lines = story && getLines(story);
    const line = lines[Math.floor(Math.random() * lines.length)];
    return getPayTo(line);
  }, [story]);
}

export function useStory() {
  return useResource(StoryResourceUrl);
}
