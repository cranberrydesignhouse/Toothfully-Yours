const FOOTER_LINKS = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

export const Footer = () => {
    const handleClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <footer
            data-testid="site-footer"
            className="bg-[#545454] text-white"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20 flex flex-col items-center text-center">
                <div className="flex items-baseline gap-2">
                    <span className="heading-serif text-3xl md:text-4xl">
                        Toothfully
                    </span>
                    <span className="font-dmsans text-xl md:text-2xl text-[#EB8A2C] font-medium">
                        Yours
                    </span>
                </div>
                <p className="mt-3 font-dmsans text-sm tracking-[0.18em] uppercase text-white/70">
                    Cosmetic · Smiles · Restorations
                </p>

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
        </footer>
    );
};

export default Footer;
