import Home from "@/components/Home";
import { homeMetadata } from "@/lib/site";

export const metadata = homeMetadata();
export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
