import { useState } from "react";
import { useCollage } from "../model/collage";
import { AddToCollage, DisplayCollage} from "../components/Collage"

export default function ExquisiteCollage() {
  const { resource, save } = useCollage();
  const [fullCollageDisplay, setFullCollageDisplay] = useState(false);

  async function saveAndDisplayCollage(newCollage) {
    await save(newCollage);
    setFullCollageDisplay(true);
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <section className="content">
        <div className="relative py-16 bg-white overflow-hidden">
          {fullCollageDisplay ? (
            <DisplayCollage collage={resource} />
          ) : (
            <AddToCollage
              collage={resource}
              saveCollage={saveAndDisplayCollage}
            />
          )}
        </div>
      </section>
    </main>
  );
}