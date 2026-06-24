import CosmeticCare from "@/components/pages/CosmeticCare";

export const metadata = {
    title:
        "Cosmetic Dentist in Khar West · Smile Design, Veneers & Whitening",
    description:
        "Cosmetic dentist in Khar West, Mumbai. Smile design, dental veneers, smile makeover and teeth whitening by Dr. Amruta Godbole, DDS (NYU). Cosmetic dentistry trusted by patients across India and abroad.",
    keywords: [
        "Cosmetic Dentist in Khar West",
        "Smile Design in Khar West",
        "Smile Makeover in Khar West",
        "Dental Veneers in Khar West",
        "Teeth Whitening in Khar West",
        "Cosmetic Dentistry India",
        "Smile Makeover India",
        "Best Cosmetic Dentist Mumbai",
        "Porcelain Veneers Mumbai",
    ],
    alternates: { canonical: "/cosmetic-aesthetic-care" },
    openGraph: {
        title:
            "Cosmetic Dentist in Khar West, Mumbai · Toothfully Yours",
        description:
            "Smile design, dental veneers, smile makeover and teeth whitening in Khar West, Mumbai with Dr. Amruta Godbole, DDS (NYU).",
        url: "/cosmetic-aesthetic-care",
    },
};

export default function Page() {
    return <CosmeticCare />;
}
