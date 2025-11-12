export default function Loading() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-black dark:border-t-white animate-spin" />
        <p className="text-gray-700 dark:text-gray-300">Loading dashboard…</p>
      </div>
    </section>
  );
}
