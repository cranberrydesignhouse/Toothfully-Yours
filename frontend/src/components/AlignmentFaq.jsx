import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        q: "Am I too old for braces?",
        a: "Not even close. Teeth move at any age. We routinely treat adults in their 30s, 40s and 50s. The biology is the same. What changes with age is the planning around existing crowns, gum health and bite, and that's exactly what a thorough orthodontic workup is for.",
    },
    {
        q: "What is the real difference between Invisalign and traditional braces?",
        a: "Traditional braces are fixed, faster for complex movements and entirely hands-off for you. Invisalign is a series of clear, removable aligners that are nearly invisible and let you eat and brush normally. The right choice depends on the complexity of the case, not on preference alone, and we'll tell you honestly which one delivers the better result.",
    },
    {
        q: "How long will I actually need to wear them?",
        a: "Most adult Invisalign cases finish in 9 to 18 months. Traditional braces typically run 18 to 24 months. Mild crowding can be corrected in as little as 6 months. The number we give you on day one is based on a digital scan and a treatment plan, not a guess.",
    },
    {
        q: "Will braces or aligners affect how I speak or eat?",
        a: "There's usually a few days of adjustment, a soft lisp with aligners, a tender bite with braces, but it settles quickly. Aligners come out for meals, so eating stays normal. With braces, we'll walk you through what to avoid in the first week so you stay comfortable.",
    },
    {
        q: "What happens after treatment? Will my teeth stay straight?",
        a: "Yes, if you wear retainers. Teeth have memory and will drift back if left unsupported. We provide a custom retainer plan, usually a thin clear retainer worn nightly, so the result you spent months building lasts for decades.",
    },
];

export const AlignmentFaq = () => (
    <Accordion
        type="single"
        collapsible
        className="space-y-3 md:space-y-4"
        data-testid="alignment-faq"
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

export default AlignmentFaq;
