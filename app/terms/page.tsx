"use client";

import { useRouter } from "next/navigation";
import FadeContent from "@/components/react-bits/FadeContent";

export default function TermsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="max-w-3xl mx-auto p-6 py-12">
        <FadeContent direction="up">
          <button
            onClick={() => router.back()}
            className="text-sm text-zinc-400 hover:text-rose-500 transition-colors mb-8"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm text-zinc-400 mb-8">Last updated: July 5, 2026</p>

          <div className="prose prose-zinc max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-zinc-600 leading-relaxed">
                By accessing and using Hiraka, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use of the Application</h2>
              <div className="text-zinc-600 leading-relaxed space-y-3">
                <p>Hiraka is a Japanese language learning tool designed to help users practice reading Hiragana and Katakana characters.</p>
                <p>You agree to use the application only for its intended purpose and in compliance with all applicable laws and regulations.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <ul className="text-zinc-600 leading-relaxed list-disc list-inside space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="text-zinc-600 leading-relaxed">
                The application and its original content, features, and functionality are owned by Hiraka and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Content Disclaimer</h2>
              <p className="text-zinc-600 leading-relaxed">
                Images used in the application are sourced from Pexels and are free to use. Learning content is provided for educational purposes. We strive for accuracy but cannot guarantee that all content is error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-zinc-600 leading-relaxed">
                In no event shall Hiraka be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
              <p className="text-zinc-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the application after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
              <p className="text-zinc-600 leading-relaxed">
                For questions about these Terms of Service, please contact us at workforjunaidd@gmail.com
              </p>
            </section>
          </div>
        </FadeContent>
      </div>
    </main>
  );
}
