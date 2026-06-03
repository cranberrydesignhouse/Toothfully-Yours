import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Items can either be split (`before` + `after`) or a single composite image (`composite`).
const TABS = [
    {
        id: "veneers",
        label: "Dental Veneers",
        items: [
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/4umcpp6y_composite-veeneers%201.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/8e8bykvc_dental-fill.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/njffdvgc_dental-fill2-scaled.png",
            },
        ],
    },
    {
        id: "smile-design",
        label: "Smile Design",
        items: [
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/s4vujdr8_cases-10.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/mkob0e76_cases-11.png",
                label: "Full Mouth Transformation",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/49ewoyos_cases-29.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/ndtuy3c9_cases-31.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/sr9dqtux_smile%20design%201.png",
            },
        ],
    },
    {
        id: "whitening",
        label: "Teeth Whitening",
        items: [
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/tcj1ecz2_cases-15.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/it1msw5j_cases-16.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/jr436qjn_cases-17.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/2tuf1fi7_cases-18.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/uiyw0qpw_cases-19.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/efrs2m1b_cases-20.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/um415liy_cases-21.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/krs23l9j_cases-22.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/8hvaldj4_cases-26.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/ufbmkm2u_whitening2.png",
            },
        ],
    },
];

// A single before/after card (composite or split).
const BACard = ({ item, testId }) => (
    <article
        data-testid={testId}
        className="bg-white rounded-3xl overflow-hidden shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_70px_-40px_rgba(0,0,0,0.35)]"
    >
        {item.composite ? (
            <div className="relative aspect-square overflow-hidden group">
                <img
                    src={item.composite}
                    alt={item.label || "Before and after"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {item.label ? (
                    <span className="absolute top-3 left-3 font-dmsans text-[0.6rem] tracking-[0.18em] uppercase bg-[#1A1A1A] text-white rounded-full px-2.5 py-1">
                        {item.label}
                    </span>
                ) : (
                    <>
                        <span className="absolute top-3 left-3 font-dmsans text-[0.6rem] tracking-[0.18em] uppercase bg-white/95 text-[#1A1A1A] rounded-full px-2.5 py-1">
                            Before
                        </span>
                        <span className="absolute top-[calc(50%+8px)] left-3 font-dmsans text-[0.6rem] tracking-[0.18em] uppercase bg-[#EB8A2C] text-white rounded-full px-2.5 py-1">
                            After
                        </span>
                    </>
                )}
            </div>
        ) : (
            <div className="grid grid-cols-2">
                <div className="relative aspect-[4/5] overflow-hidden group">
                    <img
                        src={item.before}
                        alt={`Before, ${item.note}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute top-3 left-3 font-dmsans text-[0.6rem] tracking-[0.18em] uppercase bg-white/95 text-[#1A1A1A] rounded-full px-2.5 py-1">
                        Before
                    </span>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden group">
                    <img
                        src={item.after}
                        alt={`After, ${item.note}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute top-3 left-3 font-dmsans text-[0.6rem] tracking-[0.18em] uppercase bg-[#EB8A2C] text-white rounded-full px-2.5 py-1">
                        After
                    </span>
                </div>
            </div>
        )}
    </article>
);

// Horizontal sideways carousel for tabs that have many cases.
const BACarousel = ({ items, tabId }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
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
        <div data-testid={`ba-${tabId}-carousel`} className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6 md:gap-7">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="flex-[0_0_82%] sm:flex-[0_0_48%] lg:flex-[0_0_31.5%] min-w-0"
                        >
                            <BACard
                                item={item}
                                testId={`ba-card-${tabId}-${i}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8 md:mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                    {snaps.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => scrollTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            data-testid={`ba-dot-${i}`}
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
                        aria-label="Previous case"
                        data-testid="ba-prev"
                        className="h-11 w-11 rounded-full border border-black/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft size={18} strokeWidth={1.7} />
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
                        aria-label="Next case"
                        data-testid="ba-next"
                        className="h-11 w-11 rounded-full bg-[#EB8A2C] text-white hover:bg-[#D97A1B] flex items-center justify-center transition-colors"
                    >
                        <ChevronRight size={18} strokeWidth={1.7} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export const BeforeAfterGallery = ({ activeId, onTabChange }) => {
    const [internalId, setInternalId] = useState(TABS[0].id);
    const current = activeId ?? internalId;
    const setId = onTabChange ?? setInternalId;
    const tab = TABS.find((t) => t.id === current) ?? TABS[0];

    return (
        <div data-testid="ba-gallery">
            {/* Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {TABS.map((t) => {
                    const active = t.id === current;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setId(t.id)}
                            data-testid={`ba-tab-${t.id}`}
                            className={`font-dmsans text-[0.78rem] md:text-[0.85rem] tracking-tight px-5 py-2.5 rounded-full transition-all duration-300 ${
                                active
                                    ? "bg-[#1A1A1A] text-white shadow-[0_8px_18px_-10px_rgba(0,0,0,0.5)]"
                                    : "bg-white text-[#1A1A1A] border border-black/10 hover:border-[#EB8A2C] hover:text-[#EB8A2C]"
                            }`}
                        >
                            {t.label}
                        </button>
                    );
                })}
            </div>

            <div className="mt-10 md:mt-12">
                <BACarousel
                    key={tab.id}
                    items={tab.items}
                    tabId={tab.id}
                />
            </div>
        </div>
    );
};

export default BeforeAfterGallery;
