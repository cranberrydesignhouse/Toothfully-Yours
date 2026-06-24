import NeuromuscularDentistry from "@/components/pages/NeuromuscularDentistry";

export const metadata = {
    title:
        "TMJ Treatment Mumbai · Neuromuscular Dentistry & Sleep Apnea Care",
    description:
        "TMJ treatment in Mumbai and neuromuscular dentistry by Dr. Amruta Godbole, DDS (NYU). Diagnosis and care for TMJ / TMD dysfunction, bruxism, jaw pain, bite imbalance and sleep apnea at Toothfully Yours, Khar West, Mumbai.",
    keywords: [
        "TMJ Treatment Mumbai",
        "Neuromuscular Dentistry Mumbai",
        "TMD Treatment Mumbai",
        "Jaw Pain Treatment Khar West",
        "Bruxism Treatment Mumbai",
        "Sleep Apnea Dentist Mumbai",
        "Night Guard Mumbai",
        "Bite Correction Mumbai",
        "Neuromuscular Dentist Khar West",
    ],
    alternates: { canonical: "/neuromuscular-dentistry" },
    openGraph: {
        title:
            "TMJ Treatment Mumbai · Neuromuscular Dentistry · Toothfully Yours",
        description:
            "TMJ, bruxism, bite imbalance and sleep apnea care in Mumbai with a neuromuscular-trained team led by Dr. Amruta Godbole.",
        url: "/neuromuscular-dentistry",
    },
};

export default function Page() {
    return <NeuromuscularDentistry />;
}
