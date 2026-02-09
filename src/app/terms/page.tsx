import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-brand-cream">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-32 md:py-40">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">Terms of Service</h1>
                <p className="text-xl text-brand-gray mb-12">
                    Effective date: December 18, 2025
                </p>

                <div className="prose prose-lg prose-headings:text-brand-black prose-p:text-brand-gray max-w-none">

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Agreement</h2>
                        <p className="leading-relaxed">
                            By accessing or using AO Automations, you agree to these Terms of Service. If you do not agree, do not use the website or services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Use of the Website</h2>
                        <p className="leading-relaxed mb-4">
                            Do not misuse the site, attempt unauthorized access, or disrupt functionality.
                        </p>
                        <p className="leading-relaxed">
                            You are responsible for information you submit and for complying with applicable laws.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Services & Deliverables</h2>
                        <p className="leading-relaxed">
                            Any paid services, project scope, timelines, and deliverables are governed by separate written agreements or statements of work. In case of conflict, those documents control.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Intellectual Property</h2>
                        <p className="leading-relaxed">
                            The website content, branding, and design are owned by AO Automations or licensors and are protected by intellectual property laws. You may not copy, modify, or distribute content without permission.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Disclaimers</h2>
                        <p className="leading-relaxed">
                            The website is provided as-is and as-available. We do not warrant uninterrupted or error-free operation.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Limitation of Liability</h2>
                        <p className="leading-relaxed">
                            To the maximum extent permitted by law, AO Automations will not be liable for indirect, incidental, special, consequential, or punitive damages arising out of your use of the website.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Changes</h2>
                        <p className="leading-relaxed">
                            We may update these terms from time to time. Continued use of the website after changes means you accept the updated terms.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-brand-black mb-4">Contact</h2>
                        <p className="leading-relaxed">
                            Questions about these terms can be sent via the contact page.
                        </p>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}
