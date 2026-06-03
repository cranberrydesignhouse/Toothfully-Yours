import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Check, ChevronDown } from "lucide-react";

// All base prices in INR. Single value = exact, [min, max] = range.
const PACKAGES = [
    {
        name: "Consultation & Preventive Care",
        bestFor: "Routine dental evaluation & cleaning",
        sessions: "1",
        treatmentTime: "Approx. 1.5 hours",
        stay: "Same day",
        result: "Immediate tartar & stain removal",
        priceInr: 5000,
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
        priceInr: 35000,
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
        priceInr: 15000,
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
        priceInr: 20000,
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
        priceInr: 80000,
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
        priceInr: [500000, 600000],
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
        priceInr: [900000, 1000000],
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
        priceInr: [275000, 450000],
        includes: [
            "Consultation & examination",
            "Digital scan",
            "Treatment planning",
            "Remote progress monitoring",
        ],
    },
];

// FX rates: `fallback` = target currency per 1 INR (approximate, early 2026).
// Live rates from open.er-api.com override these on mount.
const CURRENCIES = [
    { code: "USD", label: "US Dollar", flag: "🇺🇸", fallback: 1 / 84.5 },
    { code: "EUR", label: "Euro", flag: "🇪🇺", fallback: 1 / 91 },
    { code: "GBP", label: "British Pound", flag: "🇬🇧", fallback: 1 / 106 },
    { code: "AED", label: "UAE Dirham", flag: "🇦🇪", fallback: 1 / 23 },
    { code: "SAR", label: "Saudi Riyal", flag: "🇸🇦", fallback: 1 / 22.5 },
    { code: "QAR", label: "Qatari Riyal", flag: "🇶🇦", fallback: 1 / 23.2 },
    { code: "KWD", label: "Kuwaiti Dinar", flag: "🇰🇼", fallback: 1 / 274 },
    { code: "OMR", label: "Omani Rial", flag: "🇴🇲", fallback: 1 / 219 },
    { code: "BHD", label: "Bahraini Dinar", flag: "🇧🇭", fallback: 1 / 224 },
    { code: "AUD", label: "Australian Dollar", flag: "🇦🇺", fallback: 1 / 55 },
    { code: "CAD", label: "Canadian Dollar", flag: "🇨🇦", fallback: 1 / 60.5 },
    { code: "NZD", label: "NZ Dollar", flag: "🇳🇿", fallback: 1 / 50 },
    { code: "SGD", label: "Singapore Dollar", flag: "🇸🇬", fallback: 1 / 63 },
    { code: "HKD", label: "Hong Kong Dollar", flag: "🇭🇰", fallback: 1 / 10.8 },
    { code: "JPY", label: "Japanese Yen", flag: "🇯🇵", fallback: 0.55 },
    { code: "CHF", label: "Swiss Franc", flag: "🇨🇭", fallback: 1 / 93 },
    { code: "MYR", label: "Malaysian Ringgit", flag: "🇲🇾", fallback: 1 / 18.5 },
    { code: "THB", label: "Thai Baht", flag: "🇹🇭", fallback: 0.4 },
    { code: "ZAR", label: "South African Rand", flag: "🇿🇦", fallback: 0.21 },
    { code: "INR", label: "Indian Rupee", flag: "🇮🇳", fallback: 1 },
];

// ISO country code → supported currency code.
const COUNTRY_TO_CURRENCY = {
    // GCC
    AE: "AED", SA: "SAR", QA: "QAR", KW: "KWD", OM: "OMR", BH: "BHD",
    // Anglosphere & APAC
    US: "USD", GB: "GBP", CA: "CAD", AU: "AUD", NZ: "NZD",
    SG: "SGD", HK: "HKD", JP: "JPY", CH: "CHF", MY: "MYR", TH: "THB",
    ZA: "ZAR", IN: "INR",
    // Eurozone
    DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR",
    AT: "EUR", PT: "EUR", IE: "EUR", FI: "EUR", GR: "EUR", LU: "EUR",
    CY: "EUR", MT: "EUR", SK: "EUR", SI: "EUR", EE: "EUR", LV: "EUR",
    LT: "EUR", HR: "EUR",
};

const SUPPORTED_CODES = new Set(CURRENCIES.map((c) => c.code));
const STORAGE_KEY = "ty_currency";

const detectFromLocale = () => {
    if (typeof navigator === "undefined") return null;
    const region = (navigator.language || "").split("-")[1]?.toUpperCase();
    return region ? COUNTRY_TO_CURRENCY[region] || null : null;
};

const detectFromIP = async () => {
    try {
        const res = await fetch("https://ipapi.co/json/", {
            cache: "no-store",
        });
        if (!res.ok) return null;
        const data = await res.json();
        const byCountry = COUNTRY_TO_CURRENCY[data?.country_code];
        if (byCountry) return byCountry;
        if (data?.currency && SUPPORTED_CODES.has(data.currency))
            return data.currency;
        return null;
    } catch {
        return null;
    }
};

const fetchLiveRates = async () => {
    try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD", {
            cache: "no-store",
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data?.result !== "success" || !data?.rates?.INR) return null;
        return data.rates;
    } catch {
        return null;
    }
};

