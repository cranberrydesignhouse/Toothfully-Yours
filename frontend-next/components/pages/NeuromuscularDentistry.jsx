"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Check,
    ChevronDown,
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
import NeuromuscularFaq from "@/components/NeuromuscularFaq";

const HERO_IMG =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/txdxjwzw_tmj%20hero.png";

const DOCTOR_IMG =
    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/r7wm2nb4_Dr.%20Amruta.jpg";

const SYMPTOMS = [
    {
        name: "Jaw pain or tightness",
        scores: { tmj: 3, bruxism: 2, bite: 1, airway: 0 },
    },
    {
        name: "Clicking or popping jaw",
        scores: { tmj: 4, bruxism: 0, bite: 2, airway: 0 },
    },
    {
        name: "Neck & shoulder tension",
        scores: { tmj: 2, bruxism: 2, bite: 1, airway: 1 },
    },
    {
        name: "Frequent headaches",
        scores: { tmj: 2, bruxism: 3, bite: 1, airway: 1 },
    },
    {
        name: "Difficulty chewing",
        scores: { tmj: 3, bruxism: 0, bite: 3, airway: 0 },
    },
    {
        name: "Teeth grinding (Bruxism)",
        scores: { tmj: 1, bruxism: 5, bite: 1, airway: 2 },
    },
    {
        name: "Limited jaw opening",
        scores: { tmj: 4, bruxism: 1, bite: 1, airway: 0 },
    },
    {
        name: "Poor sleep or snoring",
        scores: { tmj: 0, bruxism: 2, bite: 0, airway: 5 },
    },
    {
        name: "Facial pain or fatigue",
        scores: { tmj: 3, bruxism: 2, bite: 1, airway: 1 },
    },
    {
        name: "Ear pain or ringing",
        scores: { tmj: 3, bruxism: 0, bite: 1, airway: 0 },
    },
];

const CATEGORIES = [
    {
        key: "tmj",
        label: "TMJ Dysfunction",
        threshold: 6,
        title: "Possible TMJ Dysfunction",
        description:
            "Your responses may be consistent with temporomandibular joint dysfunction. Joint strain, inflammation, or altered jaw mechanics could be contributing to your symptoms.",
        recommendation:
            "A comprehensive neuromuscular consultation may help determine whether joint mechanics, muscle activity, and bite relationships are contributing factors.",
    },
    {
        key: "bruxism",
        label: "Bruxism & Muscle Overload",
        threshold: 6,
        title: "Possible Bruxism & Muscle Overload",
        description:
            "Your responses may be consistent with chronic clenching or grinding that can place excessive stress on the jaw muscles and surrounding structures.",
        recommendation:
            "A comprehensive neuromuscular consultation may help determine whether muscle overload and bite-related factors are contributing to your symptoms.",
    },
    {
        key: "bite",
        label: "Bite Imbalance",
        threshold: 5,
        title: "Possible Bite Imbalance",
        description:
            "Your responses may indicate uneven bite mechanics that may be placing excess stress on muscles, joints, and surrounding structures.",
        recommendation:
            "A comprehensive neuromuscular consultation may help identify whether bite imbalance is contributing to your symptoms.",
    },
    {
        key: "airway",
        label: "Airway-Related Dysfunction",
        threshold: 5,
        title: "Possible Airway-Related Dysfunction",
        description:
            "Your responses may be consistent with airway-related concerns that can influence sleep quality, jaw posture, muscle activity, and nighttime grinding.",
        recommendation:
            "A comprehensive neuromuscular consultation may help determine whether airway factors are influencing your symptoms.",
    },
];

const ROOT_CAUSE = [
    {
        n: "01",
        title: "Bite Imbalance",
        copy: "Misaligned teeth or jaw positions create uneven loading across the jaw and muscular system.",
    },
    {
        n: "02",
        title: "Muscle Compensation",
        copy: "Surrounding muscles work harder to compensate, creating chronic tension, fatigue and dysfunction.",
    },
    {
        n: "03",
        title: "Pain & Dysfunction",
        copy: "Sustained strain leads to joint inflammation, nerve sensitivity and symptoms that can radiate into the neck, head and shoulders.",
    },
];

