"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import ProductCard from "@/components/articles/product-card";
import ProductDetails from "@/components/articles/product-detail";

export interface Product {
  id: number;
  title: string;
  quote: string;
  author: string;
  date: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Hay When You Need It",
    quote:
      "Agriculture is the most healthful, most useful and most noble employment of man.",
    author: "George Washington",
    date: "Thursday 09 2022",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Gvcs0Tp9uDqqc1TUOmvqvMpWqC36ZP.png",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis cum consequat consequat duis urna egestas quis
    purus sit. Pellentesque vel condimentum enim eu. Cursus diam egestas maecenas vitae velit lectus. Pulvinar lorem
    nunc pharetra, mauris, scelerisque. Bibendum at congue mattis risus odio. Nibh orci vitae duis sed. Ipsum et
    risus aliquam a aliquam vestibulum justo ipsum in. Nulla.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis cum consequat consequat duis urna egestas quis
    purus sit. Pellentesque vel condimentum enim eu. Cursus diam egestas maecenas vitae velit lectus.`,
  },
  {
    id: 2,
    title: "Fresh Tomatoes",
    quote:
      "Agriculture is the most healthful, most useful and most noble employment of man.",
    author: "George News",
    date: "Thursday 09 2022",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Gvcs0Tp9uDqqc1TUOmvqvMpWqC36ZP.png",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis cum consequat consequat duis urna egestas quis
    purus sit. Pellentesque vel condimentum enim eu. Cursus diam egestas maecenas vitae velit lectus.`,
  },
  {
    id: 3,
    title: "Farm Fresh Produce",
    quote:
      "Agriculture is the most healthful, most useful and most noble employment of man.",
    author: "News Washington",
    date: "Thursday 09 2022",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Gvcs0Tp9uDqqc1TUOmvqvMpWqC36ZP.png",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis cum consequat consequat duis urna egestas quis
    purus sit. Pellentesque vel condimentum enim eu.`,
  },
  {
    id: 4,
    title: "Strawberry Ginger",
    quote:
      "Agriculture is the most healthful, most useful and most noble employment of man.",
    author: "News Washington",
    date: "Thursday 09 2022",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Gvcs0Tp9uDqqc1TUOmvqvMpWqC36ZP.png",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis cum consequat consequat duis urna egestas quis
    purus sit. Pellentesque vel condimentum enim eu. Cursus diam egestas maecenas vitae velit lectus. Pulvinar lorem
    nunc pharetra, mauris, scelerisque.`,
  },
];

export default function Page() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const t = useTranslations("Articles");
  const router = useRouter();
  return (
    <div className="bg-background-prices h-dvh">
      <div className="bg-background-prices w-full">
        <div className="container  mx-auto p-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 "
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </button>
          <h1 className="mb-6 text-center text-2xl font-bold text-text lg:text-3xl lg:mb-8">
            {t("title")}
          </h1>
          <div className="relative flex flex-col lg:flex-row lg:gap-8">
            <div className="lg:w-1/2">
              <div className=" items-center gap-3 grid md:grid-cols-2 lg:grid-cols-1">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProduct?.id === product.id}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </div>
            <div
              className={`fixed inset-0 z-50 bg-background-prices backdrop-blur-sm lg:static lg:z-auto lg:w-1/2 lg:bg-transparent lg:backdrop-blur-none ${
                selectedProduct ? "block" : "hidden lg:block"
              }`}
              style={{
                scrollbarColor:
                  "var(--scrollbar-color-first) var(--scrollbar-color-second)",
              }}
            >
              <div className="bg-background-prices rounded-lg p-6 lg:p-0 max-h-[80vh] overflow-auto custom-scrollbar">
                {selectedProduct ? (
                  <ProductDetails
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                  />
                ) : (
                  <div className="flex text-text items-center justify-center rounded-lg border p-6 text-center bg-textInput">
                    <p>{t("noSelected")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
