import { useEffect } from "react";
import { ArrowRight, X } from "lucide-react";

export const BookingModal = ({ open, onClose, defaultService = "" }) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!open) return null;

    return (
        <div
            data-testid="booking-modal"
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/55 backdrop-blur-[3px] animate-fade-in"
            />

            {/* Sheet */}
            <div className="relative w-full sm:max-w-2xl mx-0 sm:mx-6 max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl animate-fade-up">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    data-testid="booking-modal-close"
                    className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
                >
                    <X size={18} />
                </button>

                <div className="px-7 pt-9 pb-3 sm:px-10 sm:pt-12">
                    <span className="section-label">Book Your Visit</span>
                    <h3 className="heading-serif text-3xl sm:text-4xl text-[#1A1A1A]">
                        Start wherever feels comfortable.
                    </h3>
                    <p className="mt-3 font-dmsans text-sm sm:text-[0.95rem] text-[#5C5C5C] max-w-md leading-relaxed">
                        Share a few details and our team will reach out within
                        one working day.
                    </p>
                </div>

                <form
                    name="contact"
                    method="POST"
                    action="/thank-you"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    data-testid="contact-form"
                    className="px-7 pb-9 sm:px-10 sm:pb-12"
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p hidden>
                        <label>
                            Don't fill this out:{" "}
                            <input name="bot-field" />
                        </label>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                        <div>
                            <label htmlFor="m-name" className="field-label">
                                Name
                            </label>
                            <input
                                id="m-name"
                                type="text"
                                name="name"
                                required
                                placeholder="Your full name"
                                data-testid="contact-input-name"
                                className="field-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="m-phone" className="field-label">
                                Phone
                            </label>
                            <input
                                id="m-phone"
                                type="tel"
                                name="phone"
                                required
                                placeholder="+91 ..."
                                data-testid="contact-input-phone"
                                className="field-input"
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="m-service" className="field-label">
                            Service
                        </label>
                        <select
                            id="m-service"
                            name="service"
                            required
                            defaultValue={defaultService || ""}
                            data-testid="contact-select-service"
                            className="field-input appearance-none bg-white"
                        >
                            <option value="" disabled>
                                Select a service
                            </option>
                            <option value="Cosmetic & Aesthetic Care">
                                Cosmetic & Aesthetic Care
                            </option>
                            <option value="Implants & Restoration">
                                Implants & Restoration
                            </option>
                            <option value="Corrective Alignment">
                                Corrective Alignment
                            </option>
                            <option value="Neuromuscular Dentistry">
                                Neuromuscular Dentistry
                            </option>
                            <option value="General Checkup">
                                General Checkup
                            </option>
                        </select>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="m-message" className="field-label">
                            Message
                        </label>
                        <textarea
                            id="m-message"
                            name="message"
                            rows={4}
                            placeholder="Tell us a little about what you're looking for..."
                            data-testid="contact-input-message"
                            className="field-input resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        data-testid="contact-submit-button"
                        className="btn-primary mt-7 w-full sm:w-auto"
                    >
                        Book My Consultation
                        <ArrowRight size={16} strokeWidth={2} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
