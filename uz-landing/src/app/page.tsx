import React from 'react';
import { ArrowRight, TrendingUp, Users, BookOpen, AlertCircle } from 'lucide-react';

export default function UZLanding() {
  const googleFormLink = "https://forms.gle/9RaYEdsTCbVgr5iZ8";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-purple-50 to-blue-50">

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            UZ
          </div>
          <a
            href={googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold hover:shadow-lg transition"
          >
            Share Feedback
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-tight">
          Learn Trading{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Without Losing Money
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
          We’re exploring a student-first trading learning platform where beginners can
          practice with real market data, understand mistakes, and build confidence
          <strong> before risking real money</strong>.
        </p>

        <div className="mt-10">
          <a
            href={googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-bold hover:shadow-xl hover:scale-105 transition"
          >
            Share Your Honest Feedback <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Takes ~2 minutes · No sign-up · No spam
        </p>
      </section>

      {/* Problem */}
      <section className="py-16 bg-white border-y border-slate-200 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Why Beginners Struggle
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Problem
              icon={<AlertCircle className="h-6 w-6 text-red-600" />}
              title="Real Money Losses"
              text="Most beginners learn by losing money because there’s no safe place to practice realistically."
            />
            <Problem
              icon={<BookOpen className="h-6 w-6 text-amber-600" />}
              title="Scattered Learning"
              text="Content is everywhere—YouTube, Telegram, Reddit—but there’s no structure or feedback."
            />
            <Problem
              icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
              title="Overwhelming Apps"
              text="Existing platforms assume prior knowledge and leave beginners confused."
            />
          </div>
        </div>
      </section>

      {/* What We’re Exploring */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            What We’re Exploring
          </h2>

          <ul className="space-y-6">
            <Point
              number="1"
              title="Practice with Real Market Data"
              text="Simulated trading using live prices so learning feels real—but without financial risk."
            />
            <Point
              number="2"
              title="Clear, Simple Explanations"
              text="Understand why a trade worked or failed in plain language—no jargon overload."
            />
            <Point
              number="3"
              title="Learning with Peers"
              text="Students learning together, sharing mistakes and insights instead of copying tips blindly."
            />
          </ul>

          <div className="mt-12 p-6 bg-slate-900 text-white rounded-2xl text-center">
            This is an early-stage idea. Your feedback decides what gets built.
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50 border-y border-slate-200 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">
            Why This Exists
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Reason
              icon={<Users className="h-8 w-8 text-blue-600 mx-auto" />}
              title="Built by a Student"
              text="This idea comes from personal losses, confusion, and frustration while learning trading."
            />
            <Reason
              icon={<AlertCircle className="h-8 w-8 text-purple-600 mx-auto" />}
              title="Honest & Early"
              text="Nothing is finalized. No hidden agenda. We’re validating before building."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Shape This With Your Input
          </h2>
          <p className="text-purple-100 mb-8">
            Tell us what confused you when you started trading and what would’ve helped.
          </p>

          <a
            href={googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:shadow-xl hover:scale-105 transition"
          >
            Share Feedback <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-6 text-center text-sm text-slate-600">
        Early validation project · Community-driven · Built by Anwesh Mohanty
      </footer>
    </div>
  );
}

/* Small Components */

function Problem({ icon, title, text }) {
  return (
    <div className="p-6 bg-slate-50 border rounded-2xl">
      <div className="flex gap-4">
        {icon}
        <div>
          <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
          <p className="text-sm text-slate-600">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Point({ number, title, text }) {
  return (
    <div className="flex gap-6 p-6 bg-white border rounded-2xl">
      <div className="h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">
        {number}
      </div>
      <div>
        <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function Reason({ icon, title, text }) {
  return (
    <div className="space-y-2">
      {icon}
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}
