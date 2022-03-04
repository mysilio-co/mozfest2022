import Link from "next/link";

function Dots() {
  return (
        <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
          <svg
            className="absolute top-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
          </svg>
          <svg
            className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
          </svg>
        </div>
  )
}

export default function ExquisiteIntro() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <section className="content">
        <div className="relative py-16 bg-white overflow-hidden">
          <Dots />
          <div className="relative px-4 sm:px-6 lg:px-8">
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
                exquisite corpse game.{" "}
                <a href="https://en.wikipedia.org/wiki/Exquisite_corpse">
                  Exquisite Corpse
                </a>{" "}
                is a game invented 100 years ago by the surrealist writer Andre
                Breton, and has since grown to take a number of forms, like this
                one.
              </p>
            </div>
            <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
              <h2>What is Exquisite Story?</h2>
              <p>
                A collaborative storytelling experience. Want a more visual
                storytelling experience?{" "}
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
                creators{" "}
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
          </div>
        </div>
      </section>
    </main>
  );
}
