import FuelPricesHero from "@/components/ui/FuelPricesHero";
import DepotPriceTable from "@/components/ui/DepotPriceTable";
import { fuelPricesHeroContent, depotPrices } from "@/data/mockContent";

export default function FuelPricesPage() {
  return (
    <>
      <FuelPricesHero content={fuelPricesHeroContent} />
      <DepotPriceTable prices={depotPrices} />
    </>
  );
}
