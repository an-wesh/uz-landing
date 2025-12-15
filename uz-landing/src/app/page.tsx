import React from 'react';
import { ArrowRight, TrendingUp, Users, BookOpen, AlertCircle } from 'lucide-react';

export default function UZLanding() {
  const googleFormLink = "https://forms.gle/9RaYEdsTCbVgr5iZ8";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            UZ
          </div>
          <a
            href={googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300"
          >
            Get Early Access
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl font-black leading-tight text-slate-900">
            Stop Losing Money{' '}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              While Learning
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A trading platform designed for Gen Z learners. Practice with real market data, 
            get AI-guided feedback, and learn alongside your peers—all before risking real money.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={googleFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-base font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Early Access <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            
          </div>

          <p className="text-sm text-slate-500 pt-4">
            💡 Takes less than 2 minutes to share your feedback
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
            The Problem: Learning by Losing
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Problem 1 */}
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">You're Losing Real Money</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    No safety net. You jump into markets unprepared, follow creator tips, lose money, and give up.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <BookOpen className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Learning is Scattered</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Videos on YouTube, random posts on Reddit, unverified strategies on Telegram—no guidance.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <TrendingUp className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Platforms Aren't Built for You</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Professional interfaces, zero onboarding, no support. You feel lost and overwhelmed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
            What We're Building
          </h2>

          <div className="space-y-6">
            {/* Solution 1 */}
            <div className="flex gap-6 items-start p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white flex-shrink-0 font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Paper Trading with Real Data</h3>
                <p className="text-slate-700">
                  Practice with actual market prices. Test strategies risk-free. Have real-time feedback about past trades. Build confidence before spending a rupee.
                </p>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="flex gap-6 items-start p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white flex-shrink-0 font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI-Guided Learning Paths</h3>
                <p className="text-slate-700">
                  Bite-sized lessons, real-time feedback, personalized guidance. No overwhelming courses. Just what you need when you need it.
                </p>
              </div>
            </div>

            {/* Solution 3 */}
            <div className="flex gap-6 items-start p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl border border-pink-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-white flex-shrink-0 font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Learn with Your Peers</h3>
                <p className="text-slate-700">
                  Connect with other Gen Z traders. Share insights, learn from collective experience, and support each other through mistakes.
                </p>
              </div>
            </div>

            {/* Solution 4 */}
            <div className="flex gap-6 items-start p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl border border-cyan-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 text-white flex-shrink-0 font-bold text-lg">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Graduate to Real Trading</h3>
                <p className="text-slate-700">
                  Once you're confident, transition seamlessly to a secure, fully-compliant platform built for young traders like you.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-slate-900 text-white rounded-2xl text-center">
            <p className="text-lg font-semibold">
              One platform. Learn safely. Practice with real data. Trade confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-12">
            Why You Should Believe Us
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Users className="h-8 w-8 text-blue-600 mx-auto" />
              <p className="text-slate-900 font-semibold">Built by Students, for Students</p>
              <p className="text-slate-600 text-sm">
                We've lost money trading. We know the pain. Now we're building the solution.
              </p>
            </div>

            <div className="space-y-2">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto" />
              <p className="text-slate-900 font-semibold">Gen Z First</p>
              <p className="text-slate-600 text-sm">
                Fast feedback loops. Mobile-first design. Built for how you actually learn.
              </p>
            </div>

            <div className="space-y-2">
              <AlertCircle className="h-8 w-8 text-pink-600 mx-auto" />
              <p className="text-slate-900 font-semibold">Early-Stage & Honest</p>
              <p className="text-slate-600 text-sm">
                We're not pretending this is finished. Your feedback literally shapes what we build.
              </p>
            </div>

            <div className="space-y-2">
              <BookOpen className="h-8 w-8 text-cyan-600 mx-auto" />
              <p className="text-slate-900 font-semibold">Community-Driven</p>
              <p className="text-slate-600 text-sm">
                This isn't venture hype. This is students helping students learn better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-600 via-blue-600 to-blue-600 text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Help Us Build the Right Thing
          </h2>

          <p className="text-lg text-purple-100 mb-8 leading-relaxed">
            We're early-stage and hungry for feedback. Tell us what problems you face as a beginner trader. What features would actually help you? Your input directly shapes the product we're building.
          </p>

          <div className="space-y-4">
            <a
              href={googleFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-full text-base font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Share Your Feedback <ArrowRight className="ml-2 h-5 w-5" />
            </a>

            <p className="text-sm text-purple-100">
              ⏱️ Honest feedback takes less than 2 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-600">
          <p>
            Early validation project · No spam · Community-driven · {' '}
            <span className="text-purple-600 font-semibold">Built by Gen-Z</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
