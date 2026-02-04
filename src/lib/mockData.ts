import { Subscription, Category } from "@/types";

// Helper to generate a random future date within the current billing cycle
const getNextPaymentDate = (dayOfMonth: number): string => {
    const today = new Date();
    let paymentDate = new Date(today.getFullYear(), today.getMonth(), dayOfMonth);

    if (paymentDate < today) {
        paymentDate = new Date(today.getFullYear(), today.getMonth() + 1, dayOfMonth);
    }
    return paymentDate.toISOString();
};

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
    {
        id: "1",
        name: "Netflix Premium",
        serviceName: "Netflix",
        price: 19.99,
        currency: "EUR",
        billingCycle: "monthly",
        nextPaymentDate: getNextPaymentDate(15),
        startDate: "2023-01-15T00:00:00Z",
        category: "streaming",
        active: true,
        logoUrl: "https://cdn.simpleicons.org/netflix/E50914",
        cancellationMethod: {
            type: "online",
            steps: [
                "Go to Netflix.com and log in.",
                "Click on your profile picture > Account.",
                "Under 'Membership & Billing', click 'Cancel Membership'.",
                "Confirm cancellation."
            ],
            link: "https://www.netflix.com/cancelplan"
        },
        alternatives: [
            {
                id: "alt-1",
                name: "Netflix Standard with Ads",
                price: 5.99,
                description: "Official Netflix plan with ads. Good for saving money if you don't mind interruptions.",
                savings: 14.00,
                link: "https://www.netflix.com/signup"
            }
        ]
    },
    {
        id: "2",
        name: "Spotify Duo",
        serviceName: "Spotify",
        price: 14.99,
        currency: "EUR",
        billingCycle: "monthly",
        nextPaymentDate: getNextPaymentDate(28),
        startDate: "2022-05-28T00:00:00Z",
        category: "streaming",
        active: true,
        logoUrl: "https://cdn.simpleicons.org/spotify/1DB954",
        cancellationMethod: {
            type: "online",
            steps: [
                "Log in to spotify.com/account.",
                "Under 'Your plan', click 'Change plan'.",
                "Scroll to 'Cancel Spotify' and click 'Cancel Premium'."
            ],
            link: "https://www.spotify.com/account/cancel/"
        }
    },
    {
        id: "3",
        name: "EDF Électricité",
        serviceName: "EDF",
        price: 85.50,
        currency: "EUR",
        billingCycle: "monthly",
        nextPaymentDate: getNextPaymentDate(5),
        startDate: "2021-09-01T00:00:00Z",
        category: "utilities",
        active: true,
        logoUrl: "/logos/EDF.svg",
        cancellationMethod: {
            type: "phone",
            steps: [
                "Call customer service with your contract number.",
                "Ask for contract termination."
            ],
            phoneNumber: "3004"
        }
    },
    {
        id: "4",
        name: "Free Mobile 5G",
        serviceName: "Free",
        price: 19.99,
        currency: "EUR",
        billingCycle: "monthly",
        nextPaymentDate: getNextPaymentDate(12),
        startDate: "2020-03-12T00:00:00Z",
        category: "mobile",
        active: true,
        logoUrl: "/logos/free.svg",
        cancellationMethod: {
            type: "letter",
            steps: [
                "Send a registered letter with acknowledgment of receipt (LRAR).",
                "Include your subscriber number and phone number."
            ],
            address: "Free Forfait Mobile, Service Résiliation, 75371 Paris Cedex 08"
        },
        alternatives: [
            {
                id: "alt-free-1",
                name: "Sosh 100Go",
                price: 15.99,
                description: "Orange network, no commitment.",
                savings: 4.00,
                link: "https://www.sosh.fr"
            }
        ]
    },
    {
        id: "5",
        name: "Amazon Prime",
        serviceName: "Amazon",
        price: 69.90,
        currency: "EUR",
        billingCycle: "yearly",
        nextPaymentDate: new Date(new Date().getFullYear(), 8, 15).toISOString(), // Sept 15th
        startDate: "2019-09-15T00:00:00Z",
        category: "other",
        active: true,
        logoUrl: "/logos/amazon.svg"
    },
    {
        id: "6",
        name: "Basic-Fit",
        serviceName: "Basic-Fit",
        price: 29.99,
        currency: "EUR",
        billingCycle: "monthly",
        nextPaymentDate: getNextPaymentDate(1),
        startDate: "2024-01-01T00:00:00Z",
        category: "gym",
        active: true,
        logoUrl: "/logos/basic_fit.svg",
        cancellationMethod: {
            type: "online",
            steps: ["Log in to the Basic-Fit app or website.", "Go to membership details.", "Request cancellation (requires 30 days notice)."]
        }
    }
];
