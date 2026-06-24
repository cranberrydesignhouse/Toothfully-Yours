"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Items can be composite (single image) with optional label, afterAt: "bottom" | "right"
// or split (before + after).
const TABS = [
    {
        id: "implants",
        label: "Dental Implants",
        items: [
            {
                composite:
                    "/images/cases-12.webp",
                afterAt: "bottom",
            },
            {
                composite:
                    "/images/cases-13.webp",
            },
            {
                composite:
                    "/images/implants2.webp",
            },
        ],
    },
    {
        id: "crowns",
        label: "Dental Crowns",
        items: [
            {
                composite:
                    "/images/cases-4.webp",
            },
            {
                composite:
                    "/images/cases-5.webp",
            },
            {
                composite:
                    "/images/cases-34.webp",
            },
            {
                composite:
                    "/images/crown4.webp",
            },
            {
                composite:
                    "/images/crowns2.webp",
            },
            {
                composite:
                    "/images/crown3.webp",
            },
        ],
    },
    {
        id: "fillings",
        label: "Fillings",
        items: [
            {
                composite:
                    "/images/cases-7.webp",
            },
            {
                composite:
                    "/images/cases-30.webp",
            },
            {
                composite:
                    "/images/cases-32.webp",
            },
            {
                composite:
                    "/images/cases-33.webp",
            },
            {
                composite:
                    "/images/filling-5.webp",
            },
            {
                composite:
                    "/images/filling-6.webp",
                afterAt: "right",
            },
            {
                composite:
                    "/images/fillings-7.webp",
            },
        ],
    },
];

const RGCard = ({ item, testId }) => {
    let afterClass =
        "absolute top-[calc(50%+8px)] left-3 font-dmsans text-[0.6rem] tracking-[0.18em] uppercase bg-[#EB8A2C] text-white rounded-full px-2.5 py-1";
    if (item.afterAt === "bottom") {
        afterClass =
            "absolute top-[calc(66.67%+8px)] left-3 font-dmsans text-[0.6rem] tracking-[0.18em] uppercase bg-[#EB8A2C] text-white rounded-full px-2.5 py-1";
    } else if (item.afterAt === "right") {
        afterClass =
            "absolute top-3 right-3 font-dmsans text-[0.6rem] tracking-[0.18em] uppercase bg-[#EB8A2C] text-white rounded-full px-2.5 py-1";
    }

    return (
        <article
            data-testid={testId}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_70px_-40px_rgba(0,0,0,0.35)]"
        >
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
                        <span className={afterClass}>After</span>
                    </>
                )}
            </div>
        </article>
    );
};

const TabCarousel = ({ items, tabId }) => {
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
        emblaApi.on("reInit", () => {
            setSnaps(emblaApi.scrollSnapList());
            onSelect();
        });
        return () => emblaApi.off("select", onSelect);
    }, [emblaApi, items]);

    return (
        <div data-testid={`rg-${tabId}-carousel`} className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6 md:gap-7">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="flex-[0_0_82%] sm:flex-[0_0_48%] lg:flex-[0_0_31.5%] min-w-0"
                        >
                            <RGCard
                                item={item}
                                testId={`rg-card-${tabId}-${i}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {items.length > 3 && (
                <div className="mt-8 md:mt-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                        {snaps.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => scrollTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                data-testid={`rg-dot-${tabId}-${i}`}
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
                            data-testid={`rg-prev-${tabId}`}
                            className="h-11 w-11 rounded-full border border-black/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] flex items-center justify-center transition-colors"
                        >
                            <ChevronLeft size={18} strokeWidth={1.7} />
                        </button>
                        <button
                            type="button"
                            onClick={scrollNext}
                            aria-label="Next case"
                            data-testid={`rg-next-${tabId}`}
                            className="h-11 w-11 rounded-full bg-[#EB8A2C] text-white hover:bg-[#D97A1B] flex items-center justify-center transition-colors"
                        >
                            <ChevronRight size={18} strokeWidth={1.7} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export const RestorationGallery = ({ activeId, onTabChange }) => {
    const [internalId, setInternalId] = useState(TABS[0].id);
    const current = activeId ?? internalId;
    const setId = onTabChange ?? setInternalId;
    const tab = TABS.find((t) => t.id === current) ?? TABS[0];

    return (
        <div data-testid="rg-gallery">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {TABS.map((t) => {
                    const active = t.id === current;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setId(t.id)}
                            data-testid={`rg-tab-${t.id}`}
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
                <TabCarousel
                    key={tab.id}
                    items={tab.items}
                    tabId={tab.id}
                />
            </div>
        </div>
    );
};

export default RestorationGallery;