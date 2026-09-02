// "Get in touch" page (route: /request), linked from the navbar and footer CTAs.
import GetInTouchForm from "@/components/ui/GetInTouchForm";
import { getInTouchContent } from "@/data/mockContent";

export default function RequestPage() {
  return <GetInTouchForm content={getInTouchContent} />;
}
