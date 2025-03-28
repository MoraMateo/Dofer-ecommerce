import CategoriesSection from "@/components/home/CategoriesSection";
import HeroBanner from "@/components/home/HeroBanner";
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
