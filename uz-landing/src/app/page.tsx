import React from 'react';
import { ArrowRight, TrendingUp, Users, BookOpen, AlertCircle, CheckCircle, Play, Zap } from 'lucide-react';

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
            Shape the Product
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl font-black leading-tight text-slate-900">
            Stop Losing Money{' '}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              While Learning to Trade
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Practice with live market data and AI-guided feedback. Build winning trading instincts before risking your first rupee—designed for Gen Z learners who want to actually succeed.
          </p>

          <div className="pt-4 flex flex-col gap-3 justify-center">
            <a
              href={googleFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-base font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Shape the Product (2‑min Form) <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <p className="text-sm text-slate-500">
              No login. No spam. Just honest feedback shapes what we build.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
            The Problem: Learning by Losing
          </h2>

          <div className="space-y-4">
            {/* Problem 1 */}
            <div className="flex gap-4 items-start p-5 bg-red-50 border border-red-200 rounded-xl hover:shadow-md transition-shadow">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-900 font-semibold">
                  You lose real money following random tips on YouTube and Telegram
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  No verification. No accountability. Just losses and regret.
                </p>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="flex gap-4 items-start p-5 bg-amber-50 border border-amber-200 rounded-xl hover:shadow-md transition-shadow">
              <BookOpen className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-900 font-semibold">
                  Learning is scattered across Reddit, YouTube, and DIY bot experiments
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  No structure. No guidance. You're building expensive mistakes instead of instincts.
                </p>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="flex gap-4 items-start p-5 bg-blue-50 border border-blue-200 rounded-xl hover:shadow-md transition-shadow">
              <TrendingUp className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-900 font-semibold">
                  Professional trading apps feel overwhelming and cold
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  No onboarding. No community. You feel alone when things go wrong.
                </p>
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

          <div className="space-y-4 mb-8">
            {/* Solution 1 */}
            <div className="flex gap-4 items-start p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
              <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Paper Trading with Live Market Data</h3>
                <p className="text-slate-700 text-sm">
                  Practice with actual prices. Test strategies risk-free. Build reliable instincts before risking ₹1 of real capital.
                </p>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="flex gap-4 items-start p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
              <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">AI-Guided Learning Paths</h3>
                <p className="text-slate-700 text-sm">
                  Bite-sized lessons, real-time feedback, personalized guidance. Just what you need, when you need it—designed for your attention span.
                </p>
              </div>
            </div>

            {/* Solution 3 */}
            <div className="flex gap-4 items-start p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200 hover:shadow-md transition-shadow">
              <CheckCircle className="h-6 w-6 text-pink-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Learn with Your Peers</h3>
                <p className="text-slate-700 text-sm">
                  Connect with other Gen Z traders, share insights, and learn from collective experience. Community beats isolation.
                </p>
              </div>
            </div>

            {/* Solution 4 */}
            <div className="flex gap-4 items-start p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200 hover:shadow-md transition-shadow">
              <CheckCircle className="h-6 w-6 text-cyan-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Graduate to Real Trading (Compliance Built In)</h3>
                <p className="text-slate-700 text-sm">
                  Move to live trading on a secure, fully-compliant platform once you've mastered the fundamentals.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-900 text-white rounded-xl text-center">
            <p className="text-lg font-semibold">
              One platform. Learn safely. Practice with real data. Trade confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Early Tester Social Proof - NEW */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-purple-600 mb-2">ALREADY VALIDATING</p>
            <p className="text-2xl font-bold text-slate-900">
              15+ Student Traders Are Shaping UZ
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="mb-10 p-8 bg-white rounded-2xl border-2 border-purple-200 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"></div>
              <div>
                <p className="font-bold text-slate-900">Anonymous Beta Tester</p>
                <p className="text-sm text-slate-600">3rd year, KIIT</p>
              </div>
            </div>
            <p className="text-slate-700 italic text-base leading-relaxed">
              "I wish I had this before losing ₹5,000 on my first options trade. Paper trading with real data + AI feedback is exactly what Gen Z traders need."
            </p>
            <div className="flex gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-black text-purple-600">15+</p>
              <p className="text-slate-900 font-semibold">Beta Testers</p>
              <p className="text-slate-600 text-sm">Across engineering colleges</p>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-black text-blue-600">150+</p>
              <p className="text-slate-900 font-semibold">Feedback Forms</p>
              <p className="text-slate-600 text-sm">Real student pain points</p>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-black text-pink-600">₹25K+</p>
              <p className="text-slate-900 font-semibold">Tested Capital Loss</p>
              <p className="text-slate-600 text-sm">Real problem we're solving</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Demo Mockup - NEW */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
            Here's What You'll Get
          </h2>

          <div className="space-y-8">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <p className="text-slate-700 font-semibold">Paper Trading Dashboard</p>
                    <p className="text-slate-600 text-sm mt-1">(Screenshot coming soon)</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Track Your Paper Trades</h3>
                <p className="text-slate-700 leading-relaxed">
                  See your portfolio performance in real-time with live market data. Win or lose with play money—no real risk, real learning.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Live prices from NSE/BSE</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Track P&L with detailed breakdowns</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Compare against peer performance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-slate-700 font-semibold">AI Learning Module</p>
                    <p className="text-slate-600 text-sm mt-1">(UI mockup coming soon)</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Learn Step-by-Step</h3>
                <p className="text-slate-700 leading-relaxed">
                  AI breaks down trading concepts into bite-sized lessons. Get personalized feedback on your trades—understand *why* you won or lost.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">5-min trading fundamentals lessons</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">AI analysis of your past trades</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Personalized learning paths</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-16 w-16 text-pink-600 mx-auto mb-4" />
                    <p className="text-slate-700 font-semibold">Student Community</p>
                    <p className="text-slate-600 text-sm mt-1">(Mockup coming soon)</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Trade Together, Learn Together</h3>
                <p className="text-slate-700 leading-relaxed">
                  Share your strategies, ask questions, and learn from peers. See leaderboards, join trading challenges, and celebrate wins together.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Leaderboards by returns (paper trading)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Share strategies with the community</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Monthly trading challenges</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section - REFINED */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Why We Know This Will Work
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <Users className="h-8 w-8 text-blue-600" />
              <p className="text-slate-900 font-semibold text-sm">Built by Students, for Students</p>
              <p className="text-slate-600 text-sm">
                We've lost money trading. We know the pain. Now we're fixing it with real solutions.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <Zap className="h-8 w-8 text-purple-600" />
              <p className="text-slate-900 font-semibold text-sm">Gen Z First, Always</p>
              <p className="text-slate-600 text-sm">
                Fast feedback loops. Mobile-first design. Built for how you actually learn—not legacy systems.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <AlertCircle className="h-8 w-8 text-pink-600" />
              <p className="text-slate-900 font-semibold text-sm">Early-Stage & Transparent</p>
              <p className="text-slate-600 text-sm">
                This isn't finished. Your feedback literally shapes what we build next. No BS.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <BookOpen className="h-8 w-8 text-cyan-600" />
              <p className="text-slate-900 font-semibold text-sm">Student-Backed, Community-Driven</p>
              <p className="text-slate-600 text-sm">
                Not venture hype. Students helping students succeed. That's it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Quick Questions
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-purple-600 pl-6">
              <h3 className="text-base font-bold text-slate-900 mb-2">Is this free?</h3>
              <p className="text-slate-600">
                Yes. Paper trading, AI learning, and community access are 100% free during beta. Premium features come later, but core platform stays free for all students.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-base font-bold text-slate-900 mb-2">Is this a trading app or a learning app?</h3>
              <p className="text-slate-600">
                Both. It starts as a learning + practice space (paper trading with real data + AI guidance). Once you've mastered the basics, you can move to live trading on our compliant platform.
              </p>
            </div>

            <div className="border-l-4 border-pink-600 pl-6">
              <h3 className="text-base font-bold text-slate-900 mb-2">When will I get access?</h3>
              <p className="text-slate-600">
                We're onboarding early testers in small batches. Fill out the form to get in the queue and help us build the product you actually need.
              </p>
            </div>

            <div className="border-l-4 border-cyan-600 pl-6">
              <h3 className="text-base font-bold text-slate-900 mb-2">Can I lose real money?</h3>
              <p className="text-slate-600">
                Not during beta. Paper trading uses play money. Real trading is optional and only available once you've proven you understand risk management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-600 via-blue-600 to-blue-600 text-white rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Help Shape UZ
          </h2>

          <p className="text-lg text-purple-100 mb-8 leading-relaxed">
            We're building this for you, so we need your honest feedback. Tell us about your biggest frustrations as a beginner trader. What features would actually help? What are you worried about?
          </p>

          <div className="space-y-4">
            <a
              href={googleFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-full text-base font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Share Your Feedback (2‑min Form) <ArrowRight className="ml-2 h-5 w-5" />
            </a>

            <p className="text-sm text-purple-100">
              No signup. No tracking. Just your honest thoughts.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-600">
          <p>
            Early validation project · No spam · Community-driven · {' '}
            <span className="text-purple-600 font-semibold">Built by Anwesh Mohanty</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
