import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Clock,
    Phone,
    Mail,
    MapPin,
    Instagram,
    Linkedin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import CosmeticFaq from "@/components/CosmeticFaq";

const HERO_IMG =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/b23zov3v_cosmetic.jpg";

const DOCTOR_IMG =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/r7wm2nb4_Dr.%20Amruta.jpg";

const POSSIBILITIES = [
    {
        id: "veneers",
        title: "Dental Veneers",
        copy: "Ultra-thin ceramic shells, shaped and shaded to feel like yours.",
        img: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/fbgf7pex_veneers.png",
    },
    {
        id: "smile-design",
        title: "Smile Makeover",
        copy: "A planned, multi-step transformation of your full smile, combining veneers, contouring and whitening.",
        img: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/bgtz4ohb_smile%20makeover.png",
    },
    {
        id: "whitening",
        title: "Teeth Whitening",
        copy: "Safe, in-clinic professional whitening performed by your dentist for a brighter, natural shade.",
        img: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/bsq4qptd_teeth%20whitening.png",
    },
    {
        id: "fillings",
        title: "Tooth Coloured Fillings",
        copy: "Invisible composite fillings that bond, blend and protect.",
        img: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/7ee8l3yt_fillings.png",
    },
];

const TAB_FOR_CARD = {
    veneers: "veneers",
    "smile-design": "smile-design",
    whitening: "whitening",
    fillings: "veneers",
};

const Reveal = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        node.style.transitionDelay = `${delay}ms`;
                        node.classList.add("in");
                        io.unobserve(node);
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
        );
        io.observe(node);
        const t = setTimeout(() => {
            if (node && !node.classList.contains("in")) {
                node.style.transitionDelay = `${delay}ms`;
                node.classList.add("in");
            }
        }, 1800);
        return () => {
            io.disconnect();
            clearTimeout(t);
        };
    }, [delay]);
    return (
        <div ref={ref} className={`reveal ${className}`}>
            {children}
        </div>
    );
};

export default function CosmeticCare() {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("veneers");

    const handleCardClick = (cardId) => {
        setActiveTab(TAB_FOR_CARD[cardId] || "veneers");
        document
            .querySelector("#raw-truth")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div data-testid="cosmetic-care-page" className="bg-white">
            <Navbar onOpenBooking={() => setBookingOpen(true)} />

            {/* 1. HERO */}
            <section
                data-testid="cc-hero"
                className="relative bg-[#F5F2EF] pt-28 md:pt-32 pb-16 md:pb-28"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                    <div className="md:col-span-6">
                        <Reveal>
                            <div className="mb-8">
                                <Link
                                    to="/"
                                    className="font-dmsans text-[0.72rem] tracking-[0.22em] uppercase text-[#5C5C5C] hover:text-[#EB8A2C] transition-colors inline-flex items-center gap-2"
                                >
                                    <span>←</span> Toothfully Yours
                                </Link>
                            </div>
                            <span className="section-label">
                                Cosmetic &amp; Aesthetic Care
                            </span>
                            <h1
                                data-testid="cc-headline"
                                className="heading-serif text-[2.15rem] leading-[1.1] sm:text-[2.4rem] md:text-[2.6rem] lg:text-[2.9rem] text-[#1A1A1A]"
                            >
                                Your smile makeover
                                <br />
                                starts with the{" "}
                                <span className="text-[#EB8A2C]">
                                    right dentist.
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl font-dmsans text-[0.85rem] md:text-[1.05rem] leading-relaxed text-[#5C5C5C]">
                                Every Cosmetic &amp; Aesthetic procedure
                                crafted with precision, every result built to
                                last.
                            </p>
                            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={() => setBookingOpen(true)}
                                    data-testid="cc-cta-book"
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    Book My Consultation
                                    <ArrowRight size={16} strokeWidth={2} />
                                </button>
                                <a
                                    href="#possibilities"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .querySelector("#possibilities")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                    data-testid="cc-cta-explore"
                                    className="btn-secondary-dark w-full sm:w-auto"
                                >
                                    Explore My Options
                                </a>
                            </div>
                        </Reveal>
                    </div>
                    <div className="md:col-span-6 flex justify-center">
                        <Reveal delay={120}>
                            <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[300px] md:h-[300px] lg:w-[440px] lg:h-[440px]">
                                <div className="absolute -inset-5 rounded-full bg-white -z-10" />
                                <img
                                    src={HERO_IMG}
                                    alt="Cosmetic & Aesthetic Care at Toothfully Yours"
                                    data-testid="cc-hero-image"
                                    className="circle-photo w-full h-full border-[6px] border-white object-cover object-top"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 2. WHAT'S POSSIBLE */}
            <section
                id="possibilities"
                data-testid="cc-possibilities"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 text-left md:text-center">
                    <Reveal>
                        <span className="section-label">
                            Cosmetic &amp; Aesthetic Care
                        </span>
                        <h2 className="heading-serif text-[2.25rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A]">
                            What's possible?
                        </h2>
                        <p className="mt-5 font-dmsans text-[#5C5C5C] text-[0.95rem] md:text-base max-w-xl md:mx-auto">
                            Tap any procedure to see real outcomes from the
                            practice.
                        </p>
                    </Reveal>

                    <div className="mt-12 md:mt-16 -mx-5 md:mx-0 px-5 md:px-0 flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 scrollbar-none">
                        {POSSIBILITIES.map((s, i) => (
                            <Reveal
                                key={s.id}
                                delay={i * 90}
                                className="snap-start shrink-0 md:shrink w-[78%] sm:w-[60%] md:w-auto"
                            >
                                <button
                                    type="button"
                                    onClick={() => handleCardClick(s.id)}
                                    data-testid={`cc-card-${s.id}`}
                                    className="flex flex-col items-center text-center group cursor-pointer w-full"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-[#EB8A2C]/10 blur-2xl scale-90 group-hover:scale-110 transition-transform duration-500" />
                                        <img
                                            src={s.img}
                                            alt={s.title}
                                            loading="lazy"
                                            className="circle-photo relative w-40 h-40 md:w-48 md:h-48 border-4 border-white group-hover:scale-[1.03] transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="font-dmsans font-semibold text-[1.05rem] md:text-[1.15rem] text-[#1A1A1A] mt-6 tracking-tight group-hover:text-[#EB8A2C] transition-colors">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2 font-dmsans text-sm text-[#5C5C5C] leading-snug max-w-[17rem]">
                                        {s.copy}
                                    </p>
                                </button>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. THE RAW TRUTH */}
            <section
                id="raw-truth"
                data-testid="cc-raw-truth"
                className="bg-[#F5F2EF] py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16">
                    <Reveal>
                        <div className="text-left md:text-center max-w-2xl mx-auto">
                            <span className="section-label">
                                Results We Are Proud Of
                            </span>
                            <h2 className="heading-serif text-[2.25rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A] tracking-[-0.02em] [word-spacing:-0.08em]">
                                The Raw{" "}
                                <span className="text-[#EB8A2C]">Truth.</span>
                            </h2>
                            <p className="mt-5 font-dmsans text-[#5C5C5C] text-[0.95rem] md:text-base">
                                Real transformations from the chair.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="mt-12 md:mt-16">
                            <BeforeAfterGallery
                                activeId={activeTab}
                                onTabChange={setActiveTab}
                            />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 4. ABOUT THE DOCTOR */}
            <section
                data-testid="cc-about"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                    <div className="md:col-span-7 order-2 md:order-1">
                        <Reveal>
                            <span className="section-label">
                                About Dr. Amruta Godbole
                            </span>
                            <h2 className="heading-serif text-[2.25rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A]">
                                Tooth be told.
                            </h2>
                            <div className="mt-7 font-dmsans text-[#5C5C5C] text-[0.98rem] md:text-[1.05rem] leading-relaxed space-y-5 max-w-2xl">
                                <p>
                                    Dr. Amruta Godbole has spent two decades
                                    moving between New York and Mumbai, refining
                                    one of the most demanding crafts in
                                    modern dentistry, making a cosmetic result
                                    look like it was always there.
                                </p>
                                <p>
                                    Her training in advanced aesthetics and
                                    her work with the Academy of Cosmetic
                                    Dentistry (an affiliate of the AACD) means
                                    every smile design begins long before the
                                    drill, with study models, photographs,
                                    shade-mapping and a face-led plan. Patients
                                    walk in for veneers and walk out feeling
                                    like the better version of themselves they
                                    recognise.
                                </p>
                            </div>

                            <div className="mt-9 flex flex-wrap gap-2.5">
                                {[
                                    "NYU DDS, 2010",
                                    "ADA",
                                    "IDA",
                                    "Academy of Cosmetic Dentistry · AACD Affiliate",
                                ].map((chip) => (
                                    <span
                                        key={chip}
                                        className="font-dmsans text-xs tracking-wider uppercase px-3.5 py-2 rounded-full border border-[#EB8A2C]/40 text-[#EB8A2C]"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                    <div className="md:col-span-5 order-1 md:order-2">
                        <Reveal delay={120}>
                            <div className="relative w-fit mx-auto">
                                <div className="absolute -inset-4 rounded-full bg-[#F5F2EF] -z-10" />
                                <img
                                    src={DOCTOR_IMG}
                                    alt="Dr. Amruta Godbole"
                                    data-testid="cc-doctor-image"
                                    className="circle-photo w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] border-[6px] border-white object-cover object-[center_28%]"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 5. FAQ */}
            <section
                data-testid="cc-faq"
                className="bg-[#F5F2EF] py-16 md:py-32"
            >
                <div className="max-w-3xl mx-auto px-5 md:px-12 lg:px-8">
                    <Reveal>
                        <div className="text-left md:text-center">
                            <span className="section-label">
                                Frequently Asked Questions
                            </span>
                            <h2 className="heading-serif text-[2.25rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A]">
                                Let's fill those{" "}
                                <span className="text-[#EB8A2C]">gaps.</span>
                            </h2>
                        </div>
                    </Reveal>
                    <Reveal delay={120}>
                        <div className="mt-12 md:mt-14">
                            <CosmeticFaq />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 6. CONTACT */}
            <section
                data-testid="cc-contact"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                    <div className="md:col-span-6">
                        <Reveal>
                            <span className="section-label">Contact Us</span>
                            <h2 className="heading-serif text-[2rem] sm:text-3xl md:text-[2.6rem] text-[#1A1A1A] leading-tight">
                                We'd love to{" "}
                                <span className="text-[#EB8A2C]">meet you.</span>
                            </h2>
                            <p className="mt-5 font-dmsans text-[#5C5C5C] max-w-md leading-relaxed">
                                Curious about veneers, whitening, or a full
                                smile design? Walk in for a consult, no
                                pressure, all options on the table.
                            </p>

                            <ul className="mt-10 space-y-6">
                                <ContactRow
                                    icon={Clock}
                                    label="Clinic Hours"
                                    value="Mon – Sat · 10:00 AM – 7:00 PM"
                                />
                                <ContactRow
                                    icon={Phone}
                                    label="Phone"
                                    value="+91 97690 05504"
                                    href="tel:+919769005504"
                                />
                                <ContactRow
                                    icon={Mail}
                                    label="Email"
                                    value="dramrutagodbole@gmail.com"
                                    href="mailto:dramrutagodbole@gmail.com"
                                />
                                <ContactRow
                                    icon={MapPin}
                                    label="Address"
                                    value="Homeo House, 15th Road, Khar West, Mumbai 400052"
                                />
                            </ul>

                            <div className="mt-10 flex items-center gap-3">
                                <a
                                    href="https://instagram.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Instagram"
                                    className="h-11 w-11 rounded-full border border-[#EB8A2C]/40 text-[#EB8A2C] flex items-center justify-center hover:bg-[#EB8A2C] hover:text-white transition-colors"
                                >
                                    <Instagram size={18} strokeWidth={1.6} />
                                </a>
                                <a
                                    href="https://linkedin.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn"
                                    className="h-11 w-11 rounded-full border border-[#EB8A2C]/40 text-[#EB8A2C] flex items-center justify-center hover:bg-[#EB8A2C] hover:text-white transition-colors"
                                >
                                    <Linkedin size={18} strokeWidth={1.6} />
                                </a>
                            </div>

                            <button
                                type="button"
                                onClick={() => setBookingOpen(true)}
                                data-testid="cc-contact-cta"
                                className="btn-primary mt-10 w-full sm:w-auto"
                            >
                                Book My Consultation
                                <ArrowRight size={16} strokeWidth={2} />
                            </button>
                        </Reveal>
                    </div>
                    <div className="md:col-span-6">
                        <Reveal delay={120}>
                            <div className="relative rounded-3xl overflow-hidden bg-[#F5F2EF] border border-black/5 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)]">
                                <iframe
                                    title="Toothfully Yours clinic location"
                                    src="https://www.google.com/maps?q=Toothfully+Yours+Dental+Care+Homeo+House+15th+Road+Khar+West+Mumbai&output=embed"
                                    width="100%"
                                    height="380"
                                    style={{ border: 0, display: "block" }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                    className="md:!h-[520px]"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <Footer />

            <BookingModal
                open={bookingOpen}
                onClose={() => setBookingOpen(false)}
                defaultService="Cosmetic & Aesthetic Care"
            />
        </div>
    );
}

const ContactRow = ({ icon: Icon, label, value, href }) => {
    const inner = (
        <>
            <div className="h-11 w-11 rounded-full bg-[#F5F2EF] flex items-center justify-center shrink-0">
                <Icon size={18} strokeWidth={1.6} color="#EB8A2C" />
            </div>
            <div>
                <p className="font-dmsans text-[0.72rem] tracking-[0.18em] uppercase text-[#EB8A2C]">
                    {label}
                </p>
                <p className="mt-1 font-dmsans text-[#1A1A1A] text-[0.98rem] leading-relaxed">
                    {value}
                </p>
            </div>
        </>
    );
    return (
        <li className="flex items-start gap-4">
            {href ? (
                <a
                    href={href}
                    className="flex items-start gap-4 hover:opacity-80 transition-opacity"
                >
                    {inner}
                </a>
            ) : (
                inner
            )}
        </li>
    );
};
