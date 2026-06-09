import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Each credential maps to one or more certificate PDFs.
// `id` is used for stable keys, `label` is the badge text,
// `certs` is an ordered list of { title, src } objects.
export const CREDENTIALS = {
    "nyu-dds": {
        id: "nyu-dds",
        label: "NYU DDS",
        certs: [
            {
                title: "Doctor of Dental Surgery, New York University",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/fyqn9pf8_NYU%20DDS.pdf",
            },
        ],
    },
    "nj-license": {
        id: "nj-license",
        label: "New Jersey Professional License",
        certs: [
            {
                title: "New Jersey Dental License",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/tfi11s22_New%20Jersey%20License.pdf",
            },
        ],
    },
    "dentist-registration": {
        id: "dentist-registration",
        label: "Dentist Registration Certificate",
        certs: [
            {
                title: "Dentist Registration",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/nccvaden_Dentist%20Registration%20-%20Am%20copy.pdf",
            },
        ],
    },
    "bachelors-degree": {
        id: "bachelors-degree",
        label: "Bachelor's Degree",
        certs: [
            {
                title: "Bachelor's Degree",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/tmhvkyt0_Bachelors%20degree.pdf",
            },
        ],
    },
    "sleep-apnea": {
        id: "sleep-apnea",
        label: "Sleep Apnea Training",
        certs: [
            {
                title: "Sleep Apnea Training",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/des1rdvx_Sleep%20apnea.pdf",
            },
        ],
    },
};

// Page → credential id list. Only IDs present in CREDENTIALS will render.
export const PAGE_CREDENTIALS = {
    home: ["nyu-dds", "nj-license", "dentist-registration", "bachelors-degree"],
    "global-access": ["nyu-dds", "nj-license"],
    cosmetic: ["nyu-dds"],
    implants: ["nyu-dds"],
    neuromuscular: ["nyu-dds", "sleep-apnea"],
    alignment: ["nyu-dds"],
};

const CertificateViewer = ({ credential, onClose }) => {
    const { certs, label } = credential;
    const [idx, setIdx] = useState(0);
    const total = certs.length;
    const cur = certs[idx];

    const prev = useCallback(
        () => setIdx((i) => (i - 1 + total) % total),
        [total]
    );
    const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

    // Keyboard navigation + body scroll lock.
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowLeft" && total > 1) prev();
            else if (e.key === "ArrowRight" && total > 1) next();
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose, prev, next, total]);

    // Touch swipe.
    const [touchStart, setTouchStart] = useState(null);
    const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
    const onTouchEnd = (e) => {
        if (touchStart == null || total < 2) return;
        const delta = e.changedTouches[0].clientX - touchStart;
        if (delta > 60) prev();
        else if (delta < -60) next();
        setTouchStart(null);
    };

    return (
        <div
            data-testid="credential-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${label} certificate viewer`}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl max-h-[90vh] bg-[#FBF8F4] rounded-3xl shadow-[0_50px_120px_-30px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                {/* Header */}
                <div className="flex items-start justify-between px-6 md:px-8 pt-6 md:pt-7 pb-4 border-b border-black/8">
                    <div className="pr-3">
                        <p className="font-dmsans text-[0.66rem] tracking-[0.22em] uppercase text-[#EB8A2C] font-semibold">
                            {label}
                        </p>
                        <h3 className="mt-1.5 font-dmsans font-semibold text-[1.05rem] md:text-[1.2rem] text-[#1A1A1A] tracking-tight leading-snug">
                            {cur.title}
                        </h3>
                        {total > 1 && (
                            <p className="mt-1 font-dmsans text-[0.78rem] text-[#5C5C5C]">
                                {idx + 1} of {total}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        data-testid="credential-modal-close"
                        className="shrink-0 h-9 w-9 rounded-full bg-white border border-black/10 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center justify-center"
                    >
                        <X size={16} strokeWidth={2} />
                    </button>
                </div>

                {/* Body — PDF embed */}
                <div className="relative flex-1 min-h-0 bg-[#E9E4DC] select-none">
                    {/* Disable right-click & drag on the iframe wrapper for a more "view-only" feel */}
                    <iframe
                        key={cur.src}
                        src={`${cur.src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        title={cur.title}
                        className="w-full h-full min-h-[60vh]"
                        loading="lazy"
                    />
                    {total > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={prev}
                                aria-label="Previous certificate"
                                data-testid="credential-modal-prev"
                                className="absolute top-1/2 left-3 -translate-y-1/2 h-11 w-11 rounded-full bg-white text-[#1A1A1A] shadow-[0_10px_28px_-12px_rgba(0,0,0,0.4)] hover:bg-[#1A1A1A] hover:text-white flex items-center justify-center transition-colors"
                            >
                                <ChevronLeft size={18} strokeWidth={1.7} />
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                aria-label="Next certificate"
                                data-testid="credential-modal-next"
                                className="absolute top-1/2 right-3 -translate-y-1/2 h-11 w-11 rounded-full bg-[#EB8A2C] text-white shadow-[0_10px_28px_-12px_rgba(235,138,44,0.55)] hover:bg-[#D97A1B] flex items-center justify-center transition-colors"
                            >
                                <ChevronRight size={18} strokeWidth={1.7} />
                            </button>
                        </>
                    )}
                </div>

                {/* Dots */}
                {total > 1 && (
                    <div className="flex items-center justify-center gap-2 py-4 bg-[#FBF8F4]">
                        {certs.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setIdx(i)}
                                aria-label={`Show certificate ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    idx === i
                                        ? "w-7 bg-[#EB8A2C]"
                                        : "w-2.5 bg-black/15 hover:bg-black/30"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const CredentialBadges = ({ page, className = "" }) => {
    const ids = PAGE_CREDENTIALS[page] || [];
    const items = ids
        .map((id) => CREDENTIALS[id])
        .filter(Boolean);
    const [activeId, setActiveId] = useState(null);

    if (items.length === 0) return null;

    const active = items.find((c) => c.id === activeId);

    return (
        <>
            <div
                data-testid="credential-badges"
                className={`mt-9 flex flex-wrap gap-2.5 ${className}`}
            >
                {items.map((c) => (
                    <button
                        key={c.id}
                        type="button"
                        onClick={() => setActiveId(c.id)}
                        data-testid={`credential-${c.id}`}
                        className="group font-dmsans text-xs tracking-wider uppercase px-3.5 py-2 rounded-full border border-[#EB8A2C]/40 text-[#EB8A2C] hover:bg-[#EB8A2C] hover:text-white hover:border-[#EB8A2C] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(235,138,44,0.55)] transition-all duration-300 cursor-pointer"
                    >
                        {c.label}
                    </button>
                ))}
            </div>
            {active && (
                <CertificateViewer
                    credential={active}
                    onClose={() => setActiveId(null)}
                />
            )}
        </>
    );
};

export default CredentialBadges;
