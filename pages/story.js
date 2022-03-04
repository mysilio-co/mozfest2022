import { useState } from "react";
import { useStory } from "../model/story";
import { AddToStory, DisplayStory } from "../components/Story"

export default function ExquisiteStory() {
  const { resource, save } = useStory();
  const [fullStoryDisplay, setFullStoryDisplay] = useState(false);

  async function saveAndDisplayStory(newStory) {
    await save(newStory);
    setFullStoryDisplay(true);
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <section className="content">
        <div className="relative py-16 bg-white overflow-hidden">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto">
              {fullStoryDisplay ? (
                <DisplayStory story={resource} />
              ) : (
                <AddToStory story={resource} saveStory={saveAndDisplayStory} />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
