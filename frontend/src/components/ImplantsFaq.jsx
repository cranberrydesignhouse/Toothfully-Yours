import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        q: "Is a root canal as painful as everyone says?",
        a: "Not anymore. With modern anaesthetic protocols and precision rotary instruments, most patients say the procedure feels comparable to a routine filling. The real source of pain is the inflamed nerve in the days before treatment, not the treatment itself.",
    },
    {
        q: "How long does a dental implant take from start to finish?",
        a: "The implant placement itself takes about an hour. Healing and integration with the bone usually takes 3 to 4 months, after which we place the final crown. So you're looking at one short surgery, a quiet wait, and one final visit to a complete tooth.",
    },
    {
        q: "Will an implant look and feel like a real tooth?",
        a: "Yes. A well-placed implant is the closest thing in dentistry to having your natural tooth back. You'll chew, brush, floss and smile with it the same way. Most patients tell us they forget which tooth was even replaced.",
    },
    {
        q: "My tooth has been bothering me for a while. Is it too late to save it?",
        a: "Often it isn't. Even badly decayed or fractured teeth can be saved with root canal therapy, build-ups or crowns. The honest answer comes after a single examination and an X-ray. No commitment, no pressure.",
    },
    {
        q: "How do I know if I need a crown or an extraction?",
        a: "If enough healthy tooth structure remains, a crown almost always wins, because keeping your own root is the gold standard. Extraction is reserved for teeth that are truly beyond rescue, and in those cases we plan the replacement on the same visit so you're never left with a gap.",
    },
];

export const ImplantsFaq = () => (
    <Accordion
        type="single"
        collapsible
        className="space-y-3 md:space-y-4"
        data-testid="implants-faq"
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

export default ImplantsFaq;
