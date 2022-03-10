import Head from "next/head";
import { useReflections} from "../model/story";
import { AddToStory, DisplayStory } from "../components/Story"
import { MysilioPointer } from "../components/MonetizationPicker";
import { useLocalStorage } from "../model/utils";

export default function ExquisiteStory() {
  const { resource, save } = useReflections();
  const [submitted, setSubmitted] = useLocalStorage("submitted", false);

  async function saveAndDisplayStory(newStory) {
    await save(newStory);
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <Head>
        <meta name="monetization" content={MysilioPointer} key="monetization" />
      </Head>
      <section className="min-h-screen mx-auto w-4/5 bg-white/90 shadow-2xl py-20">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            {resource &&
              (submitted ? (
                <DisplayStory story={resource} />
              ) : (
                <>
                  <AddToStory
                    story={resource}
                    saveStory={saveAndDisplayStory}
                  />
                  <DisplayStory story={resource} />
                </>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
