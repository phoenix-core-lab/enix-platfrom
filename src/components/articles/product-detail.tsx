import { Product } from "@/app/[locale]/articles/page";
import { X } from "lucide-react";
import Image from "next/image";

const ProductDetails = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  return (
    <div className="rounded-lg bg-transparent p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text">{product.title}</h2>
        <button onClick={onClose} className="lg:hidden">
          <X className="h-6 w-6 text-text" />
        </button>
      </div>
      <div className="space-y-4">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          width={600}
          height={300}
          className="rounded-lg w-full"
        />
        <div className="text-text flex items-center justify-between text-sm">
          <span>{product.author}</span>
          <span>{product.date}</span>
        </div>
        <p className="whitespace-pre-line text-text">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
