import { useRouter } from 'next/router'
import { useStory } from "../../model/story";
import { AddToStory, DisplayStory } from "../../components/Story"
import { useLocalStorage } from "../../model/utils";

export default function ExquisiteStory() {
  const router = useRouter()
  const { slug } = router.query;
  const { resource, save } = useStory(slug);
  const [fullStoryDisplay, setFullStoryDisplay] = useLocalStorage(slug, false);

  async function saveAndDisplayStory(newStory) {
    await save(newStory);
    setFullStoryDisplay(true);
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <section className="min-h-screen mx-auto w-4/5 bg-white/90 shadow-2xl py-20">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            {resource && (
              fullStoryDisplay ? (
                <DisplayStory story={resource} />
              ) : (
                <AddToStory story={resource} saveStory={saveAndDisplayStory} />
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
