import GlobalAccess from "@/components/pages/GlobalAccess";

export const metadata = {
    title:
        "Dental Tourism Mumbai · Dental Care for International & NRI Patients",
    description:
        "Dental tourism in Mumbai for international and NRI patients. Curated treatment plans including dental implants India, smile makeover India, Invisalign India and full mouth rehabilitation India. US-trained expertise with Dr. Amruta Godbole, DDS (NYU) at Toothfully Yours, Khar West.",
    keywords: [
        "Dental Tourism Mumbai",
        "Dental Tourism India",
        "Dental Care in Mumbai for International Patients",
        "Dentist in Mumbai for International Patients",
        "Dentist in Mumbai for NRI Patients",
        "Dental Implants India",
        "Smile Makeover India",
        "Cosmetic Dentistry India",
        "Invisalign India",
        "Full Mouth Rehabilitation India",
    ],
    alternates: { canonical: "/global-access" },
    openGraph: {
        title:
            "Dental Tourism Mumbai · NRI & International Patients · Toothfully Yours",
        description:
            "Dental tourism in Mumbai for international and NRI patients. Implants, smile makeover, Invisalign and full mouth rehabilitation in India by Dr. Amruta Godbole, DDS (NYU).",
        url: "/global-access",
    },
};

export default function Page() {
    return <GlobalAccess />;
}
