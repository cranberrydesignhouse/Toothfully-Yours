import { useEffect, useRef, useState } from "react";
import {
    GraduationCap,
    Activity,
    Hand,
    HeartHandshake,
    Languages,
    Clock,
    Phone,
    Mail,
    MapPin,
    Instagram,
    Linkedin,
    Star,
    ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import GalleryCarousel from "@/components/GalleryCarousel";

const IMG = {
    hero: "https://images.unsplash.com/photo-1662837625421-5fd8ed6131a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwzfHxkZW50aXN0JTIwdHJlYXRpbmclMjBwYXRpZW50JTIwbW9kZXJuJTIwY2xpbmljfGVufDB8fHx8MTc3OTM1MTM2OHww&ixlib=rb-4.1.0&q=85",
    doctor: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/3izcsf0q_de1aeb63-8b3a-4c3c-8f8f-2445283a1c69.JPG",
    services: [
        "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/cxdgduas_T%20cosmetic%20image.jpg",
        "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/gjc4aqb9_RESTORATIVE%20tv.jpg",
        "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/hgm3tltf_alignemnt%20TY.jpg",
        "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/9rrz4g9h_TMJ.jpg",
    ],
    team: [
        "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/d1ptotq3_Dr.%20Manish%20Kachhara.png",
        "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/58hir0cg_image.png",
        "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/n84xg6ne_Dr.%20Paras%20Kothari.jpg",
    ],
    gallery: [
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/w76lxasr_happy-smiles-15.webp",
            pos: "50% 30%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/0lt9d93r_happy-smiles-6.webp",
            pos: "50% 25%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/x16srlj0_happy-smiles-8.webp",
            pos: "62% 18%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/6ahoqdmo_happy-smiles-3.webp",
            pos: "50% 22%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/5kn1bway_happy-smiles-2%20copy.jpg",
            pos: "50% 18%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/jf4w2vhu_happy-smiles-4%20copy.jpg",
            pos: "50% 22%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/pwmpesji_happy-smiles-7%20copy.jpg",
            pos: "50% 35%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/vtjot904_happy-smiles-11%20copy.jpg",
            pos: "50% 30%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/b6v1339i_happy-smiles-18%20copy.jpg",
            pos: "50% 35%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/450lfsga_happy-smiles-10.jpg",
            pos: "50% 22%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/1352cymq_happy-smiles-16.jpg",
            pos: "50% 25%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/9pzucz03_happy-smiles-17.jpg",
            pos: "50% 25%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/2jrgncoo_happy-smiles-21.jpg",
            pos: "50% 25%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/38stcvur_happy-smiles-23.jpg",
            pos: "50% 30%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/5ebsdfid_happy-smiles-26.jpg",
            pos: "50% 25%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/u6mx2190_happy-smiles-27.jpg",
            pos: "50% 40%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/ll2i0mkx_happy-smiles-29.jpg",
            pos: "50% 25%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/wm8k64lh_CCE184C7-DF3E-47BE-8E60-43AD7C6518E3.JPG",
            pos: "50% 30%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/c4hycjsb_happy-smiles-19.jpg",
            pos: "50% 22%",
        },
        {
            src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/5fgo7p2m_happy-smiles-20.jpg",
            pos: "50% 30%",
        },
    ],
};

const HERO_VIDEO =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/92an86dq_TY%20hero%20section%20video.mp4";

const ADDRESS_TEXT =
    "Homeo House, 15th Road, Diagonally Opp. Lane to Starbucks (Red Chillies Bldg.), Khar West, Mumbai, Maharashtra 400052";
const MAP_EMBED_SRC =
    "https://www.google.com/maps?q=Toothfully+Yours+Dental+Care+Homeo+House+15th+Road+Khar+West+Mumbai&output=embed";
const MAP_DIRECTIONS_URL = "https://maps.app.goo.gl/ewPtPEuq9jfuq8Ea7";
const GOOGLE_REVIEWS_URL = "https://share.google/CUmUWCUzr3muFYeo4";

