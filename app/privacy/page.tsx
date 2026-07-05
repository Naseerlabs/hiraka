"use client";

import { useRouter } from "next/navigation";
import FadeContent from "@/components/react-bits/FadeContent";

export default function PrivacyPage() {
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

          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-zinc-400 mb-8">Last updated: July 5, 2026</p>

          <div className="prose prose-zinc max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-zinc-600 leading-relaxed">
                Welcome to Hiraka (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Japanese language learning application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <div className="text-zinc-600 leading-relaxed space-y-3">
                <p><strong>Account Information:</strong> When you create an account, we collect your email address and authentication credentials.</p>
                <p><strong>Usage Data:</strong> We collect information about your practice sessions, including words practiced, completion rates, and learning progress.</p>
                <p><strong>Device Information:</strong> We may collect information about your device, including browser type, operating system, and device identifiers.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <ul className="text-zinc-600 leading-relaxed list-disc list-inside space-y-2">
                <li>To provide and maintain our learning service</li>
                <li>To track your learning progress and personalize your experience</li>
                <li>To communicate with you about updates and features</li>
                <li>To improve our application and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-zinc-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
              <div className="text-zinc-600 leading-relaxed space-y-3">
                <p>We use the following third-party services:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Supabase:</strong> Authentication and database services</li>
                  <li><strong>Vercel:</strong> Application hosting</li>
                  <li><strong>Pexels:</strong> Free stock images for learning content</li>
                  <li><strong>Google OAuth:</strong> Sign-in authentication</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="text-zinc-600 leading-relaxed">
                You have the right to access, correct, or delete your personal information. You can manage your account settings through the application or contact us directly for assistance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
              <p className="text-zinc-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-zinc-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at workforjunaidd@gmail.com
              </p>
            </section>
          </div>
        </FadeContent>
      </div>
    </main>
  );
}
