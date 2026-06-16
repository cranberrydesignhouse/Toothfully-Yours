import CosmeticCare from "@/components/pages/CosmeticCare";

export const metadata = {
    title: "Cosmetic & Aesthetic Care · Veneers, Smile Design & Whitening",
    description:
        "Cosmetic dentistry by Dr. Amruta Godbole, DDS (NYU): porcelain veneers, smile design, professional teeth whitening and composite bonding crafted to enhance your natural features.",
    alternates: { canonical: "/cosmetic-aesthetic-care" },
    openGraph: {
        title: "Cosmetic & Aesthetic Care · Toothfully Yours",
        description:
            "Porcelain veneers, smile design and professional whitening with Dr. Amruta Godbole in Mumbai.",
        url: "/cosmetic-aesthetic-care",
    },
};

export default function Page() {
    return <CosmeticCare />;
}
