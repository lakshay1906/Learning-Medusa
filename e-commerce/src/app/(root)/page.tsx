import HeroCarousel from "@/components/hero-section";
import ProductCard from "@/components/product-card";
import sampleData from "../../../db/sample-data";

export default async function Home() {
  return (
    <div className="min-h-[calc(100vh-9.85rem)] pt-5 pb-20">
      <HeroCarousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-content-center place-items-center">
        {sampleData.products.map((prod) => (
          <ProductCard key={prod.slug} product={prod} />
        ))}
      </div>
    </div>
  );
}
