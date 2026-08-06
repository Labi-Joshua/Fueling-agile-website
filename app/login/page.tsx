import PortalPlatforms from "@/components/ui/PortalPlatforms";
import PartnerBanner from "@/components/ui/PartnerBanner";
import PortalSupport from "@/components/ui/PortalSupport";
import { portalPageContent, portalSupportContent } from "@/data/mockContent";

export default function ClientPortalPage() {
  return (
    <>
      <PortalPlatforms content={portalPageContent} />
      <PartnerBanner
        imageSrc="/portal-partner-banner.png"
        imageAlt="Powered by ProvidusBank"
      />
      <PortalSupport content={portalSupportContent} />
    </>
  );
}
