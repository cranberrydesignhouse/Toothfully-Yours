// Server-renderable JSON-LD schema. The component returns a <script type="application/ld+json">
// node in the JSX tree so the schema is included in the static HTML output (visible to crawlers
// without JavaScript execution).
//
// Schemas emitted on every page:
//   1. MedicalBusiness (also typed as Dentist + LocalBusiness via multi-@type) — primary entity
//   2. Organization                                                            — links to (1)
//   3. WebSite                                                                  — site metadata
// Plus, per page:
//   4. BreadcrumbList   — for every non-home page
//   5. MedicalProcedure — for each service offered on that page

const SITE_URL = "https://www.toothfullyyoursdentalcare.com";
const SITE_NAME = "Toothfully Yours";
const LOGO_URL =
    "/images/ty-logo-for-website-with-tm.webp";
const HERO_IMAGE =
    "/images/hero.webp";

const BUSINESS_ID = `${SITE_URL}/#dentist`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const SOCIAL_PROFILES = [
    "https://www.instagram.com/toothfullyyours/",
    "https://www.linkedin.com/in/amruta-godbole-272522186/",
];

const POSTAL_ADDRESS = {
    "@type": "PostalAddress",
    streetAddress:
        "Ganga Jamuna Building, B-204, 14th Rd, above Mizu Restaurant, Khar West, Pali",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400052",
    addressCountry: "IN",
};

const GEO_COORDS = {
    "@type": "GeoCoordinates",
    latitude: 19.0707,
    longitude: 72.8333,
};

const OPENING_HOURS = [
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
];

const FOUNDER = {
    "@type": "Person",
    name: "Dr. Amruta Godbole",
    jobTitle: "Cosmetic & Comprehensive Dentist",
    alumniOf: [
        {
            "@type": "CollegeOrUniversity",
            name: "New York University, College of Dentistry",
        },
        {
            "@type": "CollegeOrUniversity",
            name: "Maharashtra University of Health Sciences",
        },
    ],
    hasCredential: [
        {
            "@type": "EducationalOccupationalCredential",
            name: "Doctor of Dental Surgery (DDS), NYU",
        },
        {
            "@type": "EducationalOccupationalCredential",
            name: "New Jersey Professional Dental License",
        },
        {
            "@type": "EducationalOccupationalCredential",
            name: "Dental Registration, India",
        },
    ],
    knowsAbout: [
        "Cosmetic Dentistry",
        "Cosmetic Dentist Khar West",
        "Dental Veneers",
        "Smile Design",
        "Smile Makeover",
        "Teeth Whitening",
        "Dental Implants",
        "Dental Implants India",
        "Root Canal Treatment",
        "Full Mouth Rehabilitation",
        "Clear Aligners",
        "Invisalign",
        "Invisalign India",
        "Neuromuscular Dentistry",
        "TMJ Treatment",
        "Bruxism",
        "Sleep Apnea Dentistry",
        "Family Dentistry",
        "Dental Tourism India",
        "Dental Care for NRI Patients",
    ],
    worksFor: { "@id": BUSINESS_ID },
};

// Page → MedicalProcedure entries.
const PAGE_PROCEDURES = {
    home: [],
    cosmetic: [
        {
            name: "Dental Veneers",
            description:
                "Porcelain and composite veneers crafted to enhance smile aesthetics without compromising tooth structure.",
        },
        {
            name: "Smile Design",
            description:
                "Comprehensive cosmetic smile design tailored to facial proportions and personal style.",
        },
        {
            name: "Teeth Whitening",
            description:
                "In-office and take-home professional whitening systems for visibly brighter teeth.",
        },
        {
            name: "Cosmetic Bonding",
            description:
                "Direct composite bonding to refine shape, close gaps, and correct minor chips.",
        },
    ],
    implants: [
        {
            name: "Single Tooth Dental Implant",
            description:
                "Replacement of a missing tooth with a titanium implant and ceramic crown.",
        },
        {
            name: "Full Arch Implant Restoration",
            description:
                "Implant-supported full arch reconstruction for edentulous patients.",
        },
        {
            name: "Crowns & Bridges",
            description:
                "Ceramic crowns and fixed bridges for restoring damaged or missing teeth.",
        },
        {
            name: "Root Canal Treatment",
            description:
                "Endodontic therapy to save infected teeth and relieve pain.",
        },
        {
            name: "Dental Fillings",
            description:
                "Tooth-colored composite restorations for decay or fracture repair.",
        },
    ],
    alignment: [
        {
            name: "Invisalign Clear Aligners",
            description:
                "Removable clear aligner therapy to correct mild-to-moderate malocclusion.",
        },
        {
            name: "Conventional Orthodontic Braces",
            description:
                "Fixed metal or ceramic appliances for complex orthodontic cases.",
        },
    ],
    neuromuscular: [
        {
            name: "TMJ / TMD Evaluation & Treatment",
            description:
                "Diagnosis and management of temporomandibular joint dysfunction.",
        },
        {
            name: "Bruxism / Night Guard Therapy",
            description:
                "Custom occlusal splints to protect teeth and relieve jaw muscle strain.",
        },
        {
            name: "Bite Equilibration",
            description:
                "Selective adjustment of occlusion to balance jaw mechanics and muscle activity.",
        },
        {
            name: "Sleep Apnea Oral Appliance Therapy",
            description:
                "Custom oral devices for mild to moderate obstructive sleep apnea.",
        },
    ],
    "global-access": [],
};

