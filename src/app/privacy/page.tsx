import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-brand-cream">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-32 md:py-40">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-12">Privacy Policy</h1>

                <div className="prose prose-lg prose-headings:text-brand-black prose-p:text-brand-gray max-w-none">

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Overview</h2>
                        <p className="leading-relaxed">
                            This Privacy Policy explains how AO Automations collects, uses, and protects information when you visit our website or interact with our services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Information We Collect</h2>
                        <ul className="list-disc pl-5 space-y-2 text-brand-gray">
                            <li>Contact details you submit (e.g., name, email, company, message).</li>
                            <li>Basic usage data (e.g., pages viewed, approximate location, device/browser information).</li>
                            <li>Cookies and similar technologies used to improve performance and measure engagement.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">How We Use Information</h2>
                        <ul className="list-disc pl-5 space-y-2 text-brand-gray">
                            <li>Respond to inquiries and provide requested information.</li>
                            <li>Operate, maintain, and improve our website and services.</li>
                            <li>Analyze traffic and usage to improve content and user experience.</li>
                            <li>Protect against fraud, abuse, and security incidents.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Sharing</h2>
                        <p className="leading-relaxed">
                            We do not sell your personal information. We may share information with trusted service providers who help us run the website and deliver services, subject to confidentiality and security obligations, or when required by law.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Security & Retention</h2>
                        <p className="leading-relaxed">
                            We implement reasonable safeguards to protect information. We retain personal information only as long as necessary for the purposes described in this policy or as required by law.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Your Choices</h2>
                        <p className="leading-relaxed">
                            You may request access, correction, or deletion of your information by contacting us. You can also control cookies via your browser settings.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Contact</h2>
                        <p className="leading-relaxed">
                            For privacy questions or requests, contact us via the contact page.
                        </p>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}
