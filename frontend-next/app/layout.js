import "./globals.css";
import WhatsappFab from "@/components/WhatsappFab";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
    metadataBase: new URL("https://toothfullyyours.com"),
    title: {
        default:
            "Toothfully Yours · Cosmetic, Implant & Neuromuscular Dentistry in Mumbai",
        template: "%s · Toothfully Yours",
    },
    description:
        "Toothfully Yours is a luxury dental practice in Mumbai led by Dr. Amruta Godbole, DDS (NYU). Cosmetic, implant, alignment and neuromuscular care for patients in India and abroad.",
    keywords: [
        "Dentist Mumbai",
        "Cosmetic Dentistry Mumbai",
        "Dental Veneers Mumbai",
        "Dental Implants Mumbai",
        "Invisalign Mumbai",
        "Neuromuscular Dentistry",
        "Smile Design",
        "Dr. Amruta Godbole",
        "Toothfully Yours",
    ],
    authors: [{ name: "Dr. Amruta Godbole" }],
    openGraph: {
        type: "website",
        siteName: "Toothfully Yours",
        title:
            "Toothfully Yours · Cosmetic, Implant & Neuromuscular Dentistry in Mumbai",
        description:
            "A luxury dental practice in Mumbai led by Dr. Amruta Godbole, DDS (NYU). Cosmetic, implant, alignment and neuromuscular care for India and the world.",
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        title:
            "Toothfully Yours · Cosmetic, Implant & Neuromuscular Dentistry",
        description:
            "Luxury dental care in Mumbai with Dr. Amruta Godbole, DDS (NYU).",
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, viewport-fit=cover"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <ScrollToTop />
                <div className="App">{children}</div>
                <WhatsappFab />

                {/* Hidden Netlify form for build-time form detection.
                    The interactive form lives in BookingModal.jsx. */}
                <form
                    name="contact"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    hidden
                >
                    <input type="text" name="name" />
                    <input type="tel" name="phone" />
                    <input type="email" name="email" />
                    <select name="service" />
                    <textarea name="message" />
                    <input type="text" name="bot-field" />
                </form>
            </body>
        </html>
    );
}