// Page → breadcrumb display name + URL slug.
const PAGE_META = {
    home: { label: "Home", path: "/" },
    cosmetic: {
        label: "Cosmetic & Aesthetic Care",
        path: "/cosmetic-aesthetic-care",
    },
    implants: {
        label: "Implants & Restoration",
        path: "/implants-restoration",
    },
    alignment: {
        label: "Corrective Alignment",
        path: "/corrective-alignment",
    },
    neuromuscular: {
        label: "Neuromuscular Dentistry",
        path: "/neuromuscular-dentistry",
    },
    "global-access": { label: "Global Access", path: "/global-access" },
};

const buildBreadcrumb = (page) => {
    const meta = PAGE_META[page];
    if (!meta || page === "home") return null;
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: meta.label,
                item: `${SITE_URL}${meta.path}`,
            },
        ],
    };
};

const buildSchemas = (page) => {
    const schemas = [];

    // 1. MedicalBusiness (Dentist + LocalBusiness multi-type)
    schemas.push({
        "@context": "https://schema.org",
        "@type": ["MedicalBusiness", "Dentist", "LocalBusiness"],
        "@id": BUSINESS_ID,
        name: `${SITE_NAME} · Dr. Amruta Godbole`,
        legalName: "Toothfully Yours Dental Care",
        description:
            "Toothfully Yours is a luxury dental clinic in Khar West, Mumbai, offering cosmetic dentistry, dental implants, root canal treatment, Invisalign clear aligners, smile design, smile makeover, teeth whitening, dental veneers, TMJ treatment and neuromuscular dentistry. Family and cosmetic dental care near Bandra West, with dental tourism programs for international and NRI patients across India. Led by Dr. Amruta Godbole, DDS (NYU) with two decades of experience.",
        url: SITE_URL,
        logo: LOGO_URL,
        image: [LOGO_URL, HERO_IMAGE],
        telephone: "+91-97690-05504",
        email: "dramrutagodbole@gmail.com",
        priceRange: "$$-$$$",
        address: POSTAL_ADDRESS,
        geo: GEO_COORDS,
        sameAs: SOCIAL_PROFILES,
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            bestRating: "5",
            reviewCount: "60",
        },
        openingHoursSpecification: OPENING_HOURS,
        medicalSpecialty: [
            "Dentistry",
            "CosmeticDentistry",
            "Prosthodontics",
            "Orthodontics",
        ],
        founder: { "@type": "Person", name: FOUNDER.name, jobTitle: FOUNDER.jobTitle },
        employee: FOUNDER,
        areaServed: [
            { "@type": "City", name: "Mumbai" },
            { "@type": "Country", name: "India" },
        ],
    });

    // 2. Organization (linked to MedicalBusiness)
    schemas.push({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: "Toothfully Yours Dental Care",
        url: SITE_URL,
        logo: {
            "@type": "ImageObject",
            url: LOGO_URL,
            caption: `${SITE_NAME} logo`,
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-97690-05504",
            email: "dramrutagodbole@gmail.com",
            contactType: "customer service",
            areaServed: ["IN", "AE", "GB", "US"],
            availableLanguage: ["English", "Hindi", "Marathi"],
        },
        address: POSTAL_ADDRESS,
        sameAs: SOCIAL_PROFILES,
        parentOrganization: { "@id": BUSINESS_ID },
    });

    // 3. WebSite (no on-site search; omit potentialAction)
    schemas.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-IN",
    });

    // 4. BreadcrumbList (sub-pages only)
    const breadcrumb = buildBreadcrumb(page);
    if (breadcrumb) schemas.push(breadcrumb);

    // 5. MedicalProcedure entries for the current page
    const procedures = PAGE_PROCEDURES[page] || [];
    procedures.forEach((p) => {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            name: p.name,
            description: p.description,
            procedureType: "https://schema.org/SurgicalProcedure",
            performedBy: { "@id": BUSINESS_ID },
        });
    });

    return schemas;
};

// Emits the schema as a single JSON-LD <script> in the static SSG output.
export const SeoSchema = ({ page }) => {
    const schemas = buildSchemas(page);
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
    );
};

export default SeoSchema;
