import { useState } from "react";

const TABS = [
    {
        id: "veneers",
        label: "Dental Veneers",
        items: [
            {
                before: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80",
                after: "https://images.unsplash.com/photo-1581059729226-c493d3086748?auto=format&fit=crop&w=900&q=80",
                note: "Discoloured enamel → porcelain veneers",
            },
            {
                before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
                after: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
                note: "Chipped front teeth → seamless veneers",
            },
            {
                before: "https://images.unsplash.com/photo-1581585093540-7e0c44a9a046?auto=format&fit=crop&w=900&q=80",
                after: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=900&q=80",
                note: "Uneven shape → contoured ceramics",
            },
        ],
    },
    {
        id: "smile-design",
        label: "Smile Design",
        items: [
            {
                before: "https://images.unsplash.com/photo-1559588944-c2b9fbd8b8a3?auto=format&fit=crop&w=900&q=80",
                after: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80",
                note: "Full smile makeover, upper arch",
            },
            {
                before: "https://images.unsplash.com/photo-1581585093540-7e0c44a9a046?auto=format&fit=crop&w=900&q=80",
                after: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
                note: "Bite + alignment correction",
            },
            {
                before: "https://images.unsplash.com/photo-1559586784-3f1c39e7d59e?auto=format&fit=crop&w=900&q=80",
                after: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
                note: "Reshaping & contouring",
            },
        ],
    },
    {
        id: "whitening",
        label: "Teeth Whitening",
        items: [
            {
                before: "https://images.unsplash.com/photo-1581585093540-7e0c44a9a046?auto=format&fit=crop&w=900&q=80",
                after: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=900&q=80",
                note: "In-clinic professional whitening",
            },
            {
                before: "https://images.unsplash.com/photo-1559588944-c2b9fbd8b8a3?auto=format&fit=crop&w=900&q=80",
                after: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80",
                note: "Coffee staining lifted",
            },
            {
                before: "https://images.unsplash.com/photo-1559586784-3f1c39e7d59e?auto=format&fit=crop&w=900&q=80",
                after: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
                note: "Take-home + clinic combo",
            },
        ],
    },
];

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

            {/* Grid */}
            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
                {tab.items.map((item, i) => (
                    <article
                        key={`${tab.id}-${i}`}
                        data-testid={`ba-card-${tab.id}-${i}`}
                        className="bg-white rounded-3xl overflow-hidden shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_70px_-40px_rgba(0,0,0,0.35)]"
                    >
                        <div className="grid grid-cols-2">
                            <div className="relative aspect-[4/5] overflow-hidden group">
                                <img
                                    src={item.before}
                                    alt={`Before — ${item.note}`}
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
                                    alt={`After — ${item.note}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                />
                                <span className="absolute top-3 right-3 font-dmsans text-[0.6rem] tracking-[0.18em] uppercase bg-[#EB8A2C] text-white rounded-full px-2.5 py-1">
                                    After
                                </span>
                            </div>
                        </div>
                        <p className="px-5 py-4 font-dmsans text-[0.85rem] text-[#5C5C5C]">
                            {item.note}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default BeforeAfterGallery;
