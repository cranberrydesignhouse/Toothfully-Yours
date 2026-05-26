import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Split a flat list into pages of `perPage` items, padding the
// last page by looping from the start so each page is visually full.
const paginate = (items, perPage) => {
    if (items.length === 0) return [];
    const pages = [];
    for (let i = 0; i < items.length; i += perPage) {
        const chunk = items.slice(i, i + perPage);
        let j = 0;
        while (chunk.length < perPage) {
            chunk.push(items[j % items.length]);
            j += 1;
        }
        pages.push(chunk);
    }
    return pages;
};

export const GalleryCarousel = ({ items, perPage = 6 }) => {
    const pages = paginate(items, perPage);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
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

    // Autoplay
    useEffect(() => {
        if (!emblaApi) return;
        const id = setInterval(() => {
            if (!document.hidden) emblaApi.scrollNext();
        }, 7000);
        return () => clearInterval(id);
    }, [emblaApi]);

    return (
        <div data-testid="gallery-carousel" className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {pages.map((page, pi) => (
                        <div
                            key={pi}
                            className="flex-[0_0_100%] min-w-0"
                            data-testid={`gallery-slide-${pi}`}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                {page.map((g, i) => (
                                    <div
                                        key={`${pi}-${i}`}
                                        data-testid={`gallery-image-${pi}-${i}`}
                                        className="overflow-hidden rounded-2xl bg-white aspect-square"
                                    >
                                        <img
                                            src={g.src}
                                            alt={`Happy smile ${pi * perPage + i + 1}`}
                                            style={{ objectPosition: g.pos }}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {pages.length > 1 && (
                <div className="mt-8 md:mt-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {snaps.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => scrollTo(i)}
                                aria-label={`Go to gallery page ${i + 1}`}
                                data-testid={`gallery-dot-${i}`}
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
                            aria-label="Previous gallery page"
                            data-testid="gallery-prev"
                            className="h-11 w-11 rounded-full border border-black/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] flex items-center justify-center transition-colors"
                        >
                            <ChevronLeft size={18} strokeWidth={1.7} />
                        </button>
                        <button
                            type="button"
                            onClick={scrollNext}
                            aria-label="Next gallery page"
                            data-testid="gallery-next"
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

export default GalleryCarousel;
