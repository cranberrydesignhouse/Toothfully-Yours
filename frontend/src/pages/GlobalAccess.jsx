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
    Video,
    ClipboardList,
    Plane,
    Smile,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PackagesCarousel from "@/components/PackagesCarousel";

const HERO_IMG =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/2atd5hyi_global%20access%20hero.png";

const DOCTOR_IMG =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/r7wm2nb4_Dr.%20Amruta.jpg";

const SIGNATURE_TREATMENTS = [
    {
        title: "Cosmetic & Elective",
        copy: "Veneers, smile design, teeth whitening, cosmetic bonding, gum contouring and full mouth aesthetic rehabilitation.",
        img: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/ztin3o2z_cosmetic%20and%20elective%20global.png",
        href: "/cosmetic-aesthetic-care",
    },
    {
        title: "General & Preventative",
        copy: "Dental check-ups, oral examination, professional teeth cleaning, scaling & polishing, gum health assessments.",
        img: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/kdlt7jvi_general%20and%20preventative%20global%20.png",
        href: null,
    },
    {
        title: "Full Mouth Transformation",
        copy: "Dental implants, root canal treatment, crowns, bridges, full-mouth rehabilitation, gum treatment and restorative care.",
        img: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/f1j6sd6t_full%20mouth.png",
        href: "/implants-restoration",
    },
];

const STEPS = [
    {
        icon: Video,
        title: "Consult Remotely",
        copy: "A video consultation with Dr. Amruta to understand what you need before you ever board a flight.",
    },
    {
        icon: ClipboardList,
        title: "Review Your Treatment Plan",
        copy: "A transparent, written plan with timelines, sessions, ideal stay length and a clear estimate.",
    },
    {
        icon: Plane,
        title: "Coordinate Your Travel",
        copy: "We help with airport pickups, partner hotels and a schedule that respects your trip.",
    },
    {
        icon: Smile,
        title: "Start Treatment",
        copy: "Arrive, settle in, and begin. Every visit is sequenced for comfort, recovery and a result that lasts.",
    },
];

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

export default function GlobalAccess() {
    const [bookingOpen, setBookingOpen] = useState(false);

    return (
        <div data-testid="global-access-page" className="bg-white">
            <Navbar onOpenBooking={() => setBookingOpen(true)} />

            {/* 1. HERO */}
            <section
                data-testid="ga-hero"
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
                                Global Access
                            </span>
                            <h1
                                data-testid="ga-headline"
                                className="heading-serif text-[1.55rem] leading-[1.15] sm:text-[1.85rem] md:text-[2.15rem] lg:text-[2.45rem] text-[#1A1A1A]"
                            >
                                Fly In,{" "}
                                <span className="text-[#EB8A2C]">
                                    Smile Out.
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl font-dmsans text-[0.98rem] md:text-[1.05rem] leading-relaxed text-[#5C5C5C]">
                                Expert dental care for international patients.
                                Thoughtfully planned, transparently managed,
                                and designed to make every visit feel seamless
                                from arrival to aftercare.
                            </p>
                            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={() => setBookingOpen(true)}
                                    data-testid="ga-cta-book"
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    Book My Consultation
                                    <ArrowRight size={16} strokeWidth={2} />
                                </button>
                                <a
                                    href="#treatments"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .querySelector("#treatments")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                    data-testid="ga-cta-explore"
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
                                    alt="Global Access at Toothfully Yours"
                                    data-testid="ga-hero-image"
                                    className="circle-photo w-full h-full border-[6px] border-white object-cover object-center"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 2. SIGNATURE TREATMENTS */}
            <section
                id="treatments"
                data-testid="ga-treatments"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 text-center">
                    <Reveal>
                        <span className="section-label">Our Services</span>
                        <h2 className="heading-serif text-[2rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A]">
                            Signature Treatments.
                        </h2>
                        <p className="mt-5 font-dmsans text-[#5C5C5C] text-[0.95rem] md:text-base max-w-xl mx-auto">
                            Three pathways into the practice, each planned
                            around your time and travel.
                        </p>
                    </Reveal>

                    <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-8 md:gap-y-12">
                        {SIGNATURE_TREATMENTS.map((s, i) => {
                            const Inner = (
                                <article
                                    data-testid={`ga-treatment-${i}`}
                                    className={`flex flex-col items-center text-center group h-full ${s.href ? "cursor-pointer" : ""}`}
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-[#EB8A2C]/10 blur-2xl scale-90 group-hover:scale-110 transition-transform duration-500" />
                                        <img
                                            src={s.img}
                                            alt={s.title}
                                            loading="lazy"
                                            className={`circle-photo relative w-44 h-44 md:w-52 md:h-52 border-4 border-white transition-transform duration-500 ${s.href ? "group-hover:scale-[1.03]" : ""}`}
                                        />
                                    </div>
                                    <h3 className={`font-dmsans font-semibold text-[1.05rem] md:text-[1.15rem] text-[#1A1A1A] mt-6 tracking-tight transition-colors ${s.href ? "group-hover:text-[#EB8A2C]" : ""}`}>
                                        {s.title}
                                    </h3>
                                    <p className="mt-3 font-dmsans text-sm text-[#5C5C5C] leading-relaxed max-w-[19rem]">
                                        {s.copy}
                                    </p>
                                </article>
                            );
                            return (
                                <Reveal key={s.title} delay={i * 100}>
                                    {s.href ? (
                                        <Link
                                            to={s.href}
                                            className="block h-full"
                                        >
                                            {Inner}
                                        </Link>
                                    ) : (
                                        Inner
                                    )}
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. CURATED TREATMENT PLANS */}
            <section
                id="packages"
                data-testid="ga-packages"
                className="bg-[#F5F2EF] py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16">
                    <Reveal>
                        <div className="max-w-2xl">
                            <span className="section-label">Our Packages</span>
                            <h2 className="heading-serif text-[2rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A]">
                                Curated Treatment{" "}
                                <span className="text-[#EB8A2C]">Plans.</span>
                            </h2>
                            <p className="mt-5 font-dmsans text-[#5C5C5C] text-[0.95rem] md:text-base leading-relaxed">
                                Transparent treatment plans designed around
                                travel timelines, recovery and long-term
                                results.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={120}>
                        <div className="mt-12 md:mt-16">
                            <PackagesCarousel />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 4. STEP-BY-STEP PROCESS */}
            <section
                data-testid="ga-process"
                className="bg-[#1F1D1B] py-16 md:py-32 text-white"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16">
                    <Reveal>
                        <div className="text-center max-w-2xl mx-auto">
                            <span className="font-dmsans text-[0.72rem] tracking-[0.22em] uppercase text-[#EB8A2C]">
                                Step-by-step Process
                            </span>
                            <h2 className="mt-4 heading-serif text-[2rem] sm:text-4xl md:text-[3.25rem] text-white">
                                Plan Your Treatment{" "}
                                <span className="text-[#EB8A2C]">Journey.</span>
                            </h2>
                            <p className="mt-5 font-dmsans text-white/65 text-[0.95rem] md:text-base">
                                Four quiet steps between your first message and
                                your final smile.
                            </p>
                        </div>
                    </Reveal>

                    <div className="relative mt-14 md:mt-20">
                        {/* Connecting line on desktop */}
                        <div
                            aria-hidden
                            className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-white/15"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
                            {STEPS.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <Reveal key={step.title} delay={i * 110}>
                                        <div
                                            data-testid={`ga-step-${i}`}
                                            className="flex flex-col items-center text-center group"
                                        >
                                            <div className="relative h-[72px] w-[72px] rounded-full bg-[#1F1D1B] border border-white/15 flex items-center justify-center transition-all duration-500 group-hover:border-[#EB8A2C] group-hover:bg-[#EB8A2C]/10">
                                                <Icon
                                                    size={26}
                                                    strokeWidth={1.6}
                                                    className="text-[#EB8A2C] transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[#EB8A2C] text-white font-dmsans text-[0.7rem] font-semibold flex items-center justify-center">
                                                    {i + 1}
                                                </span>
                                            </div>
                                            <h3 className="mt-7 font-dmsans font-semibold text-[1.05rem] md:text-[1.15rem] text-white tracking-tight">
                                                {step.title}
                                            </h3>
                                            <p className="mt-3 font-dmsans text-sm text-white/65 leading-relaxed max-w-[15rem]">
                                                {step.copy}
                                            </p>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. ABOUT THE DOCTOR */}
            <section
                data-testid="ga-about"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                    <div className="md:col-span-7 order-2 md:order-1">
                        <Reveal>
                            <span className="section-label">
                                About Dr. Amruta Godbole
                            </span>
                            <h2 className="heading-serif text-[2rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A]">
                                Tooth be told.
                            </h2>
                            <div className="mt-7 font-dmsans text-[#5C5C5C] text-[0.98rem] md:text-[1.05rem] leading-relaxed space-y-5 max-w-2xl">
                                <p>
                                    Dr. Amruta Godbole has spent two decades
                                    moving between New York and Mumbai. That
                                    rhythm shaped the way the practice works
                                    today, calm, planned, and tuned for
                                    patients arriving from elsewhere.
                                </p>
                                <p>
                                    Every international case begins with a
                                    remote consultation and ends with a clear,
                                    written plan. No surprises. No last-minute
                                    upgrades. Patients fly in knowing exactly
                                    what their visit looks like, and fly out
                                    with work that holds for years.
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
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-full bg-[#F5F2EF] -z-10" />
                                <img
                                    src={DOCTOR_IMG}
                                    alt="Dr. Amruta Godbole"
                                    data-testid="ga-doctor-image"
                                    className="circle-photo w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] mx-auto border-[6px] border-white object-cover object-[center_28%]"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 6. CONTACT — Welcome to Mumbai */}
            <section
                data-testid="ga-contact"
                className="bg-[#F5F2EF] py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                    <div className="md:col-span-6">
                        <Reveal>
                            <span className="section-label">Contact Us</span>
                            <h2 className="heading-serif text-[2rem] sm:text-3xl md:text-[2.6rem] text-[#1A1A1A] leading-tight">
                                Welcome to{" "}
                                <span className="text-[#EB8A2C]">Mumbai.</span>
                            </h2>
                            <p className="mt-5 font-dmsans text-[#5C5C5C] max-w-md leading-relaxed">
                                Planning a trip for treatment? Tell us a
                                little about what you need and roughly when
                                you'd like to arrive. We'll handle the rest,
                                a quick video consult, a clear plan, and a
                                visit that feels effortless.
                            </p>

                            <ul className="mt-10 space-y-6">
                                <ContactRow
                                    icon={Clock}
                                    label="Clinic Hours"
                                    value="Mon – Sat · 10:00 AM – 7:00 PM IST"
                                />
                                <ContactRow
                                    icon={Phone}
                                    label="Phone / WhatsApp"
                                    value="+91 87690 05504"
                                    href="tel:+918769005504"
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

                            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={() => setBookingOpen(true)}
                                    data-testid="ga-contact-cta"
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    Book My Consultation
                                    <ArrowRight size={16} strokeWidth={2} />
                                </button>
                                <a
                                    href="https://wa.me/918769005504"
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid="ga-whatsapp-cta"
                                    className="btn-secondary-dark w-full sm:w-auto"
                                >
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </Reveal>
                    </div>
                    <div className="md:col-span-6">
                        <Reveal delay={120}>
                            <div className="relative rounded-3xl overflow-hidden bg-white border border-black/5 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)]">
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
            />
        </div>
    );
}

const ContactRow = ({ icon: Icon, label, value, href }) => {
    const inner = (
        <>
            <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center shrink-0">
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
