import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const isImage = (src) =>
    /\.(jpe?g|png|webp|gif|avif|heic|heif)(\?|#|$)/i.test(src || "");
const isPdf = (src) => /\.pdf(\?|#|$)/i.test(src || "");

// Each credential maps to one or more certificate files.
export const CREDENTIALS = {
    "nyu-dds": {
        id: "nyu-dds",
        label: "NYU DDS",
        certs: [
            {
                title: "Doctor of Dental Surgery · New York University",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/37fgzm6e_NYU%20DDS_page-0001.jpg",
            },
        ],
    },
    "nj-license": {
        id: "nj-license",
        label: "New Jersey Professional License",
        certs: [
            {
                title: "New Jersey State Board of Dentistry · Licensed to Practice",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/2orhnhyb_New%20Jersey%20License_page-0001.jpg",
            },
        ],
    },
    "dentist-registration": {
        id: "dentist-registration",
        label: "Dentist Registration",
        certs: [
            {
                title: "Dentist Registration Certificate · India",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/kzfo6qjw_Dentist%20Registration%20-%20Am%20copy_page-0001.jpg",
            },
        ],
    },
    "bachelors-degree": {
        id: "bachelors-degree",
        label: "Bachelor's Degree",
        certs: [
            {
                title: "Bachelor of Dental Surgery · Maharashtra University of Health Sciences",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/4gt4ks6t_Bachelors%20degree_page-0001.jpg",
            },
        ],
    },
    "sleep-apnea": {
        id: "sleep-apnea",
        label: "Sleep Apnea Training",
        certs: [
            {
                title: "Smile USA · TMJ / TMD / Orofacial Pain · Sleep Medicine & OSA Program, 2019",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/9eekao7t_Sleep%20apnea_page-0001.jpg",
            },
        ],
    },
    acdi: {
        id: "acdi",
        label: "Academy of Cosmetic Dentistry India",
        certs: [
            {
                title: "8th ACDI Conference · Novotel Juhu, Mumbai · 2024",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/z3atb094_ACDI%203.jpeg",
            },
            {
                title: "Masterclass on Tooth Wear · Le Meridien New Delhi · 2026",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/3gtqxu20_ACDI%20Masterclass.jpg",
            },
            {
                title: "3rd Cons Asia & 9th ACDI · Indirect Anterior Bonded Restorations",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/gnwh6usv_ACDI%201.jpg",
            },
            {
                title: "3rd Cons Asia & 9th ACDI · Injectable Composite Workshop",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/x9byl3p6_ACDI%202.jpg",
            },
        ],
    },
    "pearl-academy": {
        id: "pearl-academy",
        label: "Pearl Academy",
        certs: [
            {
                title: "Posterior Complex Restoration Course · Pearl Dental Academy, Chennai",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/ogk1y1r0_PEARL%20ACADEMY.jpg",
            },
        ],
    },
    "impart-education": {
        id: "impart-education",
        label: "Impart Education",
        certs: [
            {
                title: "Extraction & Immediate Implant Placement Protocols · Hands-on Training, 2022",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/nh68clbp_Impart%20education.pdf",
            },
        ],
    },
    biohorizons: {
        id: "biohorizons",
        label: "BioHorizons",
        certs: [
            {
                title: "BioHorizons Implant Training · Certificate I",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/nugjy3tp_Bio%20Horizons%201.jpg",
            },
            {
                title: "BioHorizons Implant Training · Certificate II",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/zjqy9hsx_Bio%20horizons%202.jpg",
            },
        ],
    },
    iti: {
        id: "iti",
        label: "ITI Curriculum",
        certs: [
            {
                title: "ITI Certificate in Implant Dentistry · Foundation Level, 2019",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/eifav263_ITI%20Curiculum.jpg",
            },
        ],
    },
    "smile-usa": {
        id: "smile-usa",
        label: "Smile USA",
        certs: [
            {
                title: "Smile USA Academy · Biomaterials, Biomechanics & Biologics · Mumbai, 2023",
                src: "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/5rzr94ry_Smile%20USA.pdf",
            },
        ],
    },
};

// Page → credential id list. Only IDs present in CREDENTIALS will render.
export const PAGE_CREDENTIALS = {
    home: ["nyu-dds", "nj-license", "dentist-registration", "bachelors-degree"],
    "global-access": ["nyu-dds", "nj-license", "dentist-registration"],
    cosmetic: ["nyu-dds", "dentist-registration", "acdi", "pearl-academy"],
    implants: [
        "nyu-dds",
        "dentist-registration",
        "iti",
        "impart-education",
        "biohorizons",
        "smile-usa",
    ],
    neuromuscular: ["nyu-dds", "dentist-registration", "sleep-apnea"],
    alignment: ["nyu-dds", "dentist-registration"],
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

const Lightbox = ({ credential, onClose }) => {
    const { certs, label } = credential;
    const [idx, setIdx] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const imgRef = useRef(null);
    const containerRef = useRef(null);
    const total = certs.length;
    const cur = certs[idx];

    const resetTransform = () => {
        setZoom(1);
        setOffset({ x: 0, y: 0 });
    };

    const prev = useCallback(() => {
        setIdx((i) => (i - 1 + total) % total);
        resetTransform();
    }, [total]);
    const next = useCallback(() => {
        setIdx((i) => (i + 1) % total);
        resetTransform();
    }, [total]);

    // Keyboard nav + body scroll lock.
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowLeft" && total > 1) prev();
            else if (e.key === "ArrowRight" && total > 1) next();
            else if (e.key === "+" || e.key === "=")
                setZoom((z) => Math.min(z + 0.5, MAX_ZOOM));
            else if (e.key === "-" || e.key === "_")
                setZoom((z) => Math.max(z - 0.5, MIN_ZOOM));
            else if (e.key === "0") resetTransform();
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose, prev, next, total]);

    // Double-click zoom (desktop)
    const onDoubleClick = (e) => {
        if (!isImage(cur.src)) return;
        e.stopPropagation();
        setZoom((z) => (z > 1 ? 1 : 2.25));
        setOffset({ x: 0, y: 0 });
    };

    // Touch handlers: pinch zoom + pan + swipe nav.
    const touchState = useRef({
        startX: null,
        startY: null,
        startDist: null,
        startZoom: 1,
        panStart: null,
    });

    const dist = (a, b) =>
        Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

    const onTouchStart = (e) => {
        if (e.touches.length === 2) {
            touchState.current.startDist = dist(e.touches[0], e.touches[1]);
            touchState.current.startZoom = zoom;
        } else if (e.touches.length === 1) {
            const t = e.touches[0];
            touchState.current.startX = t.clientX;
            touchState.current.startY = t.clientY;
            touchState.current.panStart = { ...offset };
        }
    };

    const onTouchMove = (e) => {
        if (e.touches.length === 2 && touchState.current.startDist) {
            const d = dist(e.touches[0], e.touches[1]);
            const next = (touchState.current.startZoom * d) /
                touchState.current.startDist;
            setZoom(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next)));
            e.preventDefault();
        } else if (e.touches.length === 1 && zoom > 1) {
            const t = e.touches[0];
            const dx = t.clientX - touchState.current.startX;
            const dy = t.clientY - touchState.current.startY;
            setOffset({
                x: (touchState.current.panStart?.x || 0) + dx,
                y: (touchState.current.panStart?.y || 0) + dy,
            });
            e.preventDefault();
        }
    };

    const onTouchEnd = (e) => {
        // Single-finger swipe to navigate when not zoomed
        if (
            zoom === 1 &&
            total > 1 &&
            touchState.current.startX != null &&
            e.changedTouches.length === 1
        ) {
            const delta = e.changedTouches[0].clientX - touchState.current.startX;
            const dy =
                Math.abs(e.changedTouches[0].clientY - touchState.current.startY);
            if (Math.abs(delta) > 60 && dy < 80) {
                if (delta > 0) prev();
                else next();
            }
        }
        touchState.current.startX = null;
        touchState.current.startY = null;
        touchState.current.startDist = null;
        touchState.current.panStart = null;
    };

    // Mouse-drag pan (desktop) when zoomed in.
    const mouseState = useRef({ startX: 0, startY: 0 });
    const [dragging, setDragging] = useState(false);
    const onMouseDown = (e) => {
        if (zoom <= 1 || !isImage(cur.src)) return;
        mouseState.current = {
            startX: e.clientX - offset.x,
            startY: e.clientY - offset.y,
        };
        setDragging(true);
    };
    const onMouseMove = (e) => {
        if (!dragging) return;
        setOffset({
            x: e.clientX - mouseState.current.startX,
            y: e.clientY - mouseState.current.startY,
        });
    };
    const onMouseUp = () => setDragging(false);

    // Wheel zoom on desktop
    const onWheel = (e) => {
        if (!isImage(cur.src)) return;
        if (!e.ctrlKey && !e.metaKey && e.deltaY === 0) return;
        e.preventDefault();
        const delta = -e.deltaY * 0.005;
        setZoom((z) =>
            Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z + delta))
        );
    };

    const renderBody = () => {
        if (isImage(cur.src)) {
            return (
                <div
                    ref={containerRef}
                    className="w-full h-full flex items-center justify-center overflow-hidden touch-none"
                    onContextMenu={(e) => e.preventDefault()}
                    onWheel={onWheel}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    style={{
                        cursor:
                            zoom > 1
                                ? dragging
                                    ? "grabbing"
                                    : "grab"
                                : "zoom-in",
                    }}
                >
                    <img
                        ref={imgRef}
                        src={cur.src}
                        alt={cur.title}
                        draggable={false}
                        onDoubleClick={onDoubleClick}
                        className="max-w-full max-h-full object-contain select-none will-change-transform"
                        style={{
                            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
                            transition:
                                dragging
                                    ? "none"
                                    : "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    />
                </div>
            );
        }
        if (isPdf(cur.src)) {
            return (
                <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center p-4">
                    <iframe
                        key={cur.src}
                        src={`${cur.src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        title={cur.title}
                        className="w-full h-full max-w-5xl rounded-lg bg-white"
                        loading="lazy"
                    />
                </div>
            );
        }
        return null;
    };

    return (
        <div
            data-testid="credential-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${label} certificate viewer`}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* Top bar */}
            <div
                className="relative flex items-start justify-between px-4 md:px-8 py-4 md:py-5 text-white/90 pointer-events-none"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="pr-3 max-w-[78%] pointer-events-auto">
                    <p className="font-dmsans text-[0.66rem] md:text-[0.7rem] tracking-[0.22em] uppercase text-[#EB8A2C] font-semibold">
                        {label}
                    </p>
                    <h3 className="mt-1 font-dmsans font-medium text-[0.92rem] md:text-[1.05rem] tracking-tight leading-snug text-white/85 line-clamp-2">
                        {cur.title}
                    </h3>
                    {total > 1 && (
                        <p className="mt-1 font-dmsans text-[0.78rem] text-white/55">
                            {idx + 1} of {total}
                        </p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    data-testid="credential-modal-close"
                    className="pointer-events-auto shrink-0 h-11 w-11 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/15 hover:border-white transition-colors flex items-center justify-center"
                >
                    <X size={20} strokeWidth={1.8} />
                </button>
            </div>

            {/* Certificate stage */}
            <div
                className="flex-1 min-h-0 relative"
                onClick={(e) => {
                    // Click outside the image (but inside the stage) closes.
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                {renderBody()}

                {total > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            aria-label="Previous certificate"
                            data-testid="credential-modal-prev"
                            className="absolute top-1/2 left-3 md:left-6 -translate-y-1/2 h-11 w-11 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/15 hover:border-white flex items-center justify-center transition-colors"
                        >
                            <ChevronLeft size={20} strokeWidth={1.7} />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                next();
                            }}
                            aria-label="Next certificate"
                            data-testid="credential-modal-next"
                            className="absolute top-1/2 right-3 md:right-6 -translate-y-1/2 h-11 w-11 md:h-12 md:w-12 rounded-full bg-[#EB8A2C] hover:bg-[#D97A1B] text-white border border-[#EB8A2C] flex items-center justify-center transition-colors"
                        >
                            <ChevronRight size={20} strokeWidth={1.7} />
                        </button>
                    </>
                )}
            </div>

            {/* Bottom: dots + zoom hint */}
            <div
                className="px-4 md:px-8 pb-5 md:pb-6 pt-3 flex flex-col-reverse md:flex-row items-center gap-3 md:justify-between"
                onClick={(e) => e.stopPropagation()}
            >
                {total > 1 ? (
                    <div className="flex items-center gap-2">
                        {certs.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => {
                                    setIdx(i);
                                    resetTransform();
                                }}
                                aria-label={`Show certificate ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    idx === i
                                        ? "w-7 bg-[#EB8A2C]"
                                        : "w-2.5 bg-white/20 hover:bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
                ) : (
                    <div />
                )}
                {isImage(cur.src) && (
                    <p className="font-dmsans text-[0.68rem] md:text-[0.72rem] tracking-[0.16em] uppercase text-white/45 text-center">
                        <span className="hidden md:inline">
                            Double-click to zoom · Scroll or +/- to adjust · Drag to pan
                        </span>
                        <span className="md:hidden">
                            Pinch to zoom · Drag to pan
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export const CredentialBadges = ({ page, className = "" }) => {
    const ids = PAGE_CREDENTIALS[page] || [];
    const items = ids.map((id) => CREDENTIALS[id]).filter(Boolean);
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
            {active && typeof document !== "undefined" &&
                createPortal(
                    <Lightbox
                        credential={active}
                        onClose={() => setActiveId(null)}
                    />,
                    document.body,
                )}
        </>
    );
};

export default CredentialBadges;
