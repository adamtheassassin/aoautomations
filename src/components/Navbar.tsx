import Link from 'next/link';
import LiquidButton from './LiquidButton';

export default function Navbar() {
    return (
        <nav className="w-full py-6 px-8 flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
                {/* Placeholder Icon */}
                <div className="w-8 h-8 bg-brand-black rounded-lg flex items-center justify-center text-white font-bold">
                    P
                </div>
                <span className="text-2xl font-bold text-brand-black tracking-tight">ProfResults</span>
            </div>

            <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-6 font-medium text-brand-black/80">
                    <Link href="#" className="hover:text-brand-black transition-colors">Home</Link>
                    <Link href="#" className="hover:text-brand-black transition-colors">Newsletter</Link>
                    <Link href="#" className="hover:text-brand-black transition-colors">Blog</Link>
                </div>

                <LiquidButton className="px-6 py-3 text-sm md:text-base shadow-xl">
                    Get Your FREE Analysis
                </LiquidButton>
            </div>
        </nav>
    );
}
