import Landing from "@/components/pages/Landing";

export const metadata = {
    title:
        "Toothfully Yours · Cosmetic, Implant & Neuromuscular Dentistry in Mumbai",
    description:
        "Two decades of luxury dental care in Mumbai with Dr. Amruta Godbole, DDS (NYU). Cosmetic veneers, smile design, implants, clear aligners and TMJ treatment for patients in India and abroad.",
    alternates: { canonical: "/" },
    openGraph: {
        title: "Toothfully Yours · Dental Care in Mumbai",
        description:
            "Cosmetic, implant, alignment and neuromuscular dentistry by Dr. Amruta Godbole, DDS (NYU).",
        url: "/",
    },
};

export default function HomePage() {
    return <Landing />;
}
