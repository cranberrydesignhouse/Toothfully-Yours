"use client";

const WHATSAPP_URL =
    "https://wa.me/919769005504?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation.";

const openWhatsapp = (e) => {
    e.preventDefault();
    // Use window.open at top-level so it works even when the page is rendered inside an iframe (e.g. preview wrappers).
    const win =
        (typeof window !== "undefined" && window.top) || window;
    try {
        win.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
    } catch {
        window.location.href = WHATSAPP_URL;
    }
};

// Official WhatsApp glyph (simplified path, public-domain brand mark)
const WhatsappIcon = ({ size = 28 }) => (
    <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden="true"
        className="relative"
    >
        <path d="M16.001 3.2C8.927 3.2 3.2 8.927 3.2 16.001c0 2.26.595 4.466 1.724 6.41L3.2 28.8l6.55-1.715a12.78 12.78 0 0 0 6.251 1.62h.005c7.074 0 12.8-5.727 12.8-12.801C28.806 8.927 23.075 3.2 16.001 3.2zm0 23.358h-.004a10.62 10.62 0 0 1-5.413-1.482l-.388-.231-4.025 1.055 1.075-3.926-.253-.402a10.604 10.604 0 0 1-1.624-5.671c0-5.864 4.772-10.636 10.636-10.636 2.842 0 5.512 1.108 7.521 3.119a10.566 10.566 0 0 1 3.115 7.522c0 5.864-4.772 10.652-10.64 10.652zm5.84-7.974c-.32-.16-1.893-.935-2.187-1.042-.293-.106-.506-.16-.72.16-.213.32-.825 1.041-1.011 1.255-.187.213-.373.24-.693.08-.32-.16-1.352-.498-2.574-1.589-.951-.849-1.594-1.898-1.78-2.218-.187-.32-.02-.494.14-.654.144-.143.32-.373.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.988-2.374-.26-.624-.524-.539-.72-.549-.187-.009-.4-.011-.613-.011-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.668 0 1.574 1.146 3.094 1.306 3.307.16.213 2.255 3.444 5.464 4.83.764.33 1.36.527 1.825.674.767.244 1.466.21 2.018.127.616-.092 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
    </svg>
);

export const WhatsappFab = () => (
    <a
        href={WHATSAPP_URL}
        onClick={openWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        data-testid="whatsapp-fab"
        className="group fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 h-14 w-14 md:h-[60px] md:w-[60px] rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.65)] flex items-center justify-center hover:bg-[#1FBA58] hover:scale-105 active:scale-95 transition-all duration-300"
    >
        <WhatsappIcon size={28} />
    </a>
);

export default WhatsappFab;