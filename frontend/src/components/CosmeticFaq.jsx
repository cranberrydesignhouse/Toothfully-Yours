import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        q: "Will my veneers look natural or obvious?",
        a: "Done right, no one should be able to tell. We match shade, translucency, length and edge contour to your face, not to a template. Most patients are told their smile looks 'better-rested', not 'done'.",
    },
    {
        q: "How long do veneers actually last?",
        a: "Properly bonded porcelain veneers from a skilled clinician typically last 10–15+ years. The variables are bite, hygiene, and avoiding habits like nail-biting or opening bottles with your teeth — not the veneers themselves.",
    },
    {
        q: "I've seen cosmetic dentistry go wrong. How do I know this won't?",
        a: "Almost every visibly 'fake' smile comes from the same two shortcuts — over-prepped enamel and one-shade-fits-all veneers. Dr. Amruta's protocol is the opposite: conservative enamel reduction, custom shade-mapping, and a try-in stage before anything is permanent.",
    },
    {
        q: "Is smile design only for major transformations or can it address smaller concerns?",
        a: "Both. A smile design can be as light as edge-bonding one chipped tooth, or as comprehensive as a full-mouth aesthetic rehabilitation. We plan to the smallest concern that matters to you.",
    },
    {
        q: "How many appointments will a cosmetic treatment take?",
        a: "Whitening: 1 visit. Bonding or composite work: 1–2 visits. Veneers or smile design: a consultation, a design preview, prep and try-in, and final bonding — typically across 3–4 visits over 2–3 weeks.",
    },
];

export const CosmeticFaq = () => (
    <Accordion
        type="single"
        collapsible
        className="space-y-3 md:space-y-4"
        data-testid="cosmetic-faq"
    >
        {FAQS.map((f, i) => (
            <AccordionItem
                key={i}
                value={`item-${i}`}
                data-testid={`faq-item-${i}`}
                className="bg-white rounded-2xl border border-black/8 px-5 md:px-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.15)]"
            >
                <AccordionTrigger className="font-playfair italic text-[1.05rem] md:text-[1.2rem] text-[#1A1A1A] hover:no-underline py-5 md:py-6 text-left">
                    {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-dmsans text-[0.95rem] text-[#5C5C5C] leading-relaxed pb-6">
                    {f.a}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
);

export default CosmeticFaq;
