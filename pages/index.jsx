import Link from "next/link";
import Head from "next/head";
import { MysilioPointer } from "../components/MonetizationPicker";
import { useWebMonetization } from "../model/utils";
import { useRandomStorySlug } from "../model/story";

export default function ExquisiteIntro() {
  const { isMonetizing } = useWebMonetization();
  const slug = useRandomStorySlug();

  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <Head>
        <meta name="monetization" content={MysilioPointer} key="monetization" />
      </Head>
      <section className="relative mx-auto w-4/5 bg-white/90 shadow-2xl py-20">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              Mysilio Presents
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Exquisite Garden
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            Welcome to Exquisite Garden, a Web Monetized, interactive exquisite
            corpse game.&nbsp;
            <a href="https://en.wikipedia.org/wiki/Exquisite_corpse">
              Exquisite Corpse
            </a>
            &nbsp; is a game invented 100 years ago by the surrealist writer
            Andre Breton, and has since grown to take a number of forms, like
            this one.
          </p>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <h2>How do I play?</h2>
          <p>
            Click the button below to get started. You’ll be taken to a screen
            with one sentence, written by the previous participant. Add on to
            the story by submitting a new piece of text that furthers the
            narrative. After you’ve submitted your next piece of writing, you’ll be able to
            view the entirety of the story from all other participants.
          </p>
          <h2>Who built this?</h2>
          <p>
            <a href="https://mysilio.com/">Mysilio</a> is a consulting firm
            dedicated to building web technology that supports networks of
            caring, interdependent humans. This is one of many experiments we're
            running with Web Monetization and Solid, supported by the generous
            grant funding of&nbsp;
            <a href="https://www.grantfortheweb.org/">Grant for the Web</a>. To
            learn more about our work, our experiments, or to particpate in the
            beta of our new Web Monetized publishing platform,&nbsp;
            <a
              className="font-bold"
              href="https://mailchi.mp/865966fe3848/mysilio-waitlist"
            >
              join our mailing list.
            </a>
          </p>
          <h2>What is Solid?</h2>
          <p>
            <a href="https://solidproject.org/">Social Linked Data</a>, or
            Solid, is a proposed W3C standard for hosting personal data in
            shared RDF datastores than can be used by any application. Solid
            provides a rich toolset for data interoperability and storage,
            allowing interactive applications like this one to be built quickly
            without deploying additional backend servers.
          </p>
          <h2>What is Web Monetization?</h2>
          <p>
            <a href="https://webmonetization.org/docs/explainer/">
              Web Monetization
            </a>
            &nbsp; is a proposed W3C standard that enables website visitors with
            the ability to stream micropayments directly to content creators,
            tip to reward particularly good content, and even gate content on
            payment, providing a viable alternative to advertising based
            buisiness models on the web.
          </p>
          {!isMonetizing ? (
            <h2>Please enable Web Monetization to participate</h2>
          ) : (
            <h2>
              <Link href={`/story/${slug}`}>
                <a>Join the Story</a>
              </Link>
            </h2>
          )}
        </div>
      </section>
    </main>
  );
}
