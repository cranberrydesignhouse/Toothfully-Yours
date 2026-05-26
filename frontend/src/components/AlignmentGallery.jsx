import { useState } from "react";

// PLACEHOLDER alignment cases using existing customer-asset patient photos.
// Replace with real orthodontic before/after pairs once supplied.
const TABS = [
    {
        id: "aligners",
        label: "Aligners",
        items: [
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/sr9dqtux_smile%20design%201.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/2tuf1fi7_cases-18.png",
            },
            {
                composite:
                    "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/49ewoyos_cases-29.png",
            },
        ],
    },
];

const AGCard = ({ item, testId }) => (
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

export const AlignmentGallery = () => {
    const [currentId, setCurrentId] = useState(TABS[0].id);
    const tab = TABS.find((t) => t.id === currentId) ?? TABS[0];

    return (
        <div data-testid="ag-gallery">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {TABS.map((t) => {
                    const active = t.id === currentId;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setCurrentId(t.id)}
                            data-testid={`ag-tab-${t.id}`}
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
                    <AGCard
                        key={`${tab.id}-${i}`}
                        item={item}
                        testId={`ag-card-${tab.id}-${i}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AlignmentGallery;
