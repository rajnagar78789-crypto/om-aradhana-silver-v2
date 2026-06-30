export default function Footer() {
  return (
    <footer className="bg-[#3B0B16] py-16 text-white">
      <div className="container grid gap-10 md:grid-cols-3">

        <div>
          <h2 className="text-3xl font-bold">
            Om Aradhana Silver
          </h2>

          <p className="mt-4 text-gray-300">
            Premium Wholesale Supplier of
            999 Silver Idols, 92.5 Antique Jewellery,
            Fusion Collection, Turkey Kada,
            Payal and Sterling Silver Jewellery.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">
            Contact
          </h3>

          <p className="text-gray-300">
            📍 Ahmedabad | Mumbai
          </p>

          <p className="mt-3 text-gray-300">
            📞 +91 XXXXXXXXXX
          </p>

          <p className="mt-3 text-gray-300">
            ✉ info@omaradhanasilver.com
          </p>
        </div>

      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
        © 2026 Om Aradhana Silver. All Rights Reserved.
      </div>
    </footer>
  );
}