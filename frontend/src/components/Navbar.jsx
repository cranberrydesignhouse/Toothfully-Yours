import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

const LOGO_URL =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/kh779mbu_TOOTHFULLY-YOURS-LOGO-FINAL-1.png";

export const Navbar = ({ onOpenBooking }) => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleBook = (e) => {
        e.preventDefault();
        setOpen(false);
        onOpenBooking?.();
    };

    return (
        <header
            data-testid="site-navbar"
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/90 backdrop-blur-md border-b border-black/5 shadow-[0_2px_18px_-12px_rgba(0,0,0,0.25)]"
                    : "bg-white/60 backdrop-blur-sm"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-5 md:px-10 lg:px-12 h-20 md:h-24 flex items-center justify-between">
                <a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, "#hero")}
                    data-testid="nav-logo"
                    className="flex items-center group"
                    aria-label="Toothfully Yours — home"
                >
                    {/* Crop the bottom tagline of the logo for visual balance */}
                    <div className="overflow-hidden h-12 md:h-[68px] flex items-start mt-1 md:mt-1.5">
                        <img
                            src={LOGO_URL}
                            alt="Toothfully Yours"
                            className="h-[66px] md:h-[96px] w-auto object-contain block"
                        />
                    </div>
                </a>

                <ul className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                data-testid={`nav-link-${link.label.toLowerCase()}`}
                                className="font-dmsans text-[0.95rem] text-[#1A1A1A] hover:text-[#EB8A2C] transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#EB8A2C] hover:after:w-full after:transition-all"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2 md:gap-3">
                    {/* Phone call button */}
                    <a
                        href="tel:+918769005504"
                        data-testid="nav-call-button"
                        aria-label="Call +91 87690 05504"
                        className="inline-flex items-center gap-2 h-10 md:h-11 px-3 md:px-4 rounded-full border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                    >
                        <Phone size={16} strokeWidth={1.8} />
                        <span className="hidden lg:inline font-dmsans text-[0.92rem] font-medium tracking-tight">
                            +91 87690 05504
                        </span>
                    </a>

                    <button
                        type="button"
                        onClick={handleBook}
                        data-testid="nav-cta-book"
                        className="hidden md:inline-flex btn-primary !py-2.5 !px-5 !text-[0.92rem]"
                    >
                        Book My Consultation
                    </button>
                    <button
                        type="button"
                        aria-label="Open menu"
                        data-testid="nav-mobile-toggle"
                        onClick={() => setOpen((s) => !s)}
                        className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-black/10 text-[#1A1A1A]"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </nav>

            {open && (
                <div
                    data-testid="nav-mobile-panel"
                    className="md:hidden bg-white border-t border-black/5 px-6 py-6"
                >
                    <ul className="flex flex-col gap-4">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) =>
                                        handleNavClick(e, link.href)
                                    }
                                    className="font-dmsans text-base text-[#1A1A1A]"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        onClick={handleBook}
                        className="btn-primary w-full mt-6 !py-3"
                    >
                        Book My Consultation
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
