import { useState } from "react";
import Head from "next/head";
import { useStory } from "../model/story";
import { MysilioPointer } from "../components/MonetizationPicker";
import { AddToStory, DisplayStory } from "../components/Story"
import { useWebMonetization } from "../model/utils";

export default function ExquisiteStory() {
  const { resource, save } = useStory();
  const [fullStoryDisplay, setFullStoryDisplay] = useState(false);
  const { isMonetizing } = useWebMonetization();

  async function saveAndDisplayStory(newStory) {
    await save(newStory);
    setFullStoryDisplay(true);
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <Head>
        <meta name="monetization" content={MysilioPointer} key="monetization" />
      </Head>
      <section className="min-h-screen mx-auto w-4/5 bg-white/90 shadow-2xl py-20">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            {!isMonetizing ? (
              <>
                <h3 className="text-3xl mb-10">
                  Please enable Web Monetization to continue.
                </h3>
                <p>
                  Web Monetization is a proposed API standard that enables
                  website visitors with the ability to stream micropayments to
                  content creators&nbsp;
                  <a href="https://webmonetization.org/docs/explainer/">
                    https://webmonetization.org/docs/explainer/
                  </a>
                </p>
              </>
            ) : (
              resource &&
              (fullStoryDisplay ? (
                <DisplayStory story={resource} />
              ) : (
                <AddToStory story={resource} saveStory={saveAndDisplayStory} />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