const SERVICES = [
    {
        title: "Cosmetic & Aesthetic Care",
        tags: [
            "Veneers",
            "Smile Design",
            "Teeth Whitening",
            "Contouring",
            "Full-mouth Rehabilitation",
        ],
        img: IMG.services[0],
    },
    {
        title: "Implants & Restoration",
        tags: [
            "Dental Implants",
            "Root Canal",
            "Crowns",
            "Bridges",
            "Fillings",
            "Preventive Care",
        ],
        img: IMG.services[1],
    },
    {
        title: "Corrective Alignment",
        tags: [
            "Metal Braces",
            "Ceramic Braces",
            "Invisalign",
            "Clear Aligners for Teens",
            "Clear Aligners for Adults",
        ],
        img: IMG.services[2],
    },
    {
        title: "Neuromuscular Dentistry",
        tags: [
            "Sleep Apnea",
            "TMJ Dysfunction",
            "Snoring",
            "Facial Pain",
            "Oral Appliance Therapy",
        ],
        img: IMG.services[3],
    },
];

const VALUES = [
    {
        icon: GraduationCap,
        title: "Global Training",
        copy: "Held to the highest global standards.",
    },
    {
        icon: Activity,
        title: "Advancing Practice",
        copy: "Techniques that are current, tested, continuously refined.",
    },
    {
        icon: Hand,
        title: "Craft & Precision",
        copy: "Every procedure taken personally.",
    },
    {
        icon: HeartHandshake,
        title: "Complete Care",
        copy: "One practice, nothing fragmented.",
    },
    {
        icon: Languages,
        title: "Multi-Culture",
        copy: "Four languages, zero ambiguity, nothing unexplained.",
    },
];

const TEAM = [
    {
        name: "Dr. Manish Kachhara",
        role: "Oral Implantologist",
        img: IMG.team[0],
    },
    {
        name: "Dr. Prasad GSV",
        role: "MDS, Oral & Maxillofacial Surgery",
        img: IMG.team[1],
    },
    {
        name: "Dr. Paras Kothari",
        role: "MDS, Micro-Endodontist",
        img: IMG.team[2],
    },
];

const TESTIMONIALS_REMOVED = null; // testimonials now live in TestimonialsCarousel component


// Reveal-on-scroll wrapper with safety fallback
const Reveal = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        node.style.transitionDelay = `${delay}ms`;
                        node.classList.add("in");
                        io.unobserve(node);
                    }
                });
            },
            { threshold: 0.04, rootMargin: "0px 0px -5% 0px" },
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

