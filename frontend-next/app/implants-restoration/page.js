import ImplantsRestoration from "@/components/pages/ImplantsRestoration";

export const metadata = {
    title:
        "Implants & Restoration · Single Tooth, Full Arch, Crowns & Fillings",
    description:
        "Dental implants, crowns, bridges, root canal therapy and tooth-coloured fillings with Dr. Amruta Godbole, DDS (NYU) and a team of ITI- and BioHorizons-trained specialists.",
    alternates: { canonical: "/implants-restoration" },
    openGraph: {
        title: "Implants & Restoration · Toothfully Yours",
        description:
            "Single-tooth, full-arch implants and restorative dentistry in Mumbai.",
        url: "/implants-restoration",
    },
};

export default function Page() {
    return <ImplantsRestoration />;
}
