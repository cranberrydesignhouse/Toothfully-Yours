import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const REVIEWS = [
    {
        name: "Ismeet Kohli",
        initial: "I",
        color: "#C9356F",
        meta: "3 reviews · 5 months ago",
        quote: "I've been going to Dr. Amruta at Toothfully Yours for over a year now, and I genuinely can't recommend her enough. She's incredibly meticulous, patient, and kind — qualities that are rare to find together. What really stands out is how detail-oriented she is, and how she goes the extra mile to make sure the issue is fully taken care of, not just temporarily fixed. She never recommends a procedure unless it's truly necessary and strongly believes in preserving natural teeth for as long as possible. Grateful to have found a dentist like her.",
    },
    {
        name: "Chandru Watwani",
        initial: "C",
        color: "#7C4DFF",
        meta: "2 reviews · 8 months ago",
        quote: "I had come to Toothfully Yours Dental clinic for my dental problems and met Dr Amruta. She checked my dental problems and advised me to go for dental implants — six lower and six upper. The procedure was long but very well done with due care taken. Earlier it was embarrassing to even smile and laugh, but after the implants I can eat and chew just like normal teeth and smile at will. Dr Amruta took good care of the procedure with minimum pain.",
    },
    {
        name: "Shivalika Tandon",
        initial: "S",
        color: "#E37A2D",
        meta: "2 reviews · 6 months ago",
        quote: "I had an excellent experience with Dr. Amruta Godbole. She's a highly skilled, gentle, and caring dentist who takes the time to explain every step and make you feel completely at ease. The clinic is clean, modern, and well-equipped, and her team is very professional. I'm really happy with my treatment and would highly recommend her to anyone looking for quality, trustworthy dental care.",
    },
    {
        name: "Roshan Rathod",
        initial: "R",
        color: "#FFB400",
        meta: "7 reviews · 5 months ago",
        quote: "I have been terrified of dentists all my life and hence suffered poor oral health — but Dr Godbole and her colleagues were exceptional in not only physically taking care of me but calming me down too. They have literally helped me get over my fear of dentists. I've had multiple visits that include a tooth extraction as well, which was a complicated surgery but was done so craftily. Thank you Toothfully Yours for genuinely being ours.",
    },
    {
        name: "Rathore Spice Factory",
        initial: "R",
        color: "#8B5E3C",
        meta: "1 review · 5 months ago",
        quote: "After visiting multiple so-called 'top' dental clinics across Mumbai, the first thing that struck me at Toothfully Yours was how genuinely patient-centric the space felt. Toothfully Yours offered a level of precision, hygiene, and genuine care that immediately put me at ease. Dr. Amruta's treatment approach is meticulous — every step is explained, every concern addressed, nothing rushed or mechanical. For anyone looking for high-quality dental care, Dr. Amruta Godbole and Toothfully Yours are in a completely different league.",
    },
];

export const TestimonialsCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 768px)": { slidesToScroll: 1 },
        },
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const scrollPrev = useCallback(
        () => emblaApi?.scrollPrev(),
        [emblaApi],
    );
    const scrollNext = useCallback(
        () => emblaApi?.scrollNext(),
        [emblaApi],
    );
    const scrollTo = useCallback(
        (i) => emblaApi?.scrollTo(i),
        [emblaApi],
    );

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        setScrollSnaps(emblaApi.scrollSnapList());
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", () => {
            setScrollSnaps(emblaApi.scrollSnapList());
            onSelect();
        });
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    // Autoplay
    useEffect(() => {
        if (!emblaApi) return;
        const id = setInterval(() => {
            if (!document.hidden) emblaApi.scrollNext();
        }, 6500);
        return () => clearInterval(id);
    }, [emblaApi]);

    return (
        <div data-testid="testimonials-carousel" className="relative">
            <div
                className="overflow-hidden -mx-3 md:-mx-4"
                ref={emblaRef}
            >
                <div className="flex">
                    {REVIEWS.map((r, i) => (
                        <div
                            key={r.name}
                            data-testid={`testimonial-card-${i}`}
                            className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3 md:px-4"
                        >
                            <ReviewCard r={r} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center justify-between">
                {/* Dots */}
                <div className="flex items-center gap-2">
                    {scrollSnaps.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => scrollTo(i)}
                            aria-label={`Go to review ${i + 1}`}
                            data-testid={`testimonial-dot-${i}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                selectedIndex === i
                                    ? "w-7 bg-[#EB8A2C]"
                                    : "w-2.5 bg-black/15 hover:bg-black/30"
                            }`}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={scrollPrev}
                        aria-label="Previous review"
                        data-testid="testimonial-prev"
                        className="h-11 w-11 rounded-full border border-black/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft size={18} strokeWidth={1.7} />
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
                        aria-label="Next review"
                        data-testid="testimonial-next"
                        className="h-11 w-11 rounded-full bg-[#EB8A2C] text-white hover:bg-[#D97A1B] flex items-center justify-center transition-colors"
                    >
                        <ChevronRight size={18} strokeWidth={1.7} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ReviewCard = ({ r }) => (
    <article className="h-full bg-white rounded-3xl p-7 md:p-8 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)] flex flex-col min-h-[420px]">
        {/* Header */}
        <div className="flex items-center gap-3">
            <div
                className="h-11 w-11 rounded-full flex items-center justify-center text-white font-dmsans font-semibold text-base shrink-0"
                style={{ backgroundColor: r.color }}
            >
                {r.initial}
            </div>
            <div className="min-w-0">
                <p className="font-dmsans font-medium text-[1rem] text-[#1A1A1A] leading-tight truncate">
                    {r.name}
                </p>
                <p className="font-dmsans text-[0.72rem] text-[#5C5C5C] mt-0.5 truncate">
                    {r.meta}
                </p>
            </div>
            {/* Google G */}
            <svg
                viewBox="0 0 24 24"
                className="ml-auto h-5 w-5 shrink-0"
                aria-label="Google review"
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
        </div>

        {/* Stars */}
        <div className="mt-4 flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((s) => (
                <Star
                    key={s}
                    size={15}
                    fill="#FBBC05"
                    color="#FBBC05"
                    strokeWidth={0}
                />
            ))}
        </div>

        {/* Quote */}
        <p className="mt-5 font-dmsans text-[0.95rem] leading-[1.65] text-[#1A1A1A]/85 flex-1">
            {r.quote}
        </p>
    </article>
);

export default TestimonialsCarousel;
