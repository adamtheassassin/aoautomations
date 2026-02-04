import Link from 'next/link';
import LiquidButton from './LiquidButton';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-white/80 border-b border-brand-black/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer">
                    {/* Logo Icon */}
                    <img
                        src="/icons_&_images/Client Logos/ao-icon.svg"
                        alt="aoautomations"
                        className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-2xl font-bold text-brand-black tracking-tight group-hover:text-brand-red transition-colors duration-300">
                        aoautomations
                    </span>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-8 font-medium text-brand-gray">
                        <Link href="#" className="hover:text-brand-red transition-colors duration-200">Home</Link>
                        <Link href="#" className="hover:text-brand-red transition-colors duration-200">Newsletter</Link>
                        <Link href="#" className="hover:text-brand-red transition-colors duration-200">Blog</Link>
                    </div>

                    <LiquidButton className="px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-brand-red/20 transition-all">
                        Get Your FREE Analysis
                    </LiquidButton>
                </div>
            </div>
        </nav>
    );
}
