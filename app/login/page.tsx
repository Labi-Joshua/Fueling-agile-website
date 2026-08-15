// Client Portal page (route: /login). Despite the route name this is NOT a login
// form — it's an informational page linking out to the various client portals.
import PortalPlatforms from "@/components/ui/PortalPlatforms";
import PartnerBanner from "@/components/ui/PartnerBanner";
import PortalSupport from "@/components/ui/PortalSupport";
import { portalPageContent, portalSupportContent } from "@/data/mockContent";

export default function ClientPortalPage() {
  return (
    <>
      {/* Cards linking to each client/reporting portal platform */}
      <PortalPlatforms content={portalPageContent} />

      {/* "Powered by ProvidusBank" partner banner image */}
      <PartnerBanner
        imageSrc="/portal-partner-banner.png"
        imageAlt="Powered by ProvidusBank"
      />

      {/* Support contact section */}
      <PortalSupport content={portalSupportContent} />
    </>
  );
}
