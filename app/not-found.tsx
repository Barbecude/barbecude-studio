import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center bg-bg-primary text-text-primary p-8">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <p className="mb-6 opacity-80 tracking-widest text-sm">Could not find requested resource</p>
      <Link href="/" className="px-6 py-3 bg-primary text-white font-bold tracking-widest border border-transparent hover:brightness-110">
        Return Home
      </Link>
    </div>
  );
}
