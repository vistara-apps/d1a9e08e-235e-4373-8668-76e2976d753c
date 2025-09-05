export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
        <div className="space-y-2">
          <div className="h-4 bg-purple-300 bg-opacity-30 rounded w-48 mx-auto animate-pulse"></div>
          <div className="h-4 bg-purple-300 bg-opacity-20 rounded w-32 mx-auto animate-pulse"></div>
        </div>
        <p className="text-purple-300">Loading RightsGuardian...</p>
      </div>
    </div>
  );
}
