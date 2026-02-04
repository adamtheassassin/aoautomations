import Link from 'next/link';
import LiquidButton from './LiquidButton';

export default function HowItWorks() {
    return (
        <section className="w-full py-20 px-6 bg-brand-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight">
                        How we get you <span className="text-brand-red italic font-serif">there</span>
                    </h2>
                    <p className="text-xl text-brand-gray max-w-2xl mx-auto">
                        We take care of the tech and details, so you can focus on your work while your business brings in more happy customers every single day.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {/* Feature 1: Google Business Profile */}
                    <div className="group relative bg-brand-dark p-8 rounded-3xl shadow-xl border border-white/5 hover:border-brand-red/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden text-center flex flex-col items-center gpu-accelerate">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 gpu-accelerate"></div>

                        <div className="mb-12 relative w-48 h-48 flex items-center justify-center">
                            <img
                                src="/icons_&_images/gbpoptimze1.webp"
                                alt="Google Business Profile Optimization"
                                className="w-full h-full object-contain drop-shadow-2xl scale-175"
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-red transition-colors duration-300">
                            Complete Google Business
                            <br />Profile Optimization
                        </h3>

                        <p className="text-gray-300 leading-relaxed">
                            We rebuild your entire Google Business Profile from the ground up to match exactly what Google wants to see.
                        </p>
                    </div>

                    {/* Feature 2: High-Status Website */}
                    <div className="group relative bg-brand-dark p-8 rounded-3xl shadow-xl border border-white/5 hover:border-brand-red/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden text-center flex flex-col items-center gpu-accelerate">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 gpu-accelerate"></div>

                        <div className="mb-12 relative w-48 h-48 flex items-center justify-center">
                            <img
                                src="/icons_&_images/websiteoptimize.webp"
                                alt="High-Status Business Website"
                                className="w-full h-full object-contain drop-shadow-2xl scale-175"
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-red transition-colors duration-300">
                            High-Status Business
                            <br />Website
                        </h3>

                        <p className="text-gray-300 leading-relaxed">
                            We make your message resonate with your ideal clients, and support it with a design that aids your copy and builds instant trust.
                        </p>
                    </div>

                    {/* Feature 3: Local Authority Building */}
                    <div className="group relative bg-brand-dark p-8 rounded-3xl shadow-xl border border-white/5 hover:border-brand-red/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden text-center flex flex-col items-center gpu-accelerate">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 gpu-accelerate"></div>

                        <div className="mb-12 relative w-48 h-48 flex items-center justify-center">
                            <img
                                src="/icons_&_images/localauthority.webp"
                                alt="Local Authority Building"
                                className="w-full h-full object-contain drop-shadow-2xl scale-175"
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-red transition-colors duration-300">
                            Local Authority Building
                        </h3>

                        <p className="text-gray-300 leading-relaxed">
                            We establish your business as the dominant local authority through citations, content, and signals Google actually cares about.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <LiquidButton className="px-10 py-4 text-lg shadow-xl">
                        Get Your FREE Analysis
                    </LiquidButton>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl -z-0 -translate-x-1/2 -translate-y-1/2 gpu-accelerate"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-dark/5 rounded-full blur-3xl -z-0 translate-x-1/3 translate-y-1/3 gpu-accelerate"></div>
        </section>
    );
}
