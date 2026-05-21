import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function ThankYou() {
    return (
        <main
            data-testid="thank-you-page"
            className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24"
        >
            <div className="max-w-xl text-center">
                <CheckCircle2
                    size={56}
                    strokeWidth={1.4}
                    color="#EB8A2C"
                    className="mx-auto mb-8"
                />
                <span className="section-label">Submission Received</span>
                <h1 className="heading-serif text-4xl md:text-5xl text-[#1A1A1A]">
                    Thank you, we'll be in touch.
                </h1>
                <p className="mt-5 font-dmsans text-base text-[#5C5C5C] leading-relaxed">
                    Your consultation request has reached us at Toothfully
                    Yours. A member of our team will reach out within one
                    working day to find a time that suits you.
                </p>
                <div className="mt-10">
                    <Link
                        to="/"
                        data-testid="thank-you-home-link"
                        className="btn-primary"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
