import Head from "next/head";
import { useRouter } from 'next/router'
import { useReflections} from "../model/story";
import { AddToStory, DisplayStory } from "../components/Story"
import { MysilioPointer } from "../components/MonetizationPicker";

export default function ExquisiteStory() {
  const router = useRouter()
  const { slug } = router.query;
  const { resource, save } = useReflections();

  async function saveAndDisplayStory(newStory) {
    await save(newStory);
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <Head>
        <meta name="monetization" content={MysilioPointer} key="monetization" />
      </Head>
      <section className="min-h-screen mx-auto w-4/5 bg-white/90 shadow-2xl py-20">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            {resource && (
              <>
                <AddToStory
                  slug={slug}
                  story={resource}
                  saveStory={saveAndDisplayStory}
                />
                <DisplayStory slug={slug} story={resource} />
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
