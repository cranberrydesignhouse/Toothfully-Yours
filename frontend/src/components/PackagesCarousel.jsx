import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const PACKAGES = [
    {
        name: "Consultation & Preventive Care",
        bestFor: "Routine dental evaluation & cleaning",
        sessions: "1",
        treatmentTime: "Approx. 1.5 hours",
        stay: "Same day",
        result: "Immediate tartar & stain removal",
        startsFrom: "₹5,000",
        includes: [
            "Comprehensive examination",
            "Diagnostic radiographs",
            "Oral prophylaxis",
            "Fluoride treatment",
        ],
    },
    {
        name: "Professional Teeth Whitening",
        bestFor: "Brighter, photo-ready smiles",
        sessions: "2",
        gap: "2 – 3 days",
        treatmentTime: "Approx. 1 hour per session",
        stay: "4 – 5 days",
        result: "Up to 5 – 7 shades lighter",
        startsFrom: "₹35,000",
        includes: [
            "Consultation & examination",
            "Philips Zoom whitening",
            "Optional at-home whitening gel",
        ],
    },
    {
        name: "Cosmetic Bonding / Veneers",
        bestFor: "Gaps, chipped teeth & smile refinement",
        sessions: "2 – 3",
        gap: "Approx. 1 day",
        treatmentTime: "Approx. 1 hour per session",
        stay: "3 – 5 days",
        result: "Improved smile symmetry & aesthetics",
        startsFrom: "₹15,000",
        priceUnit: "/ tooth",
        includes: [
            "Smile analysis & photography",
            "Diagnostic study models",
            "Resin bonding",
            "Fine-tuning & adjustments",
        ],
    },
    {
        name: "Smile Design with Porcelain Veneers",
        bestFor: "Complete smile enhancement",
        sessions: "3 – 4",
        gap: "2 – 3 days",
        treatmentTime: "Approx. 2 – 3 hours per session",
        stay: "8 – 12 days",
        result: "Correction of gaps, crowding, angulation & smile proportions",
        startsFrom: "₹20,000",
        priceUnit: "/ tooth",
        includes: [
            "Digital smile designing",
            "Wax-up & photography",
            "Veneer preparation & temporaries",
            "Final cementation & fine-tuning",
        ],
    },
    {
        name: "Single / Multiple Dental Implants",
        bestFor: "Replacing one or more missing teeth",
        sessions: "3 initial visits",
        gap: "Approx. 7 days",
        treatmentTime: "Approx. 2 – 3 hours per session",
        stay: "Approximately 3 weeks",
        finalProsthesis: "Typically completed after 4 months",
        result: "Permanent tooth replacement & bite restoration",
        startsFrom: "₹80,000",
        priceUnit: "/ implant, including crown",
        includes: [
            "Consultation & examination",
            "Dental scan",
            "Implant placement",
            "Follow-up & suture removal",
        ],
    },
    {
        name: "Full-Mouth Rehabilitation",
        bestFor: "Complex bite issues, worn teeth & full smile restoration",
        sessions: "5 – 6",
        gap: "2 – 3 days",
        treatmentTime: "Approx. 2 – 3 hours per session",
        stay: "Approximately 2 – 3 weeks",
        result: "Functional and aesthetic smile restoration with bite improvement",
        startsFrom: "₹5 – 6 Lakhs",
        includes: [
            "Digital smile designing",
            "Bite raise & impressions",
            "Mock-up trials",
            "Crown / veneer preparations",
            "Final cementation & fine-tuning",
        ],
    },
    {
        name: "Full Mouth Reconstruction with Implants",
        bestFor: "Extensive tooth loss or full-arch replacement",
        sessions: "4 – 5 initial visits",
        gap: "2 – 3 days",
        treatmentTime: "Approx. 4 hours per session",
        stay: "Approximately 2 – 3 weeks",
        finalProsthesis: "Typically completed after 4 months",
        result: "Full smile and bite reconstruction",
        startsFrom: "₹9 – 10 Lakhs",
        priceUnit: "including final prosthesis",
        includes: [
            "Dental scan",
            "Implant placement",
            "Temporary prosthesis",
            "Follow-ups & healing assessment",
        ],
    },
    {
        name: "Invisalign / Clear Aligners",
        bestFor: "Gaps, crowding & misaligned teeth",
        sessions: "3 initial visits",
        gap: "Approx. 7 days",
        treatmentTime: "Approx. 1 hour per session",
        stay: "Approximately 3 weeks",
        continuation:
            "Aligners couriered internationally with remote monitoring",
        result: "Straighter teeth with minimal disruption to daily life",
        startsFrom: "₹2.75 – 4.5 Lakhs",
        includes: [
            "Consultation & examination",
            "Digital scan",
            "Treatment planning",
            "Remote progress monitoring",
        ],
    },
];