const CONDITIONS = [
    {
        title: "TMJ / TMD Disorders",
        copy: "Dysfunction of the temporomandibular joint, including disc displacement, inflammation and joint degeneration.",
    },
    {
        title: "Bruxism",
        copy: "Chronic teeth grinding and clenching that causes tooth wear, jaw fatigue and muscle overload.",
    },
    {
        title: "Facial Muscle Pain",
        copy: "Myofascial pain affecting the face, temples and jaw muscles.",
    },
    {
        title: "Bite Imbalance",
        copy: "Malocclusion patterns where teeth do not function together harmoniously.",
    },
    {
        title: "Chronic Jaw Tension",
        copy: "Persistent muscle tightness and guarding in the masseter, temporalis and pterygoid muscles.",
    },
    {
        title: "Occlusal Dysfunction",
        copy: "Uneven dental forces that affect chewing efficiency, tooth wear and long-term structural health.",
    },
    {
        title: "Airway-Related Jaw Issues",
        copy: "Jaw positions that influence breathing patterns and contribute to airway narrowing or sleep-related breathing concerns.",
    },
    {
        title: "Sleep-Related Concerns",
        copy: "Neuromuscular conditions linked to airway compromise and disrupted sleep architecture.",
    },
];

const TREATMENTS = [
    "Custom Orthotics & Splints",
    "Bite Stabilization",
    "Occlusal Adjustment",
    "Muscle Relaxation Therapy",
    "Full-Mouth Rehabilitation",
    "Airway-Focused Planning",
    "Restorative Correction",
    "Night Guards",
    "Anti-Snoring Devices",
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

export default function NeuromuscularDentistry() {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [selected, setSelected] = useState(() => new Set());
    const [showResults, setShowResults] = useState(false);
    const resultsRef = useRef(null);

    const toggleSymptom = (i) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });
        setShowResults(false);
    };

    const selectedCount = selected.size;

    const computeFindings = () => {
        const totals = { tmj: 0, bruxism: 0, bite: 0, airway: 0 };
        selected.forEach((idx) => {
            const s = SYMPTOMS[idx].scores;
            totals.tmj += s.tmj;
            totals.bruxism += s.bruxism;
            totals.bite += s.bite;
            totals.airway += s.airway;
        });
        const findings = CATEGORIES.map((c) => ({
            ...c,
            score: totals[c.key],
        }))
            .filter((c) => c.score >= c.threshold)
            .sort((a, b) => b.score - a.score);
        return { totals, findings };
    };

    const findings = showResults ? computeFindings().findings : [];
    const primary = findings[0];
    const secondary = findings.slice(1);
    const highBurden = showResults && selectedCount >= 5;

    const handleViewAssessment = () => {
        setShowResults(true);
        // Defer scroll so results panel mounts first
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 80);
    };

    const scrollToContact = () => {
        document
            .querySelector("#contact")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleReset = () => {
        setSelected(new Set());
        setShowResults(false);
        document
            .querySelector("#assess")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div data-testid="neuromuscular-page" className="bg-white">
            <SeoSchema page="neuromuscular" />
            <Navbar onOpenBooking={() => setBookingOpen(true)} />

            {/* 1. HERO */}
            <section
                data-testid="nm-hero"
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
                                Neuromuscular Dentistry
                            </span>
                            <h1
                                data-testid="nm-headline"
                                className="heading-serif text-[2.15rem] leading-[1.1] sm:text-[2.4rem] md:text-[2.6rem] lg:text-[2.9rem] text-[#1A1A1A]"
                            >
                                When your bite is off,
                                <br />
                                your{" "}
                                <span className="text-[#EB8A2C]">
                                    entire jaw feels it.
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl font-dmsans text-[0.85rem] md:text-[1.05rem] leading-relaxed text-[#5C5C5C]">
                                Neuromuscular dentistry focuses on the harmony
                                between your teeth, jaw joints, muscles and
                                airway to restore comfort, function and
                                long-term stability.
                            </p>
                            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={() => setBookingOpen(true)}
                                    data-testid="nm-cta-book"
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    Book My Consultation
                                    <ArrowRight size={16} strokeWidth={2} />
                                </button>
                                <a
                                    href="#assess"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .querySelector("#assess")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                    data-testid="nm-cta-tmj"
                                    className="btn-secondary-dark w-full sm:w-auto"
                                >
                                    Start Assessment
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
                                    alt="Neuromuscular Dentistry at Toothfully Yours"
                                    data-testid="nm-hero-image"
                                    className="circle-photo w-full h-full border-[6px] border-white object-cover object-center"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 2. SYMPTOM IDENTIFICATION */}
            <section
                id="assess"
                data-testid="nm-symptoms"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-6xl mx-auto px-5 md:px-12 lg:px-16">
                    <Reveal>
                        <div className="max-w-2xl">
                            <span className="section-label">Let's Assess</span>
                            <h2 className="heading-serif text-[2.25rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A] !leading-[1.35]">
                                Are you experiencing
                                <br />
                                these{" "}
                                <span className="text-[#EB8A2C]">
                                    symptoms?
                                </span>
                            </h2>
                            <p className="mt-5 font-dmsans text-[#5C5C5C] text-[0.95rem] md:text-base leading-relaxed">
                                Tap the ones that feel familiar. If even two
                                or three apply, a neuromuscular evaluation is
                                worth a conversation.
                            </p>
                        </div>
                    </Reveal>

                    <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {SYMPTOMS.map((s, i) => {
                            const isSelected = selected.has(i);
                            return (
                                <Reveal key={s.name} delay={i * 30}>
                                    <button
                                        type="button"
                                        onClick={() => toggleSymptom(i)}
                                        aria-pressed={isSelected}
                                        data-testid={`nm-symptom-${i}`}
                                        className={`group w-full text-left flex items-center gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 ease-out ${
                                            isSelected
                                                ? "bg-[#FBF6EF] border-[#EB8A2C] shadow-[0_18px_36px_-22px_rgba(235,138,44,0.55)] -translate-y-[1px]"
                                                : "bg-white border-black/10 hover:border-[#EB8A2C]/45 hover:bg-[#FBF8F4]"
                                        }`}
                                    >
                                        <span
                                            className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                                                isSelected
                                                    ? "bg-[#EB8A2C] ring-4 ring-[#EB8A2C]/15"
                                                    : "bg-[#F5F2EF] group-hover:bg-[#EB8A2C]/15"
                                            }`}
                                        >
                                            <Check
                                                size={16}
                                                strokeWidth={2.4}
                                                className={`transition-colors ${
                                                    isSelected
                                                        ? "text-white"
                                                        : "text-[#EB8A2C]"
                                                }`}
                                            />
                                        </span>
                                        <span className="font-dmsans text-[0.98rem] md:text-[1.02rem] tracking-tight text-[#1A1A1A]">
                                            {s.name}
                                        </span>
                                    </button>
                                </Reveal>
                            );
                        })}
                    </div>

                    <Reveal delay={250}>
                        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                            <p
                                data-testid="nm-selected-count"
                                className="font-dmsans text-sm md:text-[0.95rem] tracking-tight text-[#5C5C5C]"
                                aria-live="polite"
                            >
                                Selected Symptoms:{" "}
                                <span className="font-semibold text-[#1A1A1A] tabular-nums">
                                    {selectedCount}
                                </span>
                                {selectedCount > 0 && (
                                    <>
                                        <span className="mx-3 text-[#5C5C5C]/40">
                                            ·
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            data-testid="nm-clear-selection"
                                            className="font-dmsans text-sm md:text-[0.95rem] text-[#EB8A2C] hover:text-[#1A1A1A] underline underline-offset-4 decoration-[#EB8A2C]/40 hover:decoration-[#1A1A1A]/60 transition-colors"
                                        >
                                            Clear selection
                                        </button>
                                    </>
                                )}
                            </p>
                            <button
                                type="button"
                                onClick={handleViewAssessment}
                                disabled={selectedCount === 0}
                                data-testid="nm-view-assessment"
                                className={`btn-primary self-start sm:self-auto ${selectedCount === 0 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                            >
                                View My Assessment
                                <ArrowRight size={16} strokeWidth={2} />
                            </button>
                        </div>
                    </Reveal>

                    {showResults && (
                        <div
                            ref={resultsRef}
                            data-testid="nm-assessment-results"
                            className="mt-12 md:mt-16 rounded-3xl bg-[#FBF6EF] border border-[#EB8A2C]/20 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.35)] p-7 md:p-12 transition-opacity duration-500"
                        >
                            <span className="font-dmsans text-[0.72rem] tracking-[0.22em] uppercase text-[#EB8A2C] font-semibold">
                                Your Assessment
                            </span>

                            {primary ? (
                                <>
                                    <div className="mt-5">
                                        <p className="font-dmsans text-[0.72rem] tracking-[0.18em] uppercase text-[#5C5C5C]">
                                            Primary Finding
                                        </p>
                                        <h3
                                            data-testid="nm-result-primary-title"
                                            className="mt-2 font-dmsans font-semibold tracking-tight text-[1.85rem] sm:text-[2.2rem] md:text-[2.6rem] leading-[1.18] text-[#1A1A1A]"
                                        >
                                            {primary.title}
                                        </h3>
                                        <p className="mt-4 font-dmsans text-[0.98rem] md:text-base leading-relaxed text-[#1A1A1A]/85 max-w-3xl">
                                            {primary.description}
                                        </p>
                                        <p className="mt-4 font-dmsans text-[0.95rem] md:text-[0.98rem] leading-relaxed text-[#5C5C5C] max-w-3xl">
                                            {primary.recommendation}
                                        </p>
                                    </div>

                                    {secondary.length > 0 && (
                                        <div className="mt-8 pt-7 border-t border-[#EB8A2C]/20">
                                            <p className="font-dmsans text-[0.72rem] tracking-[0.18em] uppercase text-[#5C5C5C]">
                                                Secondary Considerations
                                            </p>
                                            <ul
                                                data-testid="nm-result-secondary"
                                                className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                                            >
                                                {secondary.map((c) => (
                                                    <li
                                                        key={c.key}
                                                        className="flex items-start gap-3 font-dmsans text-[0.97rem] text-[#1A1A1A]"
                                                    >
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#EB8A2C] shrink-0" />
                                                        <span>{c.label}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="mt-5">
                                    <h3
                                        data-testid="nm-result-empty-title"
                                        className="font-dmsans font-semibold tracking-tight text-[1.85rem] sm:text-[2.2rem] md:text-[2.6rem] leading-[1.18] text-[#1A1A1A]"
                                    >
                                        No Clear Pattern Identified
                                    </h3>
                                    <p className="mt-4 font-dmsans text-[0.98rem] md:text-base leading-relaxed text-[#1A1A1A]/85 max-w-3xl">
                                        Your responses do not strongly indicate
                                        a specific neuromuscular pattern.
                                        However, persistent symptoms may still
                                        benefit from professional evaluation.
                                    </p>
                                    <p className="mt-4 font-dmsans text-[0.95rem] md:text-[0.98rem] leading-relaxed text-[#5C5C5C] max-w-3xl">
                                        If symptoms continue or worsen,
                                        consider scheduling a consultation for
                                        a comprehensive assessment.
                                    </p>
                                </div>
                            )}

                            {highBurden && (
                                <div
                                    data-testid="nm-result-burden"
                                    className="mt-8 rounded-2xl bg-white/70 border border-[#EB8A2C]/30 p-5 md:p-6"
                                >
                                    <p className="font-dmsans text-[0.95rem] md:text-[0.98rem] leading-relaxed text-[#1A1A1A]">
                                        Multiple symptoms are present. While
                                        symptoms can have many causes, your
                                        responses suggest that a comprehensive
                                        neuromuscular consultation may be
                                        worthwhile to identify whether
                                        multiple contributing factors are
                                        interacting simultaneously.
                                    </p>
                                </div>
                            )}

                            <div className="mt-9 md:mt-10 pt-7 border-t border-[#EB8A2C]/20 flex flex-col gap-5">
                                <p className="font-dmsans text-[0.92rem] md:text-[0.95rem] leading-relaxed text-[#5C5C5C] max-w-2xl">
                                    Neuromuscular symptoms often involve
                                    multiple contributing factors. A
                                    consultation helps identify the root cause
                                    and determine the most appropriate next
                                    steps.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <button
                                        type="button"
                                        onClick={scrollToContact}
                                        data-testid="nm-result-book-cta"
                                        className="btn-primary w-full sm:w-auto"
                                    >
                                        Book My Consultation
                                        <ArrowRight
                                            size={16}
                                            strokeWidth={2}
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        data-testid="nm-result-reset"
                                        className="btn-secondary-dark w-full sm:w-auto"
                                    >
                                        Take Test Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 3. ROOT-CAUSE ANALYSIS (dark) */}
            <section
                data-testid="nm-root-cause"
                className="bg-[#545454] py-16 md:py-32 text-white"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16">
                    <Reveal>
                        <div className="max-w-2xl">
                            <span className="font-dmsans text-[0.72rem] tracking-[0.22em] uppercase text-[#EB8A2C]">
                                Root-Cause Analysis
                            </span>
                            <h2 className="mt-4 heading-serif text-[2.25rem] sm:text-4xl md:text-[3.25rem] text-white !leading-[1.35]">
                                <span className="md:hidden">
                                    Understanding
                                    <br />
                                    the jaw-muscle
                                    <br />
                                    <span className="text-[#EB8A2C]">
                                        connection.
                                    </span>
                                </span>
                                <span className="hidden md:inline">
                                    Understanding the
                                    <br />
                                    jaw-muscle{" "}
                                    <span className="text-[#EB8A2C]">
                                        connection.
                                    </span>
                                </span>
                            </h2>
                            <p className="mt-5 font-dmsans text-white/70 text-[0.95rem] md:text-base leading-relaxed">
                                Most jaw pain isn't random. It follows a
                                pattern, and once you can see it, the path to
                                relief becomes obvious.
                            </p>
                        </div>
                    </Reveal>

                    <div className="relative mt-14 md:mt-20">
                        {/* Connecting line spans only between step 1 and step 3 centers (1/6 to 5/6 of row width) */}
                        <div
                            aria-hidden
                            className="hidden md:block absolute top-[34px] left-[16.67%] right-[16.67%] h-px bg-white/25"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
                            {ROOT_CAUSE.map((item, i) => (
                                <Reveal key={item.n} delay={i * 110}>
                                    <div
                                        data-testid={`nm-rc-${i}`}
                                        className="text-center flex flex-col items-center"
                                    >
                                        <div className="relative inline-flex items-center justify-center h-[70px] w-[70px] rounded-full bg-[#545454] border border-white/25">
                                            <span className="heading-serif text-[1.4rem] text-[#EB8A2C]">
                                                {item.n}
                                            </span>
                                        </div>
                                        <h3 className="mt-7 font-dmsans font-semibold text-[1.1rem] md:text-[1.2rem] text-white tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 font-dmsans text-[0.95rem] text-white/70 leading-relaxed max-w-[20rem]">
                                            {item.copy}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CONDITIONS WE ADDRESS */}
            <section
                data-testid="nm-conditions"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16">
                    <Reveal>
                        <div className="max-w-2xl">
                            <span className="section-label">Scope of Care</span>
                            <h2 className="heading-serif text-[2.25rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A] !leading-[1.35]">
                                Common conditions we{" "}
                                <span className="text-[#EB8A2C]">address.</span>
                            </h2>
                        </div>
                    </Reveal>

                    <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-7 md:gap-x-8 md:gap-y-12">
                        {CONDITIONS.map((c, i) => (
                            <Reveal key={c.title} delay={i * 60}>
                                <article
                                    data-testid={`nm-condition-${i}`}
                                    className="h-full border-t border-black/15 pt-5 md:pt-6"
                                >
                                    <span className="font-dmsans text-[0.62rem] md:text-[0.66rem] tracking-[0.18em] md:tracking-[0.22em] uppercase text-[#EB8A2C]">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="mt-2 md:mt-3 font-dmsans font-semibold text-[0.92rem] md:text-[1.05rem] text-[#1A1A1A] tracking-tight leading-snug">
                                        {c.title}
                                    </h3>
                                    <p className="mt-2 md:mt-3 font-dmsans text-[0.8rem] md:text-[0.9rem] text-[#5C5C5C] leading-relaxed">
                                        {c.copy}
                                    </p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                    <p className="md:hidden mt-8 flex items-center justify-center gap-2 font-dmsans text-[0.72rem] tracking-[0.18em] uppercase text-[#5C5C5C]">
                        <ChevronDown size={14} strokeWidth={1.8} className="animate-bounce" />
                        Scroll for more
                    </p>
                </div>
            </section>

            {/* 5. ABOUT THE DOCTOR */}
            <section
                data-testid="nm-about"
                className="bg-[#F5F2EF] py-16 md:py-32"
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
                                    Dr. Amruta Godbole's training in
                                    neuromuscular and functional dentistry
                                    sits at the intersection of restoration,
                                    occlusion and airway. Her approach is
                                    diagnostic before it is corrective, the
                                    bite, the joints, the muscles and the way
                                    you breathe at night are all part of the
                                    same picture.
                                </p>
                                <p>
                                    Patients walk in with headaches, ear
                                    pressure, clicking jaws or grinding
                                    habits, and walk out with a clear
                                    explanation of what is causing them and a
                                    layered plan to fix it, starting with the
                                    least invasive option that actually works.
                                </p>
                            </div>

                            <CredentialBadges page="neuromuscular" />
                        </Reveal>
                    </div>
                    <div className="md:col-span-5 order-1 md:order-2">
                        <Reveal delay={120}>
                            <div className="relative w-fit mx-auto">
                                <div className="absolute -inset-4 rounded-full bg-white -z-10" />
                                <img
                                    src={DOCTOR_IMG}
                                    alt="Dr. Amruta Godbole"
                                    data-testid="nm-doctor-image"
                                    className="circle-photo w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] border-[6px] border-white object-cover object-[center_28%]"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 6. TREATMENT PATHWAYS */}
            <section
                data-testid="nm-treatments"
                className="bg-white py-16 md:py-32"
            >
                <div className="max-w-6xl mx-auto px-5 md:px-12 lg:px-16">
                    <Reveal>
                        <div className="max-w-2xl">
                            <span className="section-label">
                                Treatment Pathways
                            </span>
                            <h2 className="heading-serif text-[2.25rem] sm:text-4xl md:text-[3.25rem] text-[#1A1A1A] leading-[1.05]">
                                Possible{" "}
                                <span className="text-[#EB8A2C]">
                                    treatments.
                                </span>
                            </h2>
                            <p className="mt-5 font-dmsans text-[#5C5C5C] text-[0.95rem] md:text-base leading-relaxed">
                                We sequence treatments from the least invasive
                                upward. Most patients find relief long before
                                they reach the bottom of the list.
                            </p>
                        </div>
                    </Reveal>

                    <ul className="mt-12 md:mt-16 grid grid-cols-2 md:gap-x-12 gap-x-3 gap-y-3 md:gap-y-0">
                        {TREATMENTS.map((t, i) => (
                            <Reveal key={t} delay={i * 50}>
                                <li
                                    data-testid={`nm-treatment-${i}`}
                                    className="h-full flex flex-col gap-2 md:flex-row md:items-center md:gap-5 p-4 md:p-0 md:py-5 rounded-2xl md:rounded-none bg-[#F5F2EF] md:bg-transparent md:border-b border-black/10"
                                >
                                    <span className="font-dmsans text-[0.66rem] md:text-[0.7rem] tracking-[0.18em] md:tracking-[0.2em] text-[#5C5C5C]">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-dmsans font-semibold text-[0.92rem] md:text-[1.05rem] text-[#1A1A1A] tracking-tight leading-snug">
                                        {t}
                                    </span>
                                </li>
                            </Reveal>
                        ))}
                    </ul>
                    <p className="md:hidden mt-7 flex items-center justify-center gap-2 font-dmsans text-[0.72rem] tracking-[0.18em] uppercase text-[#5C5C5C]">
                        <ChevronDown size={14} strokeWidth={1.8} className="animate-bounce" />
                        Scroll for more
                    </p>
                </div>
            </section>

            {/* 7. FAQ */}
            <section
                data-testid="nm-faq"
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
                            <NeuromuscularFaq />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 8. CONTACT */}
            <section
                id="contact"
                data-testid="nm-contact"
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
                                If something in your jaw, sleep or daily
                                tension feels persistent, an evaluation is the
                                fastest way to a clear answer.
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
                                data-testid="nm-contact-cta"
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
                defaultService="Neuromuscular Dentistry"
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
