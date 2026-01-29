import LiquidButton from './LiquidButton';

export default function Hero() {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="space-y-8">
                    <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] text-brand-black tracking-tight">
                        Top 3 Google Maps Rankings in 90 Days - <span className="text-brand-red">Guaranteed</span>
                    </h1>

                    <p className="text-xl text-brand-black/70 leading-relaxed max-w-lg">
                        We'll get your UK local business ranking in the top 3 Google Maps results for your service area within 90 days - or we work for free until you do.
                    </p>

                    <div className="pt-4">
                        <LiquidButton className="px-8 py-4 text-lg shadow-xl">
                            Get The FREE Analysis
                        </LiquidButton>
                    </div>
                </div>

                {/* Right Content - Video Placeholder */}
                <div className="relative group cursor-pointer">
                    {/* Decorative blur/glow behind */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-red to-brand-dark rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl aspect-video border-4 border-white">
                        {/* Fake Video Content */}
                        <div className="w-full h-full bg-neutral-200 flex items-center justify-center relative">
                            {/* Overlay Image Placeholder */}
                            <div className="absolute inset-0 bg-gray-300"></div>

                            {/* Play Button */}
                            <div className="relative z-10 w-20 h-20 bg-brand-red rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                            </div>

                            {/* Timeline Bar */}
                            <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-white/30 rounded-full overflow-hidden">
                                <div className="h-full w-1/3 bg-brand-red"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Social Proof / Logos */}
            <div className="mt-24 pt-12 border-t border-brand-black/5">
                <p className="text-sm font-semibold text-brand-black/40 mb-8">Working with...</p>
                <div className="flex flex-wrap gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Logo Placeholders */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-12 w-32 bg-brand-black/20 rounded-md"></div>
                    ))}
                </div>
            </div>
        </section>
    );
}
