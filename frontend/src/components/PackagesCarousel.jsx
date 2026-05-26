import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const PACKAGES = [
    {
        name: "The Essential",
        summary:
            "A clean, calm first visit to set a strong oral health baseline.",
        sessions: "1 session",
        duration: "1 day",
        stay: "1 – 2 days",
        includes: [
            "Complete oral examination",
            "Professional scaling & polishing",
            "Digital X-rays & treatment plan",
        ],
        startsFrom: "₹15,000",
    },
    {
        name: "The Refresh",
        summary:
            "A radiant reset, professional whitening with a thorough cleaning.",
        sessions: "2 sessions",
        duration: "3 – 5 days",
        stay: "4 – 5 days",
        includes: [
            "Professional in-clinic whitening",
            "Deep cleaning & polish",
            "Minor cosmetic touch-ups",
        ],
        startsFrom: "₹45,000",
    },
    {
        name: "The Smile Edit",
        summary:
            "Targeted cosmetic refinement, planned around your face and bite.",
        sessions: "3 sessions",
        duration: "7 – 10 days",
        stay: "8 – 10 days",
        includes: [
            "2 – 4 porcelain veneers",
            "Edge bonding & contouring",
            "Professional whitening",
        ],
        startsFrom: "₹2,50,000",
    },
    {
        name: "Full Smile Design",
        summary:
            "A photographed, previewed, face-led transformation of your full smile.",
        sessions: "4 sessions",
        duration: "10 – 14 days",
        stay: "12 – 14 days",
        includes: [
            "8 – 10 porcelain veneers",
            "Digital smile design preview",
            "Final shade & finish review",
        ],
        startsFrom: "₹6,00,000",
    },
    {
        name: "Single Implant Plan",
        summary:
            "One missing tooth, one quiet surgery, one final crown that feels like yours.",
        sessions: "2 visits",
        duration: "4 – 5 months",
        stay: "5 – 7 days per visit",
        includes: [
            "Implant placement",
            "Custom abutment & final crown",
            "All review appointments",
        ],
        startsFrom: "₹1,20,000",
    },
    {
        name: "Multi-Implant Plan",
        summary:
            "Three to four implants, sequenced for healing and a stable, lifelong bite.",
        sessions: "3 visits",
        duration: "5 – 6 months",
        stay: "7 days per visit",
        includes: [
            "3 – 4 implants placed in stages",
            "Custom crowns & bridge work",
            "Bone graft, if needed",
        ],
        startsFrom: "₹4,50,000",
    },
    {
        name: "Full Mouth Rehabilitation",
        summary:
            "When everything needs attention, planned beautifully and executed in phases.",
        sessions: "5 – 6 sessions",
        duration: "7 – 8 months",
        stay: "Phased, 2 – 3 trips",
        includes: [
            "Implants + bridges + crowns",
            "Bite & alignment correction",
            "Gum health stabilisation",
        ],
        startsFrom: "₹12,00,000",
    },
    {
        name: "Aligners Express",
        summary:
            "Minor crowding refined with nearly invisible, removable aligners.",
        sessions: "2 visits",
        duration: "9 – 12 months",
        stay: "3 – 5 days per visit",
        includes: [
            "Limited treatment Invisalign",
            "Refinement aligners",
            "Custom retainers",
        ],
        startsFrom: "₹2,80,000",
    },
    {
        name: "Aligners Comprehensive",
        summary:
            "Full orthodontic alignment, treatment that quietly transforms your bite.",
        sessions: "4 – 5 visits",
        duration: "12 – 18 months",
        stay: "3 – 5 days per visit",
        includes: [
            "Full Invisalign treatment",
            "Mid-course refinements",
            "Long-term retainers",
        ],
        startsFrom: "₹4,50,000",
    },
];

export const PackagesCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps",
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [snaps, setSnaps] = useState([]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        setSnaps(emblaApi.scrollSnapList());
        onSelect();
        emblaApi.on("select", onSelect);
        return () => emblaApi.off("select", onSelect);
    }, [emblaApi]);

    return (
        <div data-testid="packages-carousel" className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-5 md:gap-6">
                    {PACKAGES.map((p, i) => (
                        <article
                            key={p.name}
                            data-testid={`package-card-${i}`}
                            className="flex-[0_0_86%] sm:flex-[0_0_55%] lg:flex-[0_0_34%] xl:flex-[0_0_30%] min-w-0 bg-white rounded-3xl border border-black/8 p-7 md:p-9 shadow-[0_30px_60px_-50px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_70px_-45px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-500"
                        >
                            <span className="font-dmsans text-[0.66rem] tracking-[0.22em] uppercase text-[#EB8A2C]">
                                Package
                            </span>
                            <h3 className="mt-3 heading-serif text-[1.7rem] md:text-[2rem] text-[#1A1A1A] leading-[1.1]">
                                {p.name}
                            </h3>
                            <p className="mt-3 font-dmsans text-[0.92rem] text-[#5C5C5C] leading-relaxed">
                                {p.summary}
                            </p>

                            <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3">
                                <div>
                                    <dt className="font-dmsans text-[0.62rem] tracking-[0.18em] uppercase text-[#5C5C5C]">
                                        Sessions
                                    </dt>
                                    <dd className="mt-1 font-dmsans text-[0.92rem] text-[#1A1A1A]">
                                        {p.sessions}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-dmsans text-[0.62rem] tracking-[0.18em] uppercase text-[#5C5C5C]">
                                        Treatment
                                    </dt>
                                    <dd className="mt-1 font-dmsans text-[0.92rem] text-[#1A1A1A]">
                                        {p.duration}
                                    </dd>
                                </div>
                                <div className="col-span-2">
                                    <dt className="font-dmsans text-[0.62rem] tracking-[0.18em] uppercase text-[#5C5C5C]">
                                        Ideal Stay
                                    </dt>
                                    <dd className="mt-1 font-dmsans text-[0.92rem] text-[#1A1A1A]">
                                        {p.stay}
                                    </dd>
                                </div>
                            </dl>

                            <ul className="mt-7 space-y-2.5 border-t border-black/8 pt-6">
                                {p.includes.map((line) => (
                                    <li
                                        key={line}
                                        className="flex items-start gap-2.5 font-dmsans text-[0.9rem] text-[#1A1A1A]"
                                    >
                                        <Check
                                            size={15}
                                            strokeWidth={2}
                                            className="mt-[3px] text-[#EB8A2C] shrink-0"
                                        />
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-black/8 flex items-baseline justify-between">
                                <span className="font-dmsans text-[0.7rem] tracking-[0.16em] uppercase text-[#5C5C5C]">
                                    Starting from
                                </span>
                                <span className="heading-serif text-[1.5rem] md:text-[1.65rem] text-[#1A1A1A]">
                                    {p.startsFrom}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                    {snaps.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => scrollTo(i)}
                            aria-label={`Go to package ${i + 1}`}
                            data-testid={`packages-dot-${i}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                selectedIndex === i
                                    ? "w-7 bg-[#EB8A2C]"
                                    : "w-2.5 bg-black/15 hover:bg-black/30"
                            }`}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={scrollPrev}
                        aria-label="Previous package"
                        data-testid="packages-prev"
                        className="h-11 w-11 rounded-full border border-black/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft size={18} strokeWidth={1.7} />
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
                        aria-label="Next package"
                        data-testid="packages-next"
                        className="h-11 w-11 rounded-full bg-[#EB8A2C] text-white hover:bg-[#D97A1B] flex items-center justify-center transition-colors"
                    >
                        <ChevronRight size={18} strokeWidth={1.7} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PackagesCarousel;
