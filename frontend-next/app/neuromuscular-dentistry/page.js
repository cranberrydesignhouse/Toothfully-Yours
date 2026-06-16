import NeuromuscularDentistry from "@/components/pages/NeuromuscularDentistry";

export const metadata = {
    title:
        "Neuromuscular Dentistry · TMJ, Bruxism, Bite & Sleep-Apnea Care",
    description:
        "Comprehensive neuromuscular dentistry for TMJ / TMD dysfunction, bruxism, bite imbalance and airway-related concerns. Take the self-assessment and book a consultation with Dr. Amruta Godbole.",
    alternates: { canonical: "/neuromuscular-dentistry" },
    openGraph: {
        title: "Neuromuscular Dentistry · Toothfully Yours",
        description:
            "TMJ, bruxism, bite and sleep-apnea care in Mumbai with a neuromuscular-trained team.",
        url: "/neuromuscular-dentistry",
    },
};

export default function Page() {
    return <NeuromuscularDentistry />;
}
