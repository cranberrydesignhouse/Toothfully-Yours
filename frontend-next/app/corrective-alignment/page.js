import CorrectiveAlignment from "@/components/pages/CorrectiveAlignment";

export const metadata = {
    title: "Corrective Alignment · Invisalign & Orthodontic Braces",
    description:
        "Clear aligners and conventional braces tailored to your timeline and lifestyle. Comprehensive alignment planning by Dr. Amruta Godbole at Toothfully Yours, Mumbai.",
    alternates: { canonical: "/corrective-alignment" },
    openGraph: {
        title: "Corrective Alignment · Toothfully Yours",
        description:
            "Invisalign clear aligners and orthodontic braces in Mumbai, with bite-led planning.",
        url: "/corrective-alignment",
    },
};

export default function Page() {
    return <CorrectiveAlignment />;
}
