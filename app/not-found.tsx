import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf7f2] px-6">

      <div className="max-w-xl text-center">

        <h1 className="text-8xl font-extrabold text-[#5A1020]">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-bold text-[#5A1020]">
          Page Not Found
        </h2>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <div className="mt-10">

          <Link
            href="/"
            className="rounded-xl bg-[#5A1020] px-8 py-4 font-semibold text-white transition hover:bg-[#74192f]"
          >
            Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
}