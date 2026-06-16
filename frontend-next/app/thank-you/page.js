import ThankYou from "@/components/pages/ThankYou";

export const metadata = {
    title: "Thank You · We'll Be In Touch",
    description:
        "Thanks for reaching out to Toothfully Yours. Our team will contact you shortly to confirm your consultation.",
    alternates: { canonical: "/thank-you" },
    robots: { index: false, follow: false },
};

export default function Page() {
    return <ThankYou />;
}