const Stat = ({ label, value }) => (
    <div>
        <dt className="font-dmsans text-[0.62rem] tracking-[0.18em] uppercase text-[#5C5C5C]">
            {label}
        </dt>
        <dd className="mt-1 font-dmsans text-[0.92rem] text-[#1A1A1A] leading-snug">
            {value}
        </dd>
    </div>
);

const PackageCard = ({ p, index }) => (
    <article
        data-testid={`package-card-${index}`}
        className="h-full bg-white rounded-3xl border border-black/8 p-7 md:p-9 shadow-[0_30px_60px_-50px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_70px_-45px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
    >
        <span className="font-dmsans text-[0.66rem] tracking-[0.22em] uppercase text-[#EB8A2C]">
            {`Package ${String(index + 1).padStart(2, "0")}`}
        </span>
        <h3 className="mt-3 font-dmsans font-semibold text-[1.35rem] md:text-[1.45rem] text-[#1A1A1A] leading-[1.2] tracking-tight">
            {p.name}
        </h3>

        <div className="mt-5 pt-5 border-t border-black/8">
            <p className="font-dmsans text-[0.62rem] tracking-[0.18em] uppercase text-[#5C5C5C]">
                Best for
            </p>
            <p className="mt-1.5 font-dmsans text-[0.95rem] text-[#1A1A1A] leading-snug">
                {p.bestFor}
            </p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
            <Stat label="Sessions" value={p.sessions} />
            {p.gap && <Stat label="Gap between sessions" value={p.gap} />}
            <Stat label="Treatment time" value={p.treatmentTime} />
            <Stat label="Typical stay" value={p.stay} />
            {p.finalProsthesis && (
                <div className="col-span-2">
                    <Stat label="Final prosthesis" value={p.finalProsthesis} />
                </div>
            )}
            {p.continuation && (
                <div className="col-span-2">
                    <Stat label="Continuation" value={p.continuation} />
                </div>
            )}
        </dl>

        <div className="mt-6 pt-5 border-t border-black/8">
            <p className="font-dmsans text-[0.62rem] tracking-[0.18em] uppercase text-[#EB8A2C]">
                Expected result
            </p>
            <p className="mt-1.5 font-dmsans text-[0.95rem] text-[#1A1A1A] leading-relaxed">
                {p.result}
            </p>
        </div>

        <ul className="mt-6 space-y-2.5">
            <li className="font-dmsans text-[0.62rem] tracking-[0.18em] uppercase text-[#5C5C5C] mb-2">
                Includes
            </li>
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

        <div className="mt-auto pt-8">
            <div className="bg-[#F5F2EF] rounded-2xl px-5 py-4">
                <p className="font-dmsans text-[0.66rem] tracking-[0.18em] uppercase text-[#5C5C5C]">
                    Starting at
                </p>
                <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-dmsans font-semibold text-[1.4rem] md:text-[1.55rem] text-[#1A1A1A] tracking-tight">
                        {p.startsFrom}
                    </span>
                    {p.priceUnit && (
                        <span className="font-dmsans text-[0.78rem] text-[#5C5C5C]">
                            {p.priceUnit}
                        </span>
                    )}
                </div>
            </div>
        </div>
    </article>
);

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
                <div className="flex gap-5 md:gap-6 items-stretch">
                    {PACKAGES.map((p, i) => (
                        <div
                            key={p.name}
                            className="flex-[0_0_88%] sm:flex-[0_0_60%] lg:flex-[0_0_38%] xl:flex-[0_0_32%] min-w-0 flex"
                        >
                            <PackageCard p={p} index={i} />
                        </div>
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
