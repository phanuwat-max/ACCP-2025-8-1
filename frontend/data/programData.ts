export const programDays = [
    {
        date: "July 9, 2026",
        dayKey: "day1",
        events: [
            { time: "08:00 - 09:00", titleKey: "registrationWelcome", type: "registration", icon: "fa-clipboard-check" },
            { time: "09:00 - 10:30", titleKey: "openingCeremony", type: "ceremony", icon: "fa-flag" },
            { time: "10:30 - 11:00", titleKey: "coffeeBreak", type: "break", icon: "fa-mug-hot" },
            { time: "11:00 - 12:30", titleKey: "plenary1", type: "plenary", icon: "fa-microphone" },
            { time: "12:30 - 13:30", titleKey: "lunchNetworking", type: "break", icon: "fa-utensils" },
            { time: "13:30 - 15:00", titleKey: "symposiaA", type: "symposia", icon: "fa-users" },
            { time: "15:00 - 15:30", titleKey: "coffeeBreak", type: "break", icon: "fa-mug-hot" },
            { time: "15:30 - 17:00", titleKey: "oralSession1", type: "oral", icon: "fa-chalkboard-user" },
            { time: "17:00 - 18:30", titleKey: "posterDiscussion", type: "poster", icon: "fa-image" },
        ]
    },
    {
        date: "July 10, 2026",
        dayKey: "day2",
        events: [
            { time: "08:30 - 10:00", titleKey: "plenary2", type: "plenary", icon: "fa-dna" },
            { time: "10:00 - 10:30", titleKey: "coffeeBreak", type: "break", icon: "fa-mug-hot" },
            { time: "10:30 - 12:00", titleKey: "symposiaB", type: "symposia", icon: "fa-users" },
            { time: "12:00 - 13:00", titleKey: "lunchNetworking", type: "break", icon: "fa-utensils" },
            { time: "13:00 - 14:30", titleKey: "keynoteAI", type: "plenary", icon: "fa-robot" },
            { time: "14:30 - 15:00", titleKey: "coffeeBreak", type: "break", icon: "fa-mug-hot" },
            { time: "15:00 - 16:30", titleKey: "oralSession2", type: "oral", icon: "fa-chalkboard-user" },
            { time: "19:00 - 22:00", titleKey: "galaDinner", type: "social", icon: "fa-champagne-glasses" },
        ]
    },
    {
        date: "July 11, 2026",
        dayKey: "day3",
        events: [
            { time: "08:30 - 10:00", titleKey: "plenary3", type: "plenary", icon: "fa-graduation-cap" },
            { time: "10:00 - 10:30", titleKey: "coffeeBreak", type: "break", icon: "fa-mug-hot" },
            { time: "10:30 - 12:00", titleKey: "symposiaC", type: "symposia", icon: "fa-users" },
            { time: "12:00 - 13:00", titleKey: "lunch", type: "break", icon: "fa-utensils" },
            { time: "13:00 - 14:30", titleKey: "closingCeremony", type: "ceremony", icon: "fa-award" },
        ]
    }
];

export const tracks = [
    { id: 1, nameKey: "track1", icon: "fa-stethoscope" },
    { id: 2, nameKey: "track2", icon: "fa-building" },
    { id: 3, nameKey: "track3", icon: "fa-flask-vial" },
    { id: 4, nameKey: "track4", icon: "fa-chart-line" },
    { id: 5, nameKey: "track5", icon: "fa-graduation-cap" },
    { id: 6, nameKey: "track6", icon: "fa-pills" },
    { id: 7, nameKey: "track7", icon: "fa-atom" },
    { id: 8, nameKey: "track8", icon: "fa-leaf" },
];
