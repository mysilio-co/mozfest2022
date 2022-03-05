import Link from "next/link";

export default function ExquisiteIntro() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <section className="relative mx-auto w-4/5 bg-white/90 shadow-2xl py-20">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              Mysilio Presents
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Exquisite Story
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            Welcome to Exquisite Story, a Web Monetized, interactive
            exquisite corpse game.&nbsp;
            <a href="https://en.wikipedia.org/wiki/Exquisite_corpse">
              Exquisite Corpse
            </a>&nbsp;
            is a game invented 100 years ago by the surrealist writer Andre
            Breton, and has since grown to take a number of forms, like this
            one.
          </p>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <h2>What is Exquisite Story?</h2>
          <p>
            A collaborative storytelling experience. Want a more visual
            storytelling experience?&nbsp;
            <Link href="/collage">
              <a>Check out Exquisite Collage</a>
            </Link>
            .
          </p>
          <h2>How do I play?</h2>
          <p>
            Click the button below to get started. You’ll be taken to a
            screen with one sentence, written by the previous participant.
            Add on to the story by submitting a new piece of text that
            furthers the narrative.
          </p>
          <p>
            After you’ve submitted your next piece of writing, you’ll be
            able to view the entirety of the story up from all other
            participants up until the point you submitted.
          </p>
          <h2>Who built this?</h2>
          <p>
            Mysilio is a consulting firm dedicated to building web
            technology that supports networks of caring, interdependent
            humans. This experience was built using Solid [link], and
            through the generous grant funding of Grant for the Web [link].
          </p>
          <h2>What is Web Monetization?</h2>
          <p>
            Web Monetization is a proposed API standard that enables website
            visitors with the ability to stream micropayments to content
            creators&nbsp;
            <a href="https://webmonetization.org/docs/explainer/">
              https://webmonetization.org/docs/explainer/
            </a>
          </p>
          <h2>
            <Link href="/story">
              <a>Join the Story</a>
            </Link>
          </h2>
        </div>
      </section>
    </main>
  );
}
