import { FontSwitcher } from "@/components/font-switcher";
import { Typewriter } from "@/components/typewriter";

export default function Home() {
  return (
    <FontSwitcher>
      <Typewriter
        text="hey, thanks for stopping by! I'm currently working on something new, check back later :D"
        delay={1200}
        speed={50}
      />
    </FontSwitcher>
    
  );
}
