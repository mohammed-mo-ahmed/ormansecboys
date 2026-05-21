export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-10 bg-gray-200 rounded-lg w-1/3 mx-auto mb-4" />
        <div className="h-5 bg-gray-200 rounded-lg w-1/2 mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 rounded-xl h-56" />
          ))}
        </div>
      </div>
    </div>
  );
}