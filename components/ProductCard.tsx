import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/data/products";


type Props = {
  product: Product;
};



export default function ProductCard({ product }: Props) {

  const primaryImage = product.images[0];


  return (

    <Link
  href={`/products/${product.slug}`}
  className="
group
block
w-full
overflow-hidden
rounded-[34px]
border
border-[#E8DCC3]
bg-white
shadow-[0_10px_30px_rgba(0,0,0,0.06)]
transition-all
duration-500
hover:-translate-y-2
hover:border-[#C9A227]
hover:shadow-[0_25px_60px_rgba(90,16,32,0.18)]
"
>


      {/* Product Image */}


      <div
        className="
relative
aspect-square
overflow-hidden
bg-gradient-to-b
from-[#FBF8F3]
to-[#F2EBDF]
"
      >


        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="
object-contain
p-6
object-center
transition-all
duration-700
ease-out
group-hover:scale-[1.06]
group-hover:brightness-105
"
        />


      </div>




      {/* Product Details */}



      <div className="p-6">



        <p
          className="
          text-sm
          font-semibold
          tracking-wide
          text-[#C9A227]
          "
        >
          {product.tags[0]}
        </p>




        <h3
          className="
          mt-2
          text-xl
          font-bold
          leading-tight
          text-[#5A1020]
          "
        >
          {product.name}
        </h3>




        <p
          className="
          mt-3
          text-sm
          text-gray-600
          "
        >
          {product.material} • {product.finish}
        </p>




        <div
          className="
          mt-5
          h-px
          bg-[#E8DCC8]
          "
        />





        <div className="mt-5 flex items-center justify-between border-t border-[#E8DCC3] pt-5">

  <div>
    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#A98B42]">
      Model No.
    </p>

    <p className="mt-1 text-base font-bold text-[#5A1020]">
      {product.sku}
    </p>
  </div>

  <div className="flex items-center gap-2 text-sm font-semibold text-[#5A1020] transition-all duration-300 group-hover:text-[#C9A227]">
    <span>Explore</span>

    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </div>

</div>



      </div>



    </Link>

  );

}