import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
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

    return (
        <header
            data-testid="site-navbar"
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/85 backdrop-blur-md border-b border-black/5"
                    : "bg-white/40 backdrop-blur-sm"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 h-16 md:h-20 flex items-center justify-between">
                <a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, "#hero")}
                    data-testid="nav-logo"
                    className="flex items-center gap-2 group"
                >
                    <span className="heading-serif text-[1.45rem] md:text-[1.65rem] text-[#1A1A1A] leading-none">
                        Toothfully
                    </span>
                    <span className="font-dmsans text-[1.15rem] md:text-[1.25rem] tracking-tight text-[#EB8A2C] font-medium leading-none">
                        Yours
                    </span>
                </a>

                <ul className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                data-testid={`nav-link-${link.label.toLowerCase()}`}
                                className="font-dmsans text-sm text-[#1A1A1A] hover:text-[#EB8A2C] transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#EB8A2C] hover:after:w-full after:transition-all"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, "#contact")}
                        data-testid="nav-cta-book"
                        className="hidden md:inline-flex btn-primary !py-2.5 !px-5 !text-sm"
                    >
                        Book My Consultation
                    </a>
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
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, "#contact")}
                        className="btn-primary w-full mt-6 !py-3"
                    >
                        Book My Consultation
                    </a>
                </div>
            )}
        </header>
    );
};

export default Navbar;
