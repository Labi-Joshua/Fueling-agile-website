// Client Portal page (route: /login). Despite the route name this is NOT a login
// form — it's an informational page linking out to the various client portals.
import PortalPlatforms from "@/components/ui/PortalPlatforms";
import PortalSupport from "@/components/ui/PortalSupport";
import { portalPageContent, portalSupportContent } from "@/data/mockContent";

export default function ClientPortalPage() {
  return (
    <>
      {/* Cards linking to each client/reporting portal platform */}
      <PortalPlatforms content={portalPageContent} />

      {/* Support contact section */}
      <PortalSupport content={portalSupportContent} />
    </>
  );
}
