import GlobalAccess from "@/components/pages/GlobalAccess";

export const metadata = {
    title: "Global Access · Dental Care for International Patients",
    description:
        "Curated dental treatment packages for international patients visiting Mumbai. Concierge care, local-currency pricing and US-trained expertise with Dr. Amruta Godbole, DDS (NYU).",
    alternates: { canonical: "/global-access" },
    openGraph: {
        title: "Global Access · Toothfully Yours",
        description:
            "Treatment packages and concierge care for international patients visiting Mumbai.",
        url: "/global-access",
    },
};

export default function Page() {
    return <GlobalAccess />;
}
