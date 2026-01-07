// Committee Data - แก้ไขรายชื่อได้ที่นี่
// ข้อมูลนี้สามารถย้ายไปเก็บใน database หรือ CMS ได้ในอนาคต

export interface CommitteeMember {
    name: string;
    title?: string;
    affiliation?: string;
    country?: string;
}

export interface CommitteeCategory {
    category: string;
    members: CommitteeMember[];
}

// ===== แก้ไขรายชื่อ Committee ที่นี่ =====
export const committeeData: CommitteeCategory[] = [
    {
        category: "ADVISORS",
        members: [
            // เพิ่มรายชื่อ Advisors ตรงนี้
            // ตัวอย่าง:
            // { name: "Prof. Dr. John Smith", title: "Honorary Chair", affiliation: "University of Example", country: "USA" },
        ]
    },
    {
        category: "STEERING COMMITTEE",
        members: [
            // เพิ่มรายชื่อ Steering Committee ตรงนี้
            // ตัวอย่าง:
            // { name: "Dr. Jane Doe", title: "Chair", affiliation: "Bangkok Hospital", country: "Thailand" },
        ]
    },
    {
        category: "ORGANIZING COMMITTEE",
        members: [
            // เพิ่มรายชื่อ Organizing Committee ตรงนี้
            // ตัวอย่าง:
            // { name: "Assoc. Prof. Dr. Som Chai", title: "Secretary", affiliation: "Chulalongkorn University", country: "Thailand" },
        ]
    },
    {
        category: "SCIENTIFIC COMMITTEE",
        members: [
            // เพิ่มรายชื่อ Scientific Committee ตรงนี้
        ]
    },
    {
        category: "LOCAL ORGANIZING COMMITTEE",
        members: [
            // เพิ่มรายชื่อ Local Organizing Committee ตรงนี้
        ]
    }
];

// ===== ตัวอย่างข้อมูลสำหรับทดสอบ =====
export const sampleCommitteeData: CommitteeCategory[] = [
    {
        category: "ADVISORS",
        members: [
            { name: "Prof. Dr. Payom Wongpoowarak", title: "Honorary Chair", affiliation: "Prince of Songkla University", country: "Thailand" },
            { name: "Prof. Dr. Yupadee Sirisuth", title: "Honorary Advisor", affiliation: "Chulalongkorn University", country: "Thailand" },
        ]
    },
    {
        category: "STEERING COMMITTEE",
        members: [
            { name: "Assoc. Prof. Dr. Teeraporn Supapaan", title: "Chair", affiliation: "Khon Kaen University", country: "Thailand" },
            { name: "Dr. Piyameth Dilokthornsakul", title: "Vice Chair", affiliation: "Naresuan University", country: "Thailand" },
            { name: "Dr. Nathorn Chaiyakunapruk", title: "Member", affiliation: "University of Utah", country: "USA" },
        ]
    },
    {
        category: "ORGANIZING COMMITTEE",
        members: [
            { name: "Assoc. Prof. Dr. Surakit Nathisuwan", title: "Secretary", affiliation: "Mahidol University", country: "Thailand" },
            { name: "Dr. Kritsanee Saramunee", title: "Treasurer", affiliation: "Mahasarakham University", country: "Thailand" },
            { name: "Dr. Surasak Saokaew", title: "Scientific Program", affiliation: "University of Phayao", country: "Thailand" },
            { name: "Dr. Patcharaporn Anupong", title: "Registration", affiliation: "Ubon Ratchathani University", country: "Thailand" },
        ]
    },
    {
        category: "SCIENTIFIC COMMITTEE",
        members: [
            { name: "Prof. Timothy Chen", affiliation: "University of Sydney", country: "Australia" },
            { name: "Prof. Kazuko Kimura", affiliation: "Kanazawa University", country: "Japan" },
            { name: "Dr. Joyce Yu", affiliation: "National University of Singapore", country: "Singapore" },
        ]
    },
    {
        category: "LOCAL ORGANIZING COMMITTEE",
        members: [
            { name: "Dr. Woranuch Saengcharoen", affiliation: "Silpakorn University", country: "Thailand" },
            { name: "Dr. Unchalee Permsuwan", affiliation: "Chiang Mai University", country: "Thailand" },
        ]
    }
];
