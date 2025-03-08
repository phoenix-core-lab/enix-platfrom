import { Product } from "@/app/[locale]/articles/page";
import Image from "next/image";

const ProductCard = ({
  product,
  isSelected,
  onClick,
}: {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col shadow-md cursor-pointer gap-4 rounded-lg  bg-textInput p-4  lg:flex-row
          ${
            isSelected
              ? "ring-secondary ring-offset-2 border-none "
              : "hover:border-primary"
          }`}
    >
      <Image
        src={product.image || "/placeholder.svg"}
        alt={product.title}
        width={100}
        height={100}
        className="h-24 w-full rounded-lg object-cover lg:w-24"
      />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-text">{product.title}</h3>
        </div>
        <p className="text-text">{product.quote}</p>
        <div className="mt-auto flex items-center justify-between text-sm text-text">
          <span>{product.author}</span>
          <span>{product.date}</span>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
