// Fuel Prices page (route: /pricing). Shows a filterable table of depot fuel prices.
import FuelPricesHero from "@/components/ui/FuelPricesHero";
import DepotPriceTable from "@/components/ui/DepotPriceTable";
import Newsletter from "@/components/ui/Newsletter";
import { fuelPricesHeroContent, depotPrices, newsletterContent } from "@/data/mockContent";

export default function FuelPricesPage() {
  return (
    <>
      {/* Page hero: heading + subheading */}
      <FuelPricesHero content={fuelPricesHeroContent} />

      {/* Sortable/filterable depot price table (AGO / PMS fuel types). Renders these
          mock prices immediately, then refreshes live from /api/fuel-prices via TanStack Query. */}
      <DepotPriceTable initialPrices={depotPrices} />

      {/* Newsletter signup card, last section before the footer */}
      <Newsletter content={newsletterContent} />
    </>
  );
}
