import { useState } from "react";

// PLACEHOLDER pairings using existing customer-asset case photos.
// Replace with real before/after pairs for restorative cases once supplied.
const TABS = [
    {
        id: "implants",
        label: "Dental Implants",
        items: [
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/mkob0e76_cases-11.png",
                label: "Full Mouth Transformation",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/s4vujdr8_cases-10.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/ndtuy3c9_cases-31.png",
            },
        ],
    },
    {
        id: "crowns",
        label: "Dental Crowns",
        items: [
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/49ewoyos_cases-29.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/4umcpp6y_composite-veeneers%201.png",
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
        ],
    },
    {
        id: "fillings",
        label: "Fillings",
        items: [
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/8e8bykvc_dental-fill.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/njffdvgc_dental-fill2-scaled.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/krs23l9j_cases-22.png",
            },
        ],
    },
];

const RGCard = ({ item, testId }) => (
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
                    <span className="absolute top-[calc(50%+8px)] left-3 font-dmsans text-[0.6rem] tracking-[0.18em] uppercase bg-[#EB8A2C] text-white rounded-full px-2.5 py-1">
                        After
                    </span>
                </>
            )}
        </div>
    </article>
);

export const RestorationGallery = ({ activeId, onTabChange }) => {
    const [internalId, setInternalId] = useState(TABS[0].id);
    const current = activeId ?? internalId;
    const setId = onTabChange ?? setInternalId;
    const tab = TABS.find((t) => t.id === current) ?? TABS[0];

    return (
        <div data-testid="rg-gallery">
            {/* Tabs */}
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

            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
                {tab.items.map((item, i) => (
                    <RGCard
                        key={`${tab.id}-${i}`}
                        item={item}
                        testId={`rg-card-${tab.id}-${i}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default RestorationGallery;
