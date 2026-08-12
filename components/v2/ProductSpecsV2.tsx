"use client";

import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductSpecsV2({ product }: Props) {
  const variant = product.variants?.[0];

  const rawSpecs = [
    {
      label: "Weight",
      value: variant?.weight,
      unit: "g",
    },
    {
      label: "Height",
      value: variant?.height,
      unit: '"',
    },
    {
      label: "Width",
      value: variant?.width,
      unit: '"',
    },
    {
      label: "Finish",
      value: product.finish,
      unit: "",
    },
  ];

  // Type-safe filter to eliminate empty `--"` boxes
  const activeSpecs = rawSpecs.filter((spec) => {
    if (spec.value === undefined || spec.value === null) return false;
    const valStr = String(spec.value).trim();
    return valStr !== "" && valStr !== "--";
  });

  if (activeSpecs.length === 0) return null;

  return (
    <div className="rounded-[24px] border border-[#E8DCC3] bg-white p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <div
        className={`grid gap-6 ${
          activeSpecs.length === 1
            ? "grid-cols-1"
            : activeSpecs.length === 3
            ? "grid-cols-3"
            : "grid-cols-2"
        }`}
      >
        {activeSpecs.map((spec) => (
          <div
            key={spec.label}
            className="flex flex-col items-center justify-center text-center"
          >
            <p className="text-3xl font-black text-[#5A1020] sm:text-4xl lg:text-5xl">
              {spec.value}
              {spec.unit && (
                <span className="ml-1 text-xl font-bold text-[#C9A227] sm:text-2xl">
                  {spec.unit}
                </span>
              )}
            </p>

            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.20em] text-[#A98B42]">
              {spec.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}