export default function Landing() {
    const [bookingOpen, setBookingOpen] = useState(false);
    const openBooking = () => setBookingOpen(true);
    const closeBooking = () => setBookingOpen(false);

    return (
        <div data-testid="landing-page" className="bg-white">
            <Navbar onOpenBooking={openBooking} />

            {/* HERO */}
            <section
                id="hero"
                data-testid="section-hero"
                className="relative bg-white pt-24 md:pt-32 pb-16 md:pb-28"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                    <div className="md:col-span-6 lg:col-span-6">
                        <Reveal>
                            <span className="section-label">
                                Toothfully Yours
                            </span>
                            <h1
                                data-testid="hero-headline"
                                className="heading-serif text-[1.85rem] leading-[1.1] sm:text-[2.3rem] md:text-[2.7rem] lg:text-[3.1rem] text-[#1A1A1A]"
                            >
                                Every version of you deserves a{" "}
                                <span className="text-[#EB8A2C]">
                                    great smile.
                                </span>
                            </h1>
                            <p
                                data-testid="hero-subheadline"
                                className="mt-5 max-w-xl font-dmsans text-[0.95rem] md:text-[1.05rem] leading-relaxed text-[#5C5C5C]"
                            >
                                Cosmetic and Comprehensive Dentistry,
                                designed around you — by Dr. Amruta Godbole, in
                                the heart of Khar West, Mumbai.
                            </p>
                            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={openBooking}
                                    data-testid="hero-cta-book"
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    Book My Consultation
                                    <ArrowRight size={16} strokeWidth={2} />
                                </button>
                                <a
                                    href="#services"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .querySelector("#services")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                    data-testid="hero-cta-explore"
                                    className="btn-secondary-dark w-full sm:w-auto"
                                >
                                    Explore Services
                                </a>
                            </div>

                            {/* Trust strip — stats row */}
                            <div className="mt-9 flex items-stretch gap-5 sm:gap-7">
                                <div data-testid="trust-experience" className="text-left">
                                    <p className="font-dmsans font-bold text-[1.5rem] md:text-[1.85rem] text-[#1A1A1A] leading-none tracking-tight">
                                        20+
                                    </p>
                                    <p className="mt-2 font-dmsans text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase text-[#5C5C5C] leading-tight">
                                        Years Experience
                                    </p>
                                </div>
                                <span className="block w-px self-stretch bg-black/12" />
                                <a
                                    href={GOOGLE_REVIEWS_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid="trust-google-reviews"
                                    className="text-left group"
                                >
                                    <p className="font-dmsans font-bold text-[1.5rem] md:text-[1.85rem] text-[#1A1A1A] leading-none tracking-tight inline-flex items-center gap-1">
                                        5
                                        <Star
                                            size={20}
                                            fill="#EB8A2C"
                                            color="#EB8A2C"
                                            strokeWidth={0}
                                            className="translate-y-[-1px]"
                                        />
                                    </p>
                                    <p className="mt-2 font-dmsans text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase text-[#5C5C5C] leading-tight group-hover:text-[#EB8A2C] transition-colors inline-flex items-center gap-1.5">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-[0.85rem] w-auto shrink-0"
                                            aria-label="Google"
                                        >
                                            <path
                                                fill="#4285F4"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                                            />
                                        </svg>
                                        Rating
                                    </p>
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    <div className="md:col-span-6 lg:col-span-6 relative">
                        <Reveal delay={120}>
                            <div className="relative">
                                <div className="absolute -inset-3 md:-inset-5 rounded-[40px] bg-[#F5F2EF] -z-10" />
                                <video
                                    src={HERO_VIDEO}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    data-testid="hero-video"
                                    className="w-full h-[340px] sm:h-[420px] md:h-[560px] object-cover rounded-[28px] md:rounded-[32px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] bg-[#F5F2EF]"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section
                id="services"
                data-testid="section-services"
                className="bg-[#F5F2EF] py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 text-center">
                    <Reveal>
                        <span className="section-label">Our Services</span>
                        <h2 className="heading-serif text-[2rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A] max-w-2xl mx-auto">
                            Solutions that adapt to you.
                        </h2>
                    </Reveal>

                    <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
                        {SERVICES.map((s, i) => (
                            <Reveal key={s.title} delay={i * 100}>
                                <article
                                    data-testid={`service-card-${i}`}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-[#EB8A2C]/10 blur-2xl scale-90 group-hover:scale-110 transition-transform duration-500" />
                                        <img
                                            src={s.img}
                                            alt={s.title}
                                            className="circle-photo relative w-44 h-44 md:w-52 md:h-52 border-4 border-white"
                                        />
                                    </div>
                                    <h3 className="font-dmsans font-semibold text-[1.05rem] md:text-[1.15rem] text-[#1A1A1A] mt-6 tracking-tight">
                                        {s.title}
                                    </h3>
                                    <ul className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-[19rem]">
                                        {s.tags.map((tag) => (
                                            <li key={tag}>
                                                <span
                                                    data-testid={`service-tag-${tag.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                                                    className="inline-block font-dmsans text-[0.72rem] tracking-tight text-[#5C5C5C] bg-white border border-black/8 rounded-full px-2.5 py-1 hover:border-[#EB8A2C] hover:text-[#EB8A2C] transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section
                id="about"
                data-testid="section-about"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                    <div className="md:col-span-7 order-2 md:order-1">
                        <Reveal>
                            <span className="section-label">
                                About Dr. Amruta Godbole
                            </span>
                            <h2 className="heading-serif text-4xl sm:text-5xl md:text-[3.25rem] text-[#1A1A1A]">
                                Toothfully speaking.
                            </h2>
                            <div className="mt-7 font-dmsans text-[#5C5C5C] text-base md:text-[1.05rem] leading-relaxed space-y-5 max-w-2xl">
                                <p>
                                    Dr. Amruta Godbole is a Mumbai-born,
                                    NYU-trained dentist with over a decade of
                                    clinical experience across two continents.
                                    She earned her DDS from NYU College of
                                    Dentistry in 2010, served as a teaching
                                    assistant, and completed a specialised
                                    aesthetics program before building a
                                    practice in New York and returning to
                                    Mumbai.
                                </p>
                                <p>
                                    Her focus spans smile design, ceramic
                                    veneers, implants, and restorative care.
                                    She holds membership with the ADA, IDA, and
                                    Academy of Cosmetic Dentistry (an affiliate
                                    of the American Academy of Cosmetic
                                    Dentistry). At Toothfully Yours, patients
                                    feel this standard of care from their very
                                    first consultation.
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
                                    src={IMG.doctor}
                                    alt="Dr. Amruta Godbole"
                                    data-testid="about-doctor-image"
                                    className="circle-photo w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] mx-auto border-[6px] border-white object-cover"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* VALUES */}
            <section
                id="values"
                data-testid="section-values"
                className="bg-[#545454] text-white py-24 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <Reveal>
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="section-label">Our Values</span>
                            <h2 className="heading-serif text-4xl sm:text-5xl md:text-[3.25rem] text-white">
                                Rooted in{" "}
                                <span className="text-[#EB8A2C]">care.</span>
                            </h2>
                            <p className="mt-5 font-dmsans text-white/70 text-base md:text-lg max-w-xl mx-auto">
                                Five principles that shape every appointment,
                                every procedure, every conversation.
                            </p>
                        </div>
                    </Reveal>

                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {VALUES.slice(0, 3).map((v, i) => (
                            <Reveal key={v.title} delay={i * 90}>
                                <ValueCard {...v} testId={`value-card-${i}`} />
                            </Reveal>
                        ))}
                    </div>
                    <div className="mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:max-w-3xl lg:mx-auto">
                        {VALUES.slice(3).map((v, i) => (
                            <Reveal key={v.title} delay={i * 90}>
                                <ValueCard
                                    {...v}
                                    testId={`value-card-${i + 3}`}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section
                id="team"
                data-testid="section-team"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 text-center">
                    <Reveal>
                        <span className="section-label">Meet the Team</span>
                        <h2 className="heading-serif text-[2rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A]">
                            You're in{" "}
                            <span className="text-[#EB8A2C]">good</span> hands.
                        </h2>
                    </Reveal>

                    <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                        {TEAM.map((m, i) => (
                            <Reveal key={m.name} delay={i * 100}>
                                <article
                                    data-testid={`team-card-${i}`}
                                    className="flex flex-col items-center group"
                                >
                                    <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-full border-4 border-white shadow-xl bg-[#F5F2EF] overflow-hidden circle-photo">
                                        <img
                                            src={m.img}
                                            alt={m.name}
                                            className="w-full h-full object-cover"
                                            style={{
                                                objectPosition:
                                                    i === 1
                                                        ? "50% 30%"
                                                        : "50% 15%",
                                            }}
                                        />
                                    </div>
                                    <h3 className="font-dmsans font-semibold text-[1.05rem] md:text-[1.1rem] text-[#1A1A1A] mt-6 tracking-tight">
                                        {m.name}
                                    </h3>
                                    <p className="mt-1.5 font-dmsans text-xs tracking-wider text-[#EB8A2C]">
                                        {m.role}
                                    </p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section
                id="testimonials"
                data-testid="section-testimonials"
                className="bg-[#F5F2EF] py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16">
                    <Reveal>
                        <div className="text-center max-w-2xl mx-auto">
                            <span className="section-label">Testimonials</span>
                            <h2 className="heading-serif text-[2rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A]">
                                The Tooth{" "}
                                <span className="text-[#EB8A2C]">Speaks.</span>
                            </h2>
                            <p className="mt-4 font-dmsans text-[#5C5C5C] text-[0.95rem] md:text-base">
                                Real, verified reviews from our Google
                                Business profile.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="mt-10 md:mt-14">
                            <TestimonialsCarousel />
                        </div>

                        <div className="mt-10 text-center">
                            <a
                                href={GOOGLE_REVIEWS_URL}
                                target="_blank"
                                rel="noreferrer"
                                data-testid="testimonials-google-link"
                                className="inline-flex items-center gap-2 font-dmsans text-sm text-[#EB8A2C] hover:underline"
                            >
                                Read all reviews on Google →
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* GALLERY */}
            <section
                id="gallery"
                data-testid="section-gallery"
                className="bg-[#E9E2DB] py-16 md:py-32"
            >
                <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-16">
                    <Reveal>
                        <div className="text-center max-w-2xl mx-auto">
                            <span className="section-label">Happy Smiles</span>
                            <h2 className="heading-serif text-[2rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A]">
                                Unfiltered.
                            </h2>
                            <p className="mt-4 font-dmsans text-[#5C5C5C] text-[0.95rem] md:text-base">
                                Real patients, candid moments, warm light.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="mt-10 md:mt-14 max-w-[920px] mx-auto">
                            <GalleryCarousel
                                items={IMG.gallery}
                                perPage={6}
                            />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CONTACT */}
            <section
                id="contact"
                data-testid="section-contact"
                className="bg-white py-24 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-16">
                    {/* Left: info */}
                    <div className="md:col-span-5">
                        <Reveal>
                            <span className="section-label">Contact Us</span>
                            <h2 className="heading-serif text-3xl sm:text-4xl md:text-[2.6rem] text-[#1A1A1A] leading-tight">
                                We'd love to{" "}
                                <span className="text-[#EB8A2C]">
                                    meet you.
                                </span>
                            </h2>
                            <p className="mt-5 font-dmsans text-[#5C5C5C] max-w-md leading-relaxed">
                                Drop us a note and we'll find a time that suits
                                you. Walk-ins welcome by appointment.
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
                                    value="+91 87690 05504"
                                    href="tel:+918769005504"
                                    testId="contact-phone"
                                />
                                <ContactRow
                                    icon={Mail}
                                    label="Email"
                                    value="dramrutagodbole@gmail.com"
                                    href="mailto:dramrutagodbole@gmail.com"
                                    testId="contact-email"
                                />
                                <ContactRow
                                    icon={MapPin}
                                    label="Address"
                                    value={ADDRESS_TEXT}
                                />
                            </ul>

                            <div className="mt-10 flex items-center gap-3">
                                <a
                                    href="https://instagram.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid="social-instagram"
                                    aria-label="Instagram"
                                    className="h-11 w-11 rounded-full border border-[#EB8A2C]/40 text-[#EB8A2C] flex items-center justify-center hover:bg-[#EB8A2C] hover:text-white transition-colors"
                                >
                                    <Instagram size={18} strokeWidth={1.6} />
                                </a>
                                <a
                                    href="https://linkedin.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid="social-linkedin"
                                    aria-label="LinkedIn"
                                    className="h-11 w-11 rounded-full border border-[#EB8A2C]/40 text-[#EB8A2C] flex items-center justify-center hover:bg-[#EB8A2C] hover:text-white transition-colors"
                                >
                                    <Linkedin size={18} strokeWidth={1.6} />
                                </a>
                            </div>

                            <button
                                type="button"
                                onClick={openBooking}
                                data-testid="contact-cta-book"
                                className="btn-primary mt-10 w-full sm:w-auto"
                            >
                                Book My Consultation
                                <ArrowRight size={16} strokeWidth={2} />
                            </button>
                        </Reveal>
                    </div>

                    {/* Right: Map */}
                    <div className="md:col-span-7">
                        <Reveal delay={120}>
                            <div
                                data-testid="contact-map"
                                className="relative rounded-3xl overflow-hidden bg-[#F5F2EF] border border-black/5 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)]"
                            >
                                <iframe
                                    title="Toothfully Yours clinic location"
                                    src={MAP_EMBED_SRC}
                                    width="100%"
                                    height="380"
                                    style={{ border: 0, display: "block" }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                    className="md:!h-[520px]"
                                />
                                <a
                                    href={MAP_DIRECTIONS_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid="contact-directions"
                                    className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-white/95 backdrop-blur rounded-full px-4 py-2 shadow-md font-dmsans text-sm text-[#1A1A1A] hover:text-[#EB8A2C] transition-colors"
                                >
                                    <MapPin size={14} color="#EB8A2C" />
                                    Get Directions
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <Footer />

            <BookingModal open={bookingOpen} onClose={closeBooking} />
        </div>
    );
}

const ValueCard = ({ icon: Icon, title, copy, testId }) => (
    <div
        data-testid={testId}
        className="h-full bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07] hover:border-[#EB8A2C]/40 hover:-translate-y-1"
    >
        <div className="h-12 w-12 rounded-full border border-[#EB8A2C]/40 flex items-center justify-center mb-6">
            <Icon size={22} strokeWidth={1.6} color="#EB8A2C" />
        </div>
        <h3 className="font-dmsans font-semibold text-base md:text-[1.05rem] text-white tracking-tight">
            {title}
        </h3>
        <p className="mt-2 font-dmsans text-sm text-white/70 leading-relaxed">
            {copy}
        </p>
    </div>
);

const ContactRow = ({ icon: Icon, label, value, href, testId }) => {
    const content = (
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
                    data-testid={testId}
                    className="flex items-start gap-4 hover:opacity-80 transition-opacity"
                >
                    {content}
                </a>
            ) : (
                content
            )}
        </li>
    );
};
