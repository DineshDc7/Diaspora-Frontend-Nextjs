export default function NotAuthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-xl border p-6 text-center">
        <h1 className="text-2xl font-bold">Not authorized</h1>
        <p className="text-slate-600 mt-2">
          You don’t have permission to access this page.
        </p>
        <a
          href="/"
          className="inline-block mt-4 px-4 py-2 rounded-lg bg-black text-white"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}