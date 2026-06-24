import Landing from "@/components/pages/Landing";

export const metadata = {
    title:
        "Best Dentist in Khar West, Mumbai · Toothfully Yours Dental Clinic",
    description:
        "Looking for the best dentist in Khar West, Mumbai? Toothfully Yours is a luxury dental clinic in Khar West led by Dr. Amruta Godbole, DDS (NYU). Cosmetic dentistry, dental implants, Invisalign, smile design and family dental care near Bandra West.",
    keywords: [
        "Dentist in Khar West",
        "Best Dentist in Khar West",
        "Dental Clinic in Khar West",
        "Dental Care in Khar West",
        "Family Dentist in Khar West",
        "Dentist Near Bandra West",
        "Cosmetic Dentist in Khar West",
        "Dental Clinic Mumbai",
        "Dr. Amruta Godbole",
        "Toothfully Yours",
    ],
    alternates: { canonical: "/" },
    openGraph: {
        title: "Best Dentist in Khar West, Mumbai · Toothfully Yours",
        description:
            "Luxury dental clinic in Khar West, Mumbai with Dr. Amruta Godbole, DDS (NYU). Cosmetic dentistry, dental implants, Invisalign and family dental care near Bandra West.",
        url: "/",
    },
};

export default function HomePage() {
    return <Landing />;
}
