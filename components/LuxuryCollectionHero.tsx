import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image: string;
  backUrl: string;
};


export default function LuxuryCollectionHero({
  title,
  description,
  image,
  backUrl,
}: Props) {


  return (

    <section
      className="
      relative
      overflow-hidden
      bg-[#16050A]
      text-white
      "
    >


      {/* BACKGROUND EFFECTS */}


      <div className="absolute inset-0">


        {/* GOLD GLOW */}

        <div
          className="
          absolute
          -left-52
          top-20
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#C9A227]/15
          blur-[170px]
          "
        />


        {/* WINE GLOW */}

        <div
          className="
          absolute
          right-[-150px]
          top-0
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#7A1835]/40
          blur-[180px]
          "
        />



        {/* DARK GRADIENT */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/30
          via-transparent
          to-black/20
          "
        />



        {/* MANDALA */}

        <div
          className="
          absolute
          left-[-180px]
          top-10
          h-[600px]
          w-[600px]
          opacity-[0.08]
          bg-[url('/patterns/mandala.svg')]
          bg-contain
          bg-no-repeat
          "
        />


      </div>





      {/* MAIN CONTAINER */}


      <div
        className="
        relative
        mx-auto
        grid
        max-w-[1400px]
        items-center
        gap-12
        px-6
        pt-20
        pb-24
        lg:grid-cols-2
        lg:px-14
        "
      >



        {/* LEFT CONTENT */}


        <div
          className="
          relative
          z-10
          "
        >



          <Link
            href={backUrl}
            className="
            inline-flex
            items-center
            rounded-full
            border
            border-[#C9A227]/50
            bg-white/5
            px-5
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#C9A227]
            backdrop-blur-md
            "
          >

            ← Back to Premium Collection

          </Link>




          <h1
            className="
            mt-8
            text-6xl
            font-black
            leading-[0.95]
            tracking-tight
            text-[#FFF9F0]
            drop-shadow-[0_10px_40px_rgba(201,162,39,0.15)]
            lg:text-8xl
            "
          >

            {title}

          </h1>




          {/* GOLD ORNAMENT */}


          <div
            className="
            mt-8
            flex
            items-center
            gap-4
            "
          >

            <div className="h-px w-24 bg-[#C9A227]" />

            <span className="text-xl text-[#C9A227]">
              ✦
            </span>

            <div className="h-px w-24 bg-[#C9A227]" />

          </div>




          <p
            className="
            mt-8
            max-w-xl
            text-xl
            leading-9
            text-white/70
            "
          >

            {description}

          </p>
          



          {/* PREMIUM HIGHLIGHTS */}


          <div
            className="
            mt-10
            grid
            grid-cols-3
            gap-4
            "
          >



            <div className="text-center">

              <p className="text-3xl text-[#C9A227]">
                ✧
              </p>

              <p className="mt-2 text-sm text-white/90">
                100%
                <br />
                Hallmarked Silver
              </p>

            </div>




            <div
              className="
              border-x
              border-[#C9A227]/30
              text-center
              "
            >

              <p className="text-3xl text-[#C9A227]">
                ◈
              </p>


              <p className="mt-2 text-sm text-white/90">
                Premium
                <br />
                Finishing
              </p>


            </div>




            <div className="text-center">


              <p className="text-3xl text-[#C9A227]">
                ✤
              </p>


              <p className="mt-2 text-sm text-white/90">
                Crafted By
                <br />
                Expert Artisans
              </p>


            </div>



          </div>






          {/* WHATSAPP BUTTON */}



          <button
            className="
            mt-10
            flex
            items-center
            gap-3
            rounded-full
            border
            border-[#C9A227]
            bg-[#C9A227]
            px-10
            py-4
            font-bold
            text-[#16050A]
            shadow-[0_10px_40px_rgba(201,162,39,0.25)]
            transition-all
            duration-300
            hover:scale-105
            "
          >

            <span>
              ✆
            </span>

            Enquire on WhatsApp


          </button>




        </div>






{/* RIGHT IMAGE */}


<div
  className="
  relative
  flex
  justify-center
  items-center
  "
>


  {/* GOLD BACK GLOW */}

  <div
    className="
    absolute
    h-[500px]
    w-[500px]
    rounded-full
    bg-[#C9A227]/25
    blur-[160px]
    "
  />


  {/* LUXURY FRAME */}

  <div
    className="
    absolute
    h-[600px]
    w-[600px]
    opacity-20
    bg-[url('/patterns/luxury-frame.svg')]
    bg-contain
    bg-center
    bg-no-repeat
    "
  />



  {/* RED AMBIENT LIGHT */}

  <div
    className="
    absolute
    right-0
    h-[450px]
    w-[450px]
    rounded-full
    bg-[#7A1835]/40
    blur-[160px]
    "
  />



  {/* GANESH CONTAINER */}


  <div
    className="
    relative
    h-[600px]
    w-full
    max-w-lg
    translate-y-[-10px]
    "
  >


    <Image
      src={image}
      alt={title}
      fill
      priority
      className="
      object-contain
      scale-[1.18]
      "
    />



    {/* FLOOR LIGHT */}

    <div
      className="
      absolute
      bottom-14
      left-1/2
      h-16
      w-60
      -translate-x-1/2
      rounded-full
      bg-[#C9A227]/40
      blur-3xl
      "
    />


  </div>



</div>


      </div>



    </section>

  );

}