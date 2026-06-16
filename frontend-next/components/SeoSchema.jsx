// Server-renderable schema component: emits JSON-LD <script> directly into the JSX tree
// so it appears in the static HTML output and is visible to crawlers without JS execution.

const BUSINESS = {
    "@type": "Dentist",
    name: "Toothfully Yours · Dr. Amruta Godbole",
    image:
        "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/iwx0pasn_TOOTHFULLY-YOURS-LOGO-FINAL-1.png",
    logo:
        "https://customer-assets.emergentagent.com/job_amruta-dentistry/artifacts/iwx0pasn_TOOTHFULLY-YOURS-LOGO-FINAL-1.png",
    url: "https://toothfullyyours.com",
    telephone: "+91-97690-05504",
    priceRange: "$$-$$$",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Ganga Jamuna Building, B-204, 14th Rd, above Mizu Restaurant, Khar West, Pali",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400052",
        addressCountry: "IN",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 19.0707,
        longitude: 72.8333,
    },
    sameAs: [
        "https://www.instagram.com/toothfully_yours_dental",
        "https://www.linkedin.com/in/amruta-godbole-272522186/",
    ],
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        bestRating: "5",
        reviewCount: "60",
    },
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            opens: "10:00",
            closes: "20:00",
        },
    ],
};

const FOUNDER = {
    "@type": "Person",
    name: "Dr. Amruta Godbole",
    jobTitle: "Cosmetic & Comprehensive Dentist",
    alumniOf: [
        { "@type": "CollegeOrUniversity", name: "New York University, College of Dentistry" },
        { "@type": "CollegeOrUniversity", name: "Maharashtra University of Health Sciences" },
    ],
    hasCredential: [
        { "@type": "EducationalOccupationalCredential", name: "Doctor of Dental Surgery (DDS), NYU" },
        { "@type": "EducationalOccupationalCredential", name: "New Jersey Professional Dental License" },
        { "@type": "EducationalOccupationalCredential", name: "Dental Registration, India" },
    ],
    knowsAbout: [
        "Cosmetic Dentistry",
        "Veneers",
        "Smile Design",
        "Dental Implants",
        "Full Mouth Rehabilitation",
        "Clear Aligners",
        "Invisalign",
        "Neuromuscular Dentistry",
        "TMJ Treatment",
        "Bruxism",
        "Sleep Apnea Dentistry",
    ],
    worksFor: { "@type": "Dentist", name: BUSINESS.name },
};

// Per-page medical procedures schema. Empty list means "skip procedures."
const PAGE_PROCEDURES = {
    home: [],
    cosmetic: [
        { name: "Dental Veneers", description: "Porcelain and composite veneers crafted to enhance smile aesthetics without compromising tooth structure." },
        { name: "Smile Design", description: "Comprehensive cosmetic smile design tailored to facial proportions and personal style." },
        { name: "Teeth Whitening", description: "In-office and take-home professional whitening systems for visibly brighter teeth." },
        { name: "Cosmetic Bonding", description: "Direct composite bonding to refine shape, close gaps, and correct minor chips." },
    ],
    implants: [
        { name: "Single Tooth Dental Implant", description: "Replacement of a missing tooth with a titanium implant and ceramic crown." },
        { name: "Full Arch Implant Restoration", description: "Implant-supported full arch reconstruction for edentulous patients." },
        { name: "Crowns & Bridges", description: "Ceramic crowns and fixed bridges for restoring damaged or missing teeth." },
        { name: "Root Canal Treatment", description: "Endodontic therapy to save infected teeth and relieve pain." },
        { name: "Dental Fillings", description: "Tooth-colored composite restorations for decay or fracture repair." },
    ],
    alignment: [
        { name: "Invisalign Clear Aligners", description: "Removable clear aligner therapy to correct mild-to-moderate malocclusion." },
        { name: "Conventional Orthodontic Braces", description: "Fixed metal or ceramic appliances for complex orthodontic cases." },
    ],
    neuromuscular: [
        { name: "TMJ / TMD Evaluation & Treatment", description: "Diagnosis and management of temporomandibular joint dysfunction." },
        { name: "Bruxism / Night Guard Therapy", description: "Custom occlusal splints to protect teeth and relieve jaw muscle strain." },
        { name: "Bite Equilibration", description: "Selective adjustment of occlusion to balance jaw mechanics and muscle activity." },
        { name: "Sleep Apnea Oral Appliance Therapy", description: "Custom oral devices for mild to moderate obstructive sleep apnea." },
    ],
    "global-access": [],
};

const buildSchemas = (page) => {
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "@id": `${BUSINESS.url}/#medical-business`,
            ...BUSINESS,
            medicalSpecialty: [
                "Dentistry",
                "CosmeticDentistry",
                "Prosthodontics",
                "Orthodontics",
            ],
            founder: { "@type": "Person", name: FOUNDER.name, jobTitle: FOUNDER.jobTitle },
            employee: FOUNDER,
        },
    ];

    const procedures = PAGE_PROCEDURES[page] || [];
    procedures.forEach((p) => {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            name: p.name,
            description: p.description,
            procedureType: "https://schema.org/SurgicalProcedure",
            performedBy: {
                "@type": "Dentist",
                name: BUSINESS.name,
                "@id": `${BUSINESS.url}/#medical-business`,
            },
        });
    });

    return schemas;
};

// Renders the JSON-LD schema as a real <script> tag in the SSR/SSG output.
export const SeoSchema = ({ page }) => {
    const schemas = buildSchemas(page);
    return (
        <script
            type="application/ld+json"
            // dangerouslySetInnerHTML is the standard pattern for JSON-LD in React/Next.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
    );
};

export default SeoSchema;