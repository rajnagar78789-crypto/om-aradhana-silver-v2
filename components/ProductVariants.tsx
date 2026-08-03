import type { ProductVariant } from "@/data/products";

type Props = {
  variants: ProductVariant[];
};

export default function ProductVariants({ variants }: Props) {
  const getWeight = (variant: ProductVariant) => {
    if (
      variant.weightMin !== undefined &&
      variant.weightMax !== undefined
    ) {
      return `${variant.weightMin}–${variant.weightMax} g`;
    }

    if (variant.weight !== undefined) {
      return `${variant.weight} g`;
    }

    return "—";
  };

  return (
    <div className="mt-8 rounded-3xl border border-[#eadfcb] bg-white/80 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-[#5A1020]">
        Available Sizes
      </h2>

      <div className="mt-5 space-y-3">
        {variants.map((variant) => (
          <div
            key={variant.sku}
            className="grid grid-cols-2 gap-4 rounded-xl border border-[#eadfcb] bg-[#faf7f2] px-4 py-3 sm:grid-cols-4"
          >
            <div>
              <span className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                Weight
              </span>

              <span className="mt-1 block font-bold text-[#5A1020]">
                {getWeight(variant)}
              </span>
            </div>

            {variant.height !== undefined && (
              <div>
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                  Height
                </span>

                <span className="mt-1 block font-bold text-[#5A1020]">
                  {variant.height} in
                </span>
              </div>
            )}

            {variant.width !== undefined && (
              <div>
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                  Width
                </span>

                <span className="mt-1 block font-bold text-[#5A1020]">
                  {variant.width} in
                </span>
              </div>
            )}

            {variant.depth !== undefined && (
              <div>
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                  Depth
                </span>

                <span className="mt-1 block font-bold text-[#5A1020]">
                  {variant.depth} in
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}