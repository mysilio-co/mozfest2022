import { useState } from "react";
import { useStory } from "../model/story";
import { DisplayStory, AddToStory } from "../components/Story";

export default function ExquisiteCorpse() {
  const { resource, save } = useStory();
  const [fullStoryDisplay, setFullStoryDisplay] = useState(false);

  async function saveAndDisplayStory(newStory) {
    await save(newStory);
    setFullStoryDisplay(true);
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <section className="content">
        <div className="mx-auto rounded-lg overflow-hidden bg-white flex flex-col items-stretch">
          <div className="flex flex-row justify-between self-stretch h-18 p-6 bg-my-green">
            <div className="flex flex-row justify-start items-start gap-4">
              <h1 className="text-white font-bold text-xl">
                Welcome to Exquisite Corpse
              </h1>
              <h3>TODO Tani</h3>
            </div>
          </div>
          {fullStoryDisplay ? (
            <DisplayStory story={resource} />
          ) : (
            <AddToStory story={resource} saveStory={saveAndDisplayStory} />
          )}
        </div>
      </section>
    </main>
  );
}
