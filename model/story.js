import { useMemo } from "react";
import {
  buildThing,
  setThing,
  getThingAll,
  getDatetime,
  getStringNoLocale,
} from "@inrupt/solid-client";
import { RDF, DCTERMS } from "@inrupt/vocab-common-rdf";
import { WM, SIOC, EXQ } from "../vocab";
import { useResource } from "swrlit";
import { hasRDFType, createThingWithUUID} from "../model/utils";

const ReflectionStorageUrl =
  "https://exquisite-corpse.mysilio.me/mozfest2022/reflections.ttl";

export function getContent(line) {
  return line && getStringNoLocale(line, SIOC.content);
}

export function getMonetization(line) {
  return line && getStringNoLocale(line, WM.PaymentPointer);
}

export function getCreatedDate(line) {
  return line && getDatetime(line, DCTERMS.created)
}

export function getLines(story) {
  return (
    story &&
    getThingAll(story)
      .filter((t) => hasRDFType(t, EXQ.Line))
      // reverse chronological
      .sort((a, b) => getCreatedDate(b) - getCreatedDate(a))
  );
}

export function createLineThing(content, monetization) {
  return buildThing(createThingWithUUID())
    .addUrl(RDF.type, EXQ.Line)
    .addDatetime(DCTERMS.created, new Date())
    .addStringNoLocale(SIOC.content, content)
    .addStringNoLocale(WM.PaymentPointer, monetization)
    .build();
}

export function addLine(story, content, monetization) {
  const newLine = content && monetization && createLineThing(content, monetization);
  return story && setThing(story, newLine);
}

export function useRandomLine(story) {
  return useMemo(() => {
    const lines = story && getLines(story);
    const line = lines[Math.floor(Math.random() * lines.length)];
    return line
  }, [story]);
}

export function useLines(story) {
  return useMemo(() => {
    return story && getLines(story);
  }, [story]);
}

export function useRandomMonetization(story) {
  return useMemo(() => {
    const lines = story && getLines(story);
    const line = lines[Math.floor(Math.random() * lines.length)];
    return getMonetization(line);
  }, [story]);
}

export function useReflections() {
  return useResource(ReflectionStorageUrl);
}