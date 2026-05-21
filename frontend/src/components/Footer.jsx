const FOOTER_LINKS = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

const LOGO_INVERTED =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/9mp1q9ea_TY%20inverted%20logo.png";

export const Footer = () => {
    const handleClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <footer
            data-testid="site-footer"
            className="bg-[#545454] text-white relative"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20 flex flex-col items-center text-center">
                <img
                    src={LOGO_INVERTED}
                    alt="Toothfully Yours"
                    className="h-24 md:h-28 w-auto object-contain"
                    data-testid="footer-logo"
                />

                <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                    {FOOTER_LINKS.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                data-testid={`footer-link-${link.label.toLowerCase()}`}
                                className="font-dmsans text-sm text-white/80 hover:text-[#EB8A2C] transition-colors"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="mt-12 h-px w-24 bg-white/15" />

                <p className="mt-8 font-dmsans text-xs text-white/55">
                    © {new Date().getFullYear()} Toothfully Yours. All rights
                    reserved.
                </p>
            </div>

            {/* Designed by — bottom corner */}
            <p
                data-testid="footer-credit"
                className="absolute bottom-3 right-4 md:right-6 font-dmsans text-[0.65rem] tracking-wider text-white/40"
            >
                Designed by{" "}
                <span className="text-white/70">Cranberry Design House</span>
            </p>
        </footer>
    );
};

export default Footer;
