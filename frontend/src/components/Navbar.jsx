import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const SERVICE_ROUTES = [
    { label: "Cosmetic & Aesthetic Care", to: "/cosmetic-aesthetic-care" },
    { label: "Implants & Restoration", to: "/implants-restoration" },
    { label: "Corrective Alignment", to: "/corrective-alignment" },
    { label: "Neuromuscular Dentistry", to: "/neuromuscular-dentistry" },
];

// `to` = react-router route. `href` = same-page anchor (only valid on "/").
// `submenu` = list of dropdown links.
const NAV_LINKS = [
    { label: "Services", submenu: SERVICE_ROUTES },
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Global Access", to: "/global-access" },
    { label: "Contact", href: "#contact" },
];

const LOGO_URL =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/kh779mbu_TOOTHFULLY-YOURS-LOGO-FINAL-1.png";

export const Navbar = ({ onOpenBooking }) => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const onHome = location.pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // When arriving at "/" with a hash (e.g. /#services), smooth-scroll to it.
    useEffect(() => {
        if (onHome && location.hash) {
            const id = location.hash;
            requestAnimationFrame(() => {
                const el = document.querySelector(id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }
    }, [onHome, location.hash, location.key]);

    const handleAnchorClick = (e, href) => {
        e.preventDefault();
        setOpen(false);
        if (onHome) {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            navigate(`/${href}`);
        }
    };

    const handleRouteClick = () => setOpen(false);

    const handleBook = (e) => {
        e.preventDefault();
        setOpen(false);
        onOpenBooking?.();
    };

    const linkClasses =
        "font-dmsans text-[0.95rem] text-[#1A1A1A] hover:text-[#EB8A2C] transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#EB8A2C] hover:after:w-full after:transition-all";
    const activeLinkClasses =
        "font-dmsans text-[0.95rem] text-[#EB8A2C] transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-[#EB8A2C]";

    return (
        <header
            data-testid="site-navbar"
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/90 backdrop-blur-md border-b border-black/5 shadow-[0_2px_18px_-12px_rgba(0,0,0,0.25)]"
                    : "bg-white/60 backdrop-blur-sm"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
                <Link
                    to="/"
                    data-testid="nav-logo"
                    className="flex items-center group shrink-0"
                    aria-label="Toothfully Yours, home"
                >
                    <div className="overflow-hidden h-9 md:h-11 flex items-start mt-1 md:mt-1.5">
                        <img
                            src={LOGO_URL}
                            alt="Toothfully Yours"
                            className="h-[54px] md:h-[68px] w-auto object-contain block"
                        />
                    </div>
                </Link>

                <ul className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-7">
                    {NAV_LINKS.map((link) => {
                        const isRoute = !!link.to;
                        const hasSubmenu = !!link.submenu;
                        const isActive = hasSubmenu
                            ? link.submenu.some(
                                  (s) => s.to === location.pathname,
                              )
                            : isRoute && location.pathname === link.to;
                        const testId = `nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`;

                        if (hasSubmenu) {
                            return (
                                <li
                                    key={link.label}
                                    className="relative group"
                                >
                                    <button
                                        type="button"
                                        data-testid={testId}
                                        className={`whitespace-nowrap inline-flex items-center gap-1 ${
                                            isActive
                                                ? activeLinkClasses
                                                : linkClasses
                                        }`}
                                    >
                                        {link.label}
                                        <ChevronDown
                                            size={14}
                                            strokeWidth={1.8}
                                            className="transition-transform group-hover:rotate-180"
                                        />
                                    </button>
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <ul
                                            data-testid="nav-services-dropdown"
                                            className="min-w-[260px] bg-white rounded-2xl border border-black/8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] py-2 overflow-hidden"
                                        >
                                            {link.submenu.map((s) => {
                                                const sActive =
                                                    location.pathname === s.to;
                                                return (
                                                    <li key={s.to}>
                                                        <Link
                                                            to={s.to}
                                                            onClick={
                                                                handleRouteClick
                                                            }
                                                            data-testid={`nav-services-${s.to.replace("/", "")}`}
                                                            className={`block px-5 py-3 font-dmsans text-[0.92rem] tracking-tight transition-colors ${
                                                                sActive
                                                                    ? "text-[#EB8A2C] bg-[#F5F2EF]"
                                                                    : "text-[#1A1A1A] hover:text-[#EB8A2C] hover:bg-[#F5F2EF]"
                                                            }`}
                                                        >
                                                            {s.label}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </li>
                            );
                        }

                        return (
                            <li key={link.label}>
                                {isRoute ? (
                                    <Link
                                        to={link.to}
                                        onClick={handleRouteClick}
                                        data-testid={testId}
                                        className={`whitespace-nowrap ${
                                            isActive
                                                ? activeLinkClasses
                                                : linkClasses
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <a
                                        href={link.href}
                                        onClick={(e) =>
                                            handleAnchorClick(e, link.href)
                                        }
                                        data-testid={testId}
                                        className={`whitespace-nowrap ${linkClasses}`}
                                    >
                                        {link.label}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center gap-2 shrink-0">
                    <a
                        href="tel:+919769005504"
                        data-testid="nav-call-button"
                        aria-label="Call +91 97690 05504"
                        className="inline-flex items-center gap-2 h-9 md:h-10 px-3 md:px-3.5 rounded-full border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors whitespace-nowrap"
                    >
                        <Phone size={14} strokeWidth={1.8} />
                        <span className="hidden xl:inline font-dmsans text-[0.85rem] font-semibold tracking-tight">
                            +91 97690 05504
                        </span>
                    </a>

                    <button
                        type="button"
                        onClick={handleBook}
                        data-testid="nav-cta-book"
                        className="hidden md:inline-flex btn-primary !py-2 !px-4 !text-[0.85rem] whitespace-nowrap"
                    >
                        Book My Consultation
                    </button>
                    <button
                        type="button"
                        aria-label="Open menu"
                        data-testid="nav-mobile-toggle"
                        onClick={() => setOpen((s) => !s)}
                        className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-black/10 text-[#1A1A1A]"
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
                        {NAV_LINKS.map((link) => {
                            const isRoute = !!link.to;
                            const hasSubmenu = !!link.submenu;
                            const isActive =
                                isRoute && location.pathname === link.to;
                            if (hasSubmenu) {
                                return (
                                    <li key={link.label}>
                                        <p className="font-dmsans text-[0.7rem] tracking-[0.2em] uppercase text-[#5C5C5C] mb-2">
                                            {link.label}
                                        </p>
                                        <ul className="pl-3 border-l border-black/10 space-y-3">
                                            {link.submenu.map((s) => {
                                                const sActive =
                                                    location.pathname === s.to;
                                                return (
                                                    <li key={s.to}>
                                                        <Link
                                                            to={s.to}
                                                            onClick={
                                                                handleRouteClick
                                                            }
                                                            className={`font-dmsans text-[0.95rem] ${sActive ? "text-[#EB8A2C]" : "text-[#1A1A1A]"}`}
                                                        >
                                                            {s.label}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                );
                            }
                            return (
                                <li key={link.label}>
                                    {isRoute ? (
                                        <Link
                                            to={link.to}
                                            onClick={handleRouteClick}
                                            className={`font-dmsans text-base ${isActive ? "text-[#EB8A2C]" : "text-[#1A1A1A]"}`}
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a
                                            href={link.href}
                                            onClick={(e) =>
                                                handleAnchorClick(e, link.href)
                                            }
                                            className="font-dmsans text-base text-[#1A1A1A]"
                                        >
                                            {link.label}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
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
