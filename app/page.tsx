import HeroBanner from "@/components/HeroBanner";
import CategoriesSection from "@/components/CategoriesSection";
import { getCategories } from "@/services/wooCommerce";

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <>
      <HeroBanner />
      <CategoriesSection categories={categories} />
      {/* Sección de productos destacados, etc. */}
    </>
  );
}
