import { Phone, Mail, MapPin, Instagram, Linkedin } from "lucide-react";

const QUICK_LINKS = [
    { label: "About", href: "#about" },
    { label: "Our Team", href: "#team" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
];

const SERVICES = [
    { label: "Cosmetic & Aesthetic Care" },
    { label: "Implants & Restoration" },
    { label: "Corrective Alignment" },
    { label: "Neuromuscular Dentistry" },
    { label: "General Checkup" },
];

const LOGO_INVERTED =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/9mp1q9ea_TY%20inverted%20logo.png";

export const Footer = () => {
    const handleClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleServiceClick = (e) => {
        e.preventDefault();
        const el = document.querySelector("#services");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <footer
            data-testid="site-footer"
            className="bg-[#545454] text-white relative"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
                    {/* Logo + tagline */}
                    <div className="md:col-span-5 lg:col-span-4">
                {/* Crop the bottom tagline of the logo for visual balance */}
                <div className="overflow-hidden h-[88px] md:h-[112px] flex items-start -ml-1">
                    <img
                        src={LOGO_INVERTED}
                        alt="Toothfully Yours"
                        className="h-[120px] md:h-[160px] w-auto object-contain block"
                        data-testid="footer-logo"
                    />
                </div>
                        <p className="mt-5 font-dmsans text-[0.95rem] text-white/75 leading-relaxed max-w-sm">
                            A NYU-trained, Mumbai-based dental practice
                            crafting cosmetic, restorative, and corrective
                            smiles — with quiet precision, in Khar West.
                        </p>

                        <div className="mt-7 flex items-center gap-3">
                            <a
                                href="https://instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                data-testid="footer-social-instagram"
                                aria-label="Instagram"
                                className="h-10 w-10 rounded-full border border-white/25 text-white/85 flex items-center justify-center hover:bg-[#EB8A2C] hover:border-[#EB8A2C] hover:text-white transition-colors"
                            >
                                <Instagram size={16} strokeWidth={1.6} />
                            </a>
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                data-testid="footer-social-linkedin"
                                aria-label="LinkedIn"
                                className="h-10 w-10 rounded-full border border-white/25 text-white/85 flex items-center justify-center hover:bg-[#EB8A2C] hover:border-[#EB8A2C] hover:text-white transition-colors"
                            >
                                <Linkedin size={16} strokeWidth={1.6} />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="md:col-span-3 lg:col-span-3">
                        <p className="font-dmsans text-[0.7rem] tracking-[0.22em] uppercase text-[#EB8A2C] font-semibold mb-5">
                            Services
                        </p>
                        <ul className="space-y-3">
                            {SERVICES.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href="#services"
                                        onClick={handleServiceClick}
                                        data-testid={`footer-service-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                                        className="font-dmsans text-sm text-white/80 hover:text-[#EB8A2C] transition-colors"
                                    >
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <p className="font-dmsans text-[0.7rem] tracking-[0.22em] uppercase text-[#EB8A2C] font-semibold mb-5">
                            Explore
                        </p>
                        <ul className="space-y-3">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) =>
                                            handleClick(e, link.href)
                                        }
                                        data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="font-dmsans text-sm text-white/80 hover:text-[#EB8A2C] transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-12 lg:col-span-3">
                        <p className="font-dmsans text-[0.7rem] tracking-[0.22em] uppercase text-[#EB8A2C] font-semibold mb-5">
                            Visit Us
                        </p>
                        <ul className="space-y-4 font-dmsans text-sm text-white/80">
                            <li className="flex items-start gap-3">
                                <Phone
                                    size={16}
                                    strokeWidth={1.7}
                                    color="#EB8A2C"
                                    className="mt-0.5 shrink-0"
                                />
                                <a
                                    href="tel:+918769005504"
                                    className="hover:text-[#EB8A2C] transition-colors"
                                >
                                    +91 87690 05504
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail
                                    size={16}
                                    strokeWidth={1.7}
                                    color="#EB8A2C"
                                    className="mt-0.5 shrink-0"
                                />
                                <a
                                    href="mailto:dramrutagodbole@gmail.com"
                                    className="hover:text-[#EB8A2C] transition-colors break-all"
                                >
                                    dramrutagodbole@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin
                                    size={16}
                                    strokeWidth={1.7}
                                    color="#EB8A2C"
                                    className="mt-0.5 shrink-0"
                                />
                                <span className="leading-relaxed">
                                    Homeo House, 15th Road, Khar West, Mumbai
                                    400052
                                </span>
                            </li>
                            <li className="pt-1 font-dmsans text-xs text-white/55">
                                Mon – Sat · 10:00 AM – 7:00 PM
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-14 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-dmsans text-xs text-white/55 order-2 sm:order-1">
                        © {new Date().getFullYear()} Toothfully Yours. All
                        rights reserved.
                    </p>
                    <p
                        data-testid="footer-credit"
                        className="font-dmsans text-[0.7rem] tracking-wider text-white/45 order-1 sm:order-2"
                    >
                        Designed by{" "}
                        <span className="text-white/75">
                            Cranberry Design House
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