const roundNice = (n) => {
    if (n >= 10000) return Math.round(n / 1000) * 1000;
    if (n >= 1000) return Math.round(n / 100) * 100;
    if (n >= 100) return Math.round(n / 10) * 10;
    if (n >= 10) return Math.round(n);
    return Math.round(n * 10) / 10;
};

const formatAmount = (amount, currency) => {
    const value = roundNice(amount * currency.rate);
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.code,
            maximumFractionDigits: value >= 10 ? 0 : 1,
            minimumFractionDigits: 0,
        }).format(value);
    } catch {
        return `${currency.code} ${value.toLocaleString("en-US")}`;
    }
};

const formatPrice = (priceInr, currency) => {
    if (Array.isArray(priceInr)) {
        return `${formatAmount(priceInr[0], currency)} – ${formatAmount(priceInr[1], currency)}`;
    }
    return formatAmount(priceInr, currency);
};

const CurrencyPicker = ({ value, onChange }) => (
    <div className="relative inline-flex items-center w-full sm:w-auto">
        <span className="hidden sm:block absolute left-4 font-dmsans text-[0.62rem] tracking-[0.18em] uppercase text-[#5C5C5C] pointer-events-none">
            Show in
        </span>
        <select
            value={value.code}
            onChange={(e) =>
                onChange(
                    CURRENCIES.find((c) => c.code === e.target.value) ??
                        CURRENCIES[0],
                )
            }
            data-testid="packages-currency-select"
            aria-label="Choose pricing currency"
            className="appearance-none w-full sm:w-auto pl-4 sm:pl-[5.25rem] pr-10 py-3 rounded-full bg-white border border-black/10 font-dmsans text-[0.92rem] font-semibold text-[#1A1A1A] tracking-tight hover:border-[#EB8A2C] focus:outline-none focus:border-[#EB8A2C] transition-colors cursor-pointer"
        >
            {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                    {`${c.flag} ${c.code} · ${c.label}`}
                </option>
            ))}
        </select>
        <ChevronDown
            size={16}
            strokeWidth={1.8}
            className="absolute right-4 text-[#5C5C5C] pointer-events-none"
        />
    </div>
);

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

const PackageCard = ({ p, index, currency }) => (
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
                    <span
                        data-testid={`package-price-${index}`}
                        className="font-dmsans font-semibold text-[1.4rem] md:text-[1.55rem] text-[#1A1A1A] tracking-tight"
                    >
                        {formatPrice(p.priceInr, currency)}
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
    // Currency code state (USD default, hydrated from localStorage synchronously to avoid flash for returning users).
    const [currencyCode, setCurrencyCode] = useState(() => {
        try {
            const stored =
                typeof window !== "undefined" &&
                window.localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED_CODES.has(stored)) return stored;
        } catch {
            /* ignore */
        }
        return "USD";
    });
    const [liveRates, setLiveRates] = useState(null);
    const [userPicked, setUserPicked] = useState(false);

    // Auto-detect on first visit (no stored choice yet).
    useEffect(() => {
        let cancelled = false;
        const stored =
            typeof window !== "undefined" &&
            window.localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED_CODES.has(stored)) return; // respect stored
        // Fast locale guess, then IP refinement
        const localeGuess = detectFromLocale();
        if (localeGuess && SUPPORTED_CODES.has(localeGuess)) {
            setCurrencyCode(localeGuess);
        }
        (async () => {
            const ip = await detectFromIP();
            if (cancelled || userPicked) return;
            if (ip && SUPPORTED_CODES.has(ip)) {
                setCurrencyCode(ip);
            }
        })();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Live FX rates (USD base) → compute per-INR multipliers.
    useEffect(() => {
        let cancelled = false;
        (async () => {
            const rates = await fetchLiveRates();
            if (cancelled || !rates) return;
            const inrPerUsd = rates.INR;
            const computed = {};
            CURRENCIES.forEach((c) => {
                const r = rates[c.code];
                computed[c.code] = r ? r / inrPerUsd : c.fallback;
            });
            setLiveRates(computed);
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const currency = useMemo(() => {
        const meta =
            CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
        const rate = liveRates?.[meta.code] ?? meta.fallback;
        return { ...meta, rate };
    }, [currencyCode, liveRates]);

    const setCurrency = useCallback((next) => {
        const code = typeof next === "string" ? next : next?.code;
        if (!code || !SUPPORTED_CODES.has(code)) return;
        setCurrencyCode(code);
        setUserPicked(true);
        try {
            window.localStorage.setItem(STORAGE_KEY, code);
        } catch {
            /* ignore */
        }
    }, []);

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
                <p className="font-dmsans text-[0.92rem] text-[#5C5C5C] leading-relaxed max-w-md">
                    Prices are approximate and shown in your selected currency
                    for reference only. Final estimates are confirmed at
                    consultation.
                </p>
                <CurrencyPicker value={currency} onChange={setCurrency} />
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-5 md:gap-6 items-stretch">
                    {PACKAGES.map((p, i) => (
                        <div
                            key={p.name}
                            className="flex-[0_0_88%] sm:flex-[0_0_60%] lg:flex-[0_0_38%] xl:flex-[0_0_32%] min-w-0 flex"
                        >
                            <PackageCard
                                p={p}
                                index={i}
                                currency={currency}
                            />
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
