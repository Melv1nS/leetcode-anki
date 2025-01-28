import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Master LeetCode with</span>
            <span className="block text-indigo-600 dark:text-indigo-400">
              Spaced Repetition
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Practice the Blind 75 efficiently using proven spaced repetition
            techniques. Track your progress and master coding interviews.
          </p>

          {/* Auth Buttons */}
          <div className="mt-10 flex justify-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-md bg-white px-6 py-3 text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Go to Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>

        {/* Feature Section */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              Blind 75 Questions
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              Curated list of the most important LeetCode questions for
              interviews
            </p>
          </div>

          <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              Spaced Repetition
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              Optimize your learning with scientifically proven review intervals
            </p>
          </div>

          <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              Progress Tracking
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              Monitor your improvement with detailed statistics and insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
