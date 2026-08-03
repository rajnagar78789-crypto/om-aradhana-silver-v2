"use client";

import { useState } from "react";
import Link from "next/link";

import type {
  Product,
  ProductVariant,
} from "@/data/products";


type Props = {
  product: Product;
};



export default function ProductInfo({
  product,
}: Props) {


  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant | null>(
      product.variants[0] ?? null
    );



  const getWeight = (
    variant: ProductVariant | null
  ) => {

    if (!variant) {
      return "Contact for details";
    }


    if (
      variant.weightMin !== undefined &&
      variant.weightMax !== undefined
    ) {

      return `${variant.weightMin}–${variant.weightMax} g`;

    }


    if (variant.weight !== undefined) {

      return `${variant.weight} g`;

    }


    return "Contact for details";

  };




  const whatsappMessage = `
Hello Om Aradhana Silver,

I am interested in:

Product: ${product.name}

Model No.: ${product.sku}

Weight: ${getWeight(selectedVariant)}

Please share wholesale price and more details.

Thank you.
`;





  return (

    <div className="w-full">


      {/* Breadcrumb */}

      <div
        className="
        flex
        items-center
        gap-2
        text-sm
        text-gray-500
        "
      >

        <Link
          href="/"
          className="
          transition
          hover:text-[#5A1020]
          "
        >
          Home
        </Link>


        <span className="text-[#C9A227]">
          /
        </span>


        <span>
          Products
        </span>


        <span className="text-[#C9A227]">
          /
        </span>


        <span
          className="
          font-semibold
          text-[#5A1020]
          "
        >
          {product.name}
        </span>


      </div>





      {/* Wholesale Badge */}

      <div
        className="
        mt-3
        inline-flex
        rounded-full
        bg-[#5A1020]
        px-3
        py-1
        text-xs
        font-bold
        uppercase
        tracking-wide
        text-white
        "
      >
        Wholesale
      </div>





      {/* Title */}

      <h1
        className="
        mt-4
        text-5xl
        font-black
        leading-none
        tracking-tight
        text-[#5A1020]
        "
      >

        {product.name}

      </h1>





      {/* Short Info */}

      <p
        className="
        mt-4
        text-lg
        text-gray-600
        "
      >

        {product.shortDescription}

      </p>





      {/* Product Identity */}

      <div
        className="
        mt-8
        grid
        grid-cols-2
        border-y
        border-[#eadfcb]
        "
      >


        <div
          className="
          py-5
          "
        >

          <p
            className="
            text-xs
            uppercase
            tracking-[0.18em]
            text-gray-500
            "
          >
            Product Code
          </p>


          <p
            className="
            mt-2
            text-xl
            font-bold
            text-[#5A1020]
            "
          >

            {product.sku}

          </p>


        </div>





        <div
          className="
          border-l
          border-[#eadfcb]
          py-5
          pl-8
          "
        >

          <p
            className="
            text-xs
            uppercase
            tracking-[0.18em]
            text-gray-500
            "
          >
            Material
          </p>


          <p
            className="
            mt-2
            text-xl
            font-bold
            text-[#5A1020]
            "
          >

            {product.material}

          </p>


        </div>


      </div>





      {/* Size Selector */}

      {product.variants.length > 0 && (

        <div
          className="
          mt-8
          "
        >

          <p
            className="
            text-xs
            uppercase
            tracking-[0.18em]
            text-gray-500
            "
          >
            Product Options
          </p>


          <h2
            className="
            mt-2
            text-xl
            font-bold
            text-[#5A1020]
            "
          >
            Select Size
          </h2>



          <div
            className="
            mt-4
            flex
            flex-wrap
            gap-3
            "
          >

            {product.variants.map(
              (variant) => {

                const active =
                  selectedVariant?.sku === variant.sku;


                return (

                  <button
                    key={variant.sku}
                    type="button"
                    onClick={() =>
                      setSelectedVariant(variant)
                    }
                    className={`
                    rounded-full
                    border
                    px-8
                    py-3
                    text-sm
                    font-bold
                    transition

                    ${
                      active
                      ? "bg-[#5A1020] text-white border-[#5A1020]"
                      : "bg-white text-[#5A1020] border-[#eadfcb] hover:border-[#C9A227]"
                    }
                    `}
                  >

                    {variant.height
                      ? `${variant.height} Inch`
                      : variant.sku}

                  </button>

                );

              }
            )}

          </div>


        </div>

      )}
            {/* Selected Variant Details */}

      {selectedVariant && (

        <div
          className="
          mt-8
          overflow-hidden
          rounded-3xl
          border
          border-[#eadfcb]
          bg-white
          shadow-[0_15px_40px_rgba(90,16,32,0.08)]
          "
        >

          <div
            className="
            grid
            grid-cols-2
            "
          >


            <div
              className="
              px-6
              py-6
              "
            >

              <p
                className="
                text-xs
                uppercase
                tracking-[0.18em]
                text-gray-500
                "
              >
                Approx Weight
              </p>


              <p
                className="
                mt-2
                text-2xl
                font-black
                text-[#5A1020]
                "
              >

                {getWeight(selectedVariant)}

              </p>


            </div>





            <div
              className="
              border-l
              border-[#eadfcb]
              px-6
              py-6
              "
            >

              <p
                className="
                text-xs
                uppercase
                tracking-[0.18em]
                text-gray-500
                "
              >
                Availability
              </p>



              <div
                className="
                mt-2
                flex
                items-center
                gap-2
                "
              >

                <span
                  className={`
                  h-3
                  w-3
                  rounded-full

                  ${
                    product.status === "Active"
                    ? "bg-green-500"
                    : "bg-red-500"
                  }

                  `}
                />


                <span
                  className={`
                  text-xl
                  font-bold

                  ${
                    product.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                  }

                  `}
                >

                  {product.status === "Active"
                    ? "Available"
                    : "Unavailable"}

                </span>


              </div>


            </div>


          </div>


        </div>

      )}






      {/* Wholesale Benefits */}


      <div
        className="
        mt-6
        grid
        grid-cols-3
        overflow-hidden
        rounded-2xl
        border
        border-[#eadfcb]
        bg-white
        "
      >


        <div
          className="
          flex
          items-center
          justify-center
          px-3
          py-4
          text-center
          text-sm
          font-semibold
          text-[#5A1020]
          "
        >

          ✓ Wholesale Only

        </div>



        <div
          className="
          flex
          items-center
          justify-center
          border-x
          border-[#eadfcb]
          px-3
          py-4
          text-center
          text-sm
          font-semibold
          text-[#5A1020]
          "
        >

          ✓ GST Billing

        </div>



        <div
          className="
          flex
          items-center
          justify-center
          px-3
          py-4
          text-center
          text-sm
          font-semibold
          text-[#5A1020]
          "
        >

          ✓ PAN India Supply

        </div>


      </div>







      {/* WhatsApp CTA */}


      <a
        href={`https://wa.me/918879528201?text=${encodeURIComponent(
          whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
        group
        mt-7
        flex
        items-center
        justify-between
        rounded-2xl
        bg-[#5A1020]
        px-7
        py-5
        text-white
        shadow-[0_15px_40px_rgba(90,16,32,0.25)]
        transition
        hover:-translate-y-1
        hover:bg-[#74192F]
        "
      >


        <div>

          <p
            className="
            text-xs
            uppercase
            tracking-[0.18em]
            text-white/70
            "
          >
            Wholesale Enquiry
          </p>


          <p
            className="
            mt-1
            text-xl
            font-black
            "
          >
            Get Wholesale Price
          </p>


        </div>



        <span
          className="
          text-3xl
          transition
          group-hover:translate-x-2
          "
        >
          →
        </span>


      </a>







      {/* Back Button */}


      <Link
        href={`/collections/${product.collectionId}/${product.subCollectionId}`}
        className="
        mt-4
        flex
        items-center
        justify-center
        rounded-xl
        border
        border-[#d8cbb8]
        py-3
        text-sm
        font-semibold
        text-gray-600
        transition
        hover:border-[#5A1020]
        hover:bg-white
        hover:text-[#5A1020]
        "
      >

        ← Back to Collection

      </Link>



    </div>

  );
}