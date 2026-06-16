"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        q: "Is TMJ disorder the same as neuromuscular dysfunction?",
        a: "They overlap, but they aren't identical. TMJ disorder refers specifically to the temporomandibular joint and its disc, ligaments and surrounding tissues. Neuromuscular dysfunction is broader, the way your teeth, jaw joints, muscles and posture work together. Most TMJ cases have a neuromuscular component, which is why we evaluate the whole system, not just the joint.",
    },
    {
        q: "Can bite problems cause headaches and neck pain?",
        a: "Yes, more often than most people realise. When teeth meet unevenly, the jaw muscles brace to compensate. That tension travels upward into the temples and downward into the neck and shoulders. Patients often arrive treating the headache and discover the trigger was in the bite all along.",
    },
    {
        q: "How do I know if I grind my teeth while sleeping?",
        a: "Tell-tale signs include flattened or chipped edges, sore jaw or temples on waking, headaches first thing in the morning, and a partner mentioning a clicking or grinding sound at night. A 10-minute exam and a few photographs of your teeth almost always confirm it.",
    },
    {
        q: "Will I need surgery for TMJ issues?",
        a: "Almost never. The vast majority of TMJ and neuromuscular cases respond beautifully to conservative care, splint therapy, occlusal adjustment, muscle work and posture changes. Surgery is reserved for a small minority of structural cases, and only after non-invasive options have been thoroughly explored.",
    },
    {
        q: "What happens during a neuromuscular evaluation?",
        a: "We assess your bite, jaw range of motion, muscle palpation, joint sounds and posture, take diagnostic photographs and, if needed, a CBCT scan. From that you receive a written, plain-language explanation of what's actually happening, what is causing it, and a layered plan from least to most invasive.",
    },
];

export const NeuromuscularFaq = () => (
    <Accordion
        type="single"
        collapsible
        className="space-y-3 md:space-y-4"
        data-testid="neuromuscular-faq"
    >
        {FAQS.map((f, i) => (
            <AccordionItem
                key={i}
                value={`item-${i}`}
                data-testid={`faq-item-${i}`}
                className="bg-white rounded-2xl border border-black/8 px-5 md:px-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.15)]"
            >
                <AccordionTrigger className="font-dmsans font-semibold text-[0.98rem] md:text-[1.05rem] text-[#1A1A1A] hover:no-underline py-5 md:py-6 text-left tracking-tight">
                    {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-dmsans text-[0.95rem] text-[#5C5C5C] leading-relaxed pb-6">
                    {f.a}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
);

export default NeuromuscularFaq;