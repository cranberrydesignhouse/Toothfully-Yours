import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
    "https://wa.me/919769005504?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation.";

export const WhatsappFab = () => (
    <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        data-testid="whatsapp-fab"
        className="group fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 h-14 w-14 md:h-[60px] md:w-[60px] rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.65)] flex items-center justify-center hover:bg-[#1FBA58] hover:scale-105 active:scale-95 transition-all duration-300"
    >
        <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping group-hover:opacity-0"
        />
        <MessageCircle
            size={26}
            strokeWidth={1.8}
            fill="currentColor"
            className="relative"
        />
    </a>
);

export default WhatsappFab;
