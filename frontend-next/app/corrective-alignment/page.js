import CorrectiveAlignment from "@/components/pages/CorrectiveAlignment";

export const metadata = {
    title:
        "Invisalign in Khar West, Mumbai · Clear Aligners & Orthodontic Braces",
    description:
        "Invisalign in Khar West, Mumbai with Dr. Amruta Godbole, DDS (NYU). Certified Invisalign provider offering clear aligners for adults and teens, plus ceramic and metal braces. Invisalign India treatment plans for local and international patients.",
    keywords: [
        "Invisalign in Khar West",
        "Clear Aligners in Khar West",
        "Invisalign India",
        "Invisalign Mumbai",
        "Clear Aligners Mumbai",
        "Orthodontic Treatment Khar West",
        "Ceramic Braces Mumbai",
        "Invisalign for Adults Mumbai",
        "Invisalign for Teens Mumbai",
    ],
    alternates: { canonical: "/corrective-alignment" },
    openGraph: {
        title:
            "Invisalign in Khar West, Mumbai · Clear Aligners & Braces",
        description:
            "Invisalign clear aligners, ceramic and metal braces in Khar West, Mumbai by Dr. Amruta Godbole. Certified Invisalign provider for adults and teens.",
        url: "/corrective-alignment",
    },
};

export default function Page() {
    return <CorrectiveAlignment />;
}
