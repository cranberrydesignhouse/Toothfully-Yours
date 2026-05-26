import { useState } from "react";

// NOTE: These are placeholder pairings using existing customer-asset patient photos.
// Replace with real before/after pairs once supplied by the clinic.
const TABS = [
    {
        id: "veneers",
        label: "Dental Veneers",
        items: [
            {
                before: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/0lt9d93r_happy-smiles-6.webp",
                after: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/pwmpesji_happy-smiles-7%20copy.jpg",
                note: "Discoloured enamel to porcelain veneers",
            },
            {
                before: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/450lfsga_happy-smiles-10.jpg",
                after: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/vtjot904_happy-smiles-11%20copy.jpg",
                note: "Chipped front teeth to seamless veneers",
            },
            {
                before: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/1352cymq_happy-smiles-16.jpg",
                after: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/b6v1339i_happy-smiles-18%20copy.jpg",
                note: "Uneven shape to contoured ceramics",
            },
        ],
    },
    {
        id: "smile-design",
        label: "Smile Design",
        items: [
            {
                before: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/9pzucz03_happy-smiles-17.jpg",
                after: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/c4hycjsb_happy-smiles-19.jpg",
                note: "Full smile makeover, upper arch",
            },
            {
                before: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/5fgo7p2m_happy-smiles-20.jpg",
                after: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/2jrgncoo_happy-smiles-21.jpg",
                note: "Bite and alignment correction",
            },
            {
                before: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/38stcvur_happy-smiles-23.jpg",
                after: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/5ebsdfid_happy-smiles-26.jpg",
                note: "Reshaping and contouring",
            },
        ],
    },
    {
        id: "whitening",
        label: "Teeth Whitening",
        items: [
            {
                before: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/u6mx2190_happy-smiles-27.jpg",
                after: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/ll2i0mkx_happy-smiles-29.jpg",
                note: "In-clinic professional whitening",
            },
            {
                before: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/5kn1bway_happy-smiles-2%20copy.jpg",
                after: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/jf4w2vhu_happy-smiles-4%20copy.jpg",
                note: "Coffee staining lifted",
            },
            {
                before: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/6ahoqdmo_happy-smiles-3.webp",
                after: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/w76lxasr_happy-smiles-15.webp",
                note: "Brighter natural shade",
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
