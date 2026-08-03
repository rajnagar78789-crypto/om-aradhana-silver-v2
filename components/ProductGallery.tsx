"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductGallery({
  product,
}: Props) {
  const { images, name, sku } = product;

  const [selectedImage, setSelectedImage] = useState(0);

  if (!images.length) {
    return null;
  }

  const activeImage = images[selectedImage];

  return (
    <div className="w-full">

      {/* MAIN CARD */}

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[36px]
          border
          border-[#E8DCC3]
          bg-white
          shadow-[0_30px_80px_rgba(90,16,32,0.12)]
        "
      >

        {/* GOLD GLOW */}

        <div
          className="
            absolute
            inset-16
            rounded-full
            bg-[#C9A227]/10
            blur-3xl
          "
        />

        {/* MODEL */}

        <div
          className="
            absolute
            left-6
            top-6
            z-20
            rounded-2xl
            border
            border-[#C9A227]/30
            bg-white/90
            px-5
            py-3
            backdrop-blur-md
            shadow-lg
          "
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A98B42]">
            Model No.
          </p>

          <p className="mt-1 text-base font-bold text-[#5A1020]">
            {sku}
          </p>
        </div>

        {/* ZOOM */}

        <button
          type="button"
          className="
            absolute
            right-6
            top-6
            z-20
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-white
            text-[#5A1020]
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
          "
        >
          <ZoomIn size={20} />
        </button>
                {/* IMAGE */}

        <div
          className="
            relative
            h-[540px]
            w-full
            bg-gradient-to-b
            from-[#FCFAF6]
            via-[#F8F4EC]
            to-[#F2EBDF]
          "
        >

          <Image
            src={activeImage.url}
            alt={activeImage.alt || name}
            fill
            priority
            sizes="700px"
            className="
              object-contain
object-center
p-6
              transition-all
              duration-700
              ease-out
              group-hover:scale-[1.04]
            "
          />

          {/* FLOOR GLOW */}

          <div
            className="
              absolute
              bottom-10
              left-1/2
              h-20
              w-72
              -translate-x-1/2
              rounded-full
              bg-[#C9A227]/25
              blur-3xl
            "
          />

        </div>

      </div>

      {/* THUMBNAILS */}

      {images.length > 1 && (

        <div
          className="
            mt-4
            flex
            gap-4
            overflow-x-auto
            pb-2
          "
        >

          {images.map((image, index) => (

            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`
                relative
                h-24
                w-24
                shrink-0
                overflow-hidden
                rounded-2xl
                border-2
                bg-white
                transition-all
                duration-300

                ${
                  selectedImage === index
                    ? "border-[#C9A227] shadow-lg"
                    : "border-[#E8DCC3] hover:border-[#C9A227]/60"
                }
              `}
            >

              <Image
                src={image.url}
                alt={image.alt || name}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-300
                  hover:scale-105
                "
              />

            </button>

          ))}

        </div>

      )}
            {/* TRUST BADGES */}

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div
          className="
            rounded-2xl
            border
            border-[#E8DCC3]
            bg-white
            p-4
            text-center
            shadow-sm
          "
        >
          <p className="text-sm font-semibold text-[#5A1020]">
            ✓ Wholesale Only
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-[#E8DCC3]
            bg-white
            p-4
            text-center
            shadow-sm
          "
        >
          <p className="text-sm font-semibold text-[#5A1020]">
            ✓ GST Billing
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-[#E8DCC3]
            bg-white
            p-4
            text-center
            shadow-sm
          "
        >
          <p className="text-sm font-semibold text-[#5A1020]">
            ✓ PAN India Supply
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-[#E8DCC3]
            bg-white
            p-4
            text-center
            shadow-sm
          "
        >
          <p className="text-sm font-semibold text-[#5A1020]">
            ✓ Secure Packaging
          </p>
        </div>

      </div>

    </div>

  );

}