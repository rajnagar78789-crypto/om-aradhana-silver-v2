type TrustItem = {
  value: string;
  label: string;
};


const trustItems: TrustItem[] = [
  {
    value: "1100+",
    label: "Retail Showrooms",
  },
  {
    value: "5+",
    label: "Years Experience",
  },
  {
    value: "200+",
    label: "Premium Designs",
  },
  {
    value: "PAN",
    label: "India Supply",
  },
  {
    value: "GST",
    label: "Billing Available",
  },
  {
    value: "24/7",
    label: "Business Support",
  },
];



export default function CollectionTrustBar() {

  return (

    <section
      className="
      relative
      z-10
      -mt-12
      px-6
      "
    >


      <div
        className="
        mx-auto
        grid
        max-w-7xl
        grid-cols-2
        overflow-hidden
        rounded-[32px]
        border
        border-[#C9A227]/40
        bg-[#F8F5F0]
        shadow-[0_25px_60px_rgba(0,0,0,0.18)]
        md:grid-cols-3
        lg:grid-cols-6
        "
      >



        {trustItems.map((item, index) => (

          <div
            key={item.label}
            className={`
            relative
            px-4
            py-5
            text-center
            ${
              index !== trustItems.length - 1
              ? "lg:border-r border-[#E8D8B8]"
              : ""
            }
            `}
          >



            <h3
              className="
              text-4xl
              font-black
              tracking-tight
              text-[#5A1020]
              "
            >
              {item.value}
            </h3>



            <p
              className="
              mt-2
              text-sm
              font-semibold
              text-[#555]
              "
            >
              {item.label}
            </p>



          </div>


        ))}



      </div>


    </section>

  );

}