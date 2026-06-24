import ImplantsRestoration from "@/components/pages/ImplantsRestoration";

export const metadata = {
    title:
        "Dental Implants in Khar West, Mumbai · Root Canal & Restoration",
    description:
        "Dental implants in Khar West, Mumbai by Dr. Amruta Godbole, DDS (NYU). Single-tooth and full-arch implants, root canal treatment, crowns, bridges and full mouth rehabilitation. Trusted dental implant care in India for local and international patients.",
    keywords: [
        "Dental Implants in Khar West",
        "Root Canal Treatment in Khar West",
        "Dental Implants India",
        "Full Mouth Rehabilitation India",
        "Crowns and Bridges Mumbai",
        "Tooth Replacement Khar West",
        "All-on-4 Implants Mumbai",
        "Best Implant Dentist Mumbai",
    ],
    alternates: { canonical: "/implants-restoration" },
    openGraph: {
        title:
            "Dental Implants in Khar West, Mumbai · Toothfully Yours",
        description:
            "Single-tooth implants, full-arch implants, root canal treatment and full mouth rehabilitation in Khar West, Mumbai with Dr. Amruta Godbole, DDS (NYU).",
        url: "/implants-restoration",
    },
};

export default function Page() {
    return <ImplantsRestoration />;
}
