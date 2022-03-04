const CollageResourceUrl =
  "https://exquisite-corpse.mysilio.me/mozfest2022/collage.ttl";

export function urlForCollageCoordinates(x, y) {
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

export function getImageSrc(tile) {
  return tile && getStringNoLocale(tile, foaf.depiction);
}

export function getMonetization(tile) {
  return tile && getStringNoLocale(tile, WM.PaymentPointer);
}