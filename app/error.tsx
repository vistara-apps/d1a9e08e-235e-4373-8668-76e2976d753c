'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl">⚠️</div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Something went wrong!
          </h2>
          <p className="text-purple-300">
            We encountered an error while loading RightsGuardian. This might be a temporary issue.
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl w-full"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = 'tel:911'}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-all duration-200 w-full"
          >
            Emergency: Call 911
          </button>
        </div>
        <p className="text-sm text-purple-400">
          If this problem persists, you can still access emergency services directly.
        </p>
      </div>
    </div>
  );
}
