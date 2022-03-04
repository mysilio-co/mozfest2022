import { useMemo } from "react";
import {
  buildThing,
  getThing,
  setThing,
  createThing,
  getThingAll,
  getStringNoLocale,
  asUrl,
} from "@inrupt/solid-client";
import { RDF, DCTERMS } from "@inrupt/vocab-common-rdf";
import { WM, SIOC, EXQ } from "../vocab";
import { useResource } from "swrlit";
import { hasRDFType } from "../model/utils";

const CollageResourceUrl =
  "https://exquisite-corpse.mysilio.me/mozfest2022/collage.ttl";

export function urlForCollageCoordinates({ x, y }) {
  return `${CollageResourceUrl}#(${x},${y})`;
}

export function getCoordinates(tile) {
  const url = tile && new URL(asUrl(tile));
  const re = /^#\((-?[0-9]+),(-?[0-9]+)\)$/
  const [_, xstr, ystr] = re.exec(url.hash.substring);
  return {
    x: parseInt(xstr),
    y: parseInt(ystr),
  };
}

export function getImage(tile) {
  return tile && getStringNoLocale(tile, FOAF.depiction);
}

export function getMonetization(tile) {
  return tile && getStringNoLocale(tile, WM.PaymentPointer);
}

export function getTile(collage, coordinates) {
  return collage && getThing(collage, urlForCollageCoordinates(coordinates))
}

export function getAllTiles(collage) {
  return (
    collage &&
    getThingAll(collage)
      .filter((t) => hasRDFType(t, EXQ.Tile))
  );
}

export function isVisible(collage, tile) {
  // show a tile if at least one neighbor is unset when adding to collage
  for (loc in getNeighbors(tile.coordinates)) {
    if (!getTile(collage, loc)) {
      return true;
    }
  }
  return false;
}

export function getVisibleTiles(collage) {
  return collage && getAllTiles(collage).filter(isVisible);
}

export function createTileThing(img, monetization, coordinates) {
  return buildThing(createThing({ url: urlForCollageCoordinates(coordinates) }))
    .addUrl(RDF.type, EXQ.Tile)
    .addDatetime(DCTERMS.created, new Date())
    .addStringNoLocale(FAOF.depiction, img)
    .addStringNoLocale(WM.PaymentPointer, monetization)
    .build();
}

export function getNeighbors({x, y}) {
  return [
    {x: x+1, y},
    {x, y: y+1},
    {x: x-1, y},
    {x, y: y-1}
  ]
}

export function getValidTileCoordinates(collage) {
  if (!collage) return undefined

  const validTiles = new Set()
  for (const tile of getTiles(collage)) {
    const neighbors = getNeighbors(getCoordinates(tile))
    for (const loc of neighbors) {
      if (!getTile(collage, loc)) {
        validTiles.add(loc)
      }
    }
  }
  return freeze(validTiles)
}

export function addTile(collage, img, monetization, coordinates) {
  if (!collage || !img || !monetization || !coordinates) return undefined;

  const valid = getValidTileCoordinates(collage)
  if (!valid.has(coordinates)) {
    throw new Error("Can only create new Tiles next to an existing Tile");
  }

  const newTile = createTileThing(img, monetization, coordinates);
  return setThing(collage, newTile);
}

export function useRandomMonetization(collage) {
  return useMemo(() => {
    const tiles = collage && getTiles(collage);
    const tile = tiles[Math.floor(Math.random() * tiles.length)];
    return getMonetization(tile);
  }, [collage]);
}

export function useCollage() {
  return useResource(CollageResourceUrl);
}