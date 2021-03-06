import namespace from '@rdf-esm/namespace'

const wm = namespace("http://paymentpointers.org/ns#");
export const WM = {
  // WebMonetization
  PaymentPointer: wm`PaymentPointer` 
};

const sioc = namespace('http://rdfs.org/sioc/ns#');
export const SIOC = {
  content: sioc`content`,
};

const exq = namespace( "https://vocab.mysilio.com/my/art/exquisite-corpse#")
export const EXQ = {
  Line: exq`Line`, // A Line in an Exquisite Story
  Tile: exq`Tile`, // A Tile in an Exquisite Collage
};
