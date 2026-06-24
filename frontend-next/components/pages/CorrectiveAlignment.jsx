"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
import SeoSchema from "@/components/SeoSchema";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import CredentialBadges from "@/components/CredentialBadges";
import AlignmentGallery from "@/components/AlignmentGallery";
import AlignmentFaq from "@/components/AlignmentFaq";

const HERO_IMG =
    "/images/invalisgn-hero.webp";

const DOCTOR_IMG =
    "/images/dr-amruta.webp";

// PLACEHOLDER service images using existing patient portraits.
// Replace with treatment-specific aligner and braces images once supplied.
const SERVICES = [
    {
        id: "clear-aligners",
        title: "Clear Aligners",
        copy: "Nearly invisible, removable, and quietly transformative. Designed around your lifestyle, not the other way around.",
        img: "/images/invisalign.webp",
    },
    {
        id: "dental-braces",
        title: "Dental Braces",
        copy: "The most reliable way to move teeth, refined with modern brackets that are smaller, smoother and far more comfortable than they used to be.",
        img: "/images/braces.webp",
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

export default function CorrectiveAlignment() {
    const [bookingOpen, setBookingOpen] = useState(false);

    const handleCardClick = () => {
        document
            .querySelector("#raw-truth")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div data-testid="corrective-alignment-page" className="bg-white">
            <SeoSchema page="alignment" />
            <Navbar onOpenBooking={() => setBookingOpen(true)} />

            {/* 1. HERO */}
            <section
                data-testid="ca-hero"
                className="relative bg-[#F5F2EF] pt-28 md:pt-32 pb-16 md:pb-28"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                    <div className="md:col-span-6">
                        <Reveal>
                            <div className="mb-8">
                                <Link
                                    href="/"
                                    className="font-dmsans text-[0.72rem] tracking-[0.22em] uppercase text-[#5C5C5C] hover:text-[#EB8A2C] transition-colors inline-flex items-center gap-2"
                                >
                                    <span>←</span> Toothfully Yours
                                </Link>
                            </div>
                            <span className="section-label">
                                Corrective Alignment
                            </span>
                            <h1
                                data-testid="ca-headline"
                                className="heading-serif text-[2.15rem] leading-[1.1] sm:text-[2.4rem] md:text-[2.6rem] lg:text-[2.9rem] text-[#1A1A1A]"
                            >
                                <span className="md:hidden">
                                    Tailored to your
                                    <br />
                                    timeline and
                                    <br />
                                    <span className="text-[#EB8A2C]">
                                        lifestyle.
                                    </span>
                                </span>
                                <span className="hidden md:inline">
                                    Tailored to your timeline
                                    <br />
                                    and{" "}
                                    <span className="text-[#EB8A2C]">
                                        lifestyle.
                                    </span>
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl font-dmsans text-[0.85rem] md:text-[1.05rem] leading-relaxed text-[#5C5C5C]">
                                Invisalign and orthodontic treatment
                                thoughtfully planned to fit your routine, your
                                comfort, and the smile you're growing into.
                            </p>
                            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={() => setBookingOpen(true)}
                                    data-testid="ca-cta-book"
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
                                    data-testid="ca-cta-explore"
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
                                    alt="Invisalign and clear aligners in Khar West, Mumbai – certified Invisalign provider at Toothfully Yours"
                                    data-testid="ca-hero-image"
                                    className="circle-photo w-full h-full border-[6px] border-white object-cover object-center" loading="eager" fetchPriority="high" />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 2. GET IN LINE */}
            <section
                id="services"
                data-testid="ca-services"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 text-left md:text-center">
                    <Reveal>
                        <span className="section-label">
                            Corrective Alignment
                        </span>
                        <h2 className="heading-serif text-[2.25rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A]">
                            Get in <span className="text-[#EB8A2C]">line.</span>
                        </h2>
                        <p className="mt-5 font-dmsans text-[#5C5C5C] text-[0.95rem] md:text-base max-w-xl md:mx-auto">
                            Tap a treatment to see real outcomes from the
                            practice.
                        </p>
                    </Reveal>

                    <div className="mt-12 md:mt-16 -mx-5 md:mx-0 px-5 md:px-0 flex md:grid md:grid-cols-2 gap-6 md:gap-14 md:max-w-3xl md:mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 scrollbar-none">
                        {SERVICES.map((s, i) => (
                            <Reveal
                                key={s.id}
                                delay={i * 90}
                                className="snap-start shrink-0 md:shrink w-[78%] sm:w-[60%] md:w-auto"
                            >
                                <button
                                    type="button"
                                    onClick={handleCardClick}
                                    data-testid={`ca-card-${s.id}`}
                                    className="flex flex-col items-center text-center group cursor-pointer w-full"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-[#EB8A2C]/10 blur-2xl scale-90 group-hover:scale-110 transition-transform duration-500" />
                                        <img
                                            src={s.img}
                                            alt={s.title}
                                            loading="lazy"
                                            className="circle-photo relative w-44 h-44 md:w-52 md:h-52 border-4 border-white group-hover:scale-[1.03] transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="font-dmsans font-semibold text-[1.05rem] md:text-[1.15rem] text-[#1A1A1A] mt-6 tracking-tight group-hover:text-[#EB8A2C] transition-colors">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2 font-dmsans text-sm text-[#5C5C5C] leading-snug max-w-[18rem]">
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
                data-testid="ca-raw-truth"
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
                                Real alignments from the chair.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="mt-12 md:mt-16">
                            <AlignmentGallery />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 4. ABOUT THE DOCTOR */}
            <section
                data-testid="ca-about"
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
                                    Dr. Amruta Godbole approaches alignment
                                    the way a tailor approaches a suit. The
                                    movement, the timeline and the finishing
                                    detail are all planned for your bite,
                                    your face and the rhythm of your life,
                                    not a template.
                                </p>
                                <p>
                                    Whether it's a few months of Invisalign
                                    clear aligners to refine a smile, or a
                                    longer, fully planned orthodontic journey
                                    with ceramic or metal braces, every
                                    Invisalign and braces case at our Khar
                                    West clinic begins with a digital scan, a
                                    face-led plan, and an honest conversation
                                    about what's worth doing. Patients across
                                    Mumbai and India leave with straighter
                                    teeth, a balanced bite, and a result built
                                    to hold.
                                </p>
                            </div>

                            <CredentialBadges page="alignment" />
                        </Reveal>
                    </div>
                    <div className="md:col-span-5 order-1 md:order-2">
                        <Reveal delay={120}>
                            <div className="relative w-fit mx-auto">
                                <div className="absolute -inset-4 rounded-full bg-[#F5F2EF] -z-10" />
                                <img
                                    src={DOCTOR_IMG}
                                    alt="Dr. Amruta Godbole, Invisalign provider in Khar West, Mumbai"
                                    data-testid="ca-doctor-image"
                                    className="circle-photo w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] border-[6px] border-white object-cover object-[center_28%]" loading="lazy" decoding="async" />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 5. FAQ */}
            <section
                data-testid="ca-faq"
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
                            <AlignmentFaq />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 6. CONTACT */}
            <section
                data-testid="ca-contact"
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
                                Curious about clear aligners or thinking
                                about braces? Walk in for a consult and a
                                scan. No pressure, all options on the table.
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
                                    value="Ganga Jamuna Building, B-204, 14th Rd, above Mizu Restaurant, Khar West, Pali, Mumbai 400052"
                                />
                            </ul>

                            <div className="mt-10 flex items-center gap-3">
                                <a
                                    href="https://www.instagram.com/toothfullyyours/"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Instagram"
                                    className="h-11 w-11 rounded-full border border-[#EB8A2C]/40 text-[#EB8A2C] flex items-center justify-center hover:bg-[#EB8A2C] hover:text-white transition-colors"
                                >
                                    <Instagram size={18} strokeWidth={1.6} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/amruta-godbole-272522186/"
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
                                data-testid="ca-contact-cta"
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
                                    src="https://www.google.com/maps?q=Toothfully+Yours+Dental+Care+Ganga+Jamuna+Building+B-204+14th+Rd+Khar+West+Mumbai+400052&output=embed"
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
                defaultService="Corrective Alignment"
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
