/* =========================================================
   YOUR PORTFOLIO ITEMS
   ---------------------------------------------------------
   Items appear in this order, grouped under their "section".

   section:  heading the item sits under
   title:    card title
   type:     small label (what kind of work it is)
   link:     main Google Drive link. Opens on the page when clicked.
             Leave "" and the card shows "Link coming soon".
   openLabel: optional wording for the main button (default "Open")
   extras:   optional extra buttons, e.g.
             [{ label: "Get a copy", url: "https://..." }]
             add  onPage: true  to open a Drive file on the page
             instead of in a new tab
   what / role / skills: shown in the "About this work sample" dropdown
   thumbnail: "auto" = Drive's preview image, "" = none,
              or an image file name you uploaded

   Every Drive file must be shared as "Anyone with the link can view".
   ========================================================= */

const PORTFOLIO_INTRO =
  "Selected work in learning design, multimedia, digital systems and research. Select a sample to open it, or use the dropdown to read about it.";

const PORTFOLIO_ITEMS = [

  /* ---------- 1. Learning Design ---------- */
  {
    section: "Learning Design",
    title: "Chord Basics Interactive Lesson",
    type: "Interactive Google Slides",
    link: "https://docs.google.com/presentation/d/1Xmz6-hjkIncIF7RQMRnjaa6RY7_VyYo7de3prANUdH0/edit?usp=sharing",
    extras: [
      { label: "Watch it in use", url: "" },   // ADD: link to the video of the deck in use
      { label: "Get a copy", url: "https://docs.google.com/presentation/d/1Xmz6-hjkIncIF7RQMRnjaa6RY7_VyYo7de3prANUdH0/copy" }
    ],
    what: "A self-paced, interactive slide deck for middle school music. Students watch a demonstration video, build chords in drag-and-drop activities, play them on a linked online xylophone, and can unlock an optional next level.",
    role: "Designed and built the lesson, including the activities, navigation and a help page linking to my video tutorials.",
    skills: ["Interactive learning design", "Self-paced learning", "Google Slides"],
    thumbnail: "auto"
  },
  {
    section: "Learning Design",
    title: "Assessment Task Sheet with Video Tutorials",
    type: "Assessment Design",
    link: "",   // ADD: Drive link to the task sheet
    what: "An assessment task sheet with step-by-step video tutorials linked throughout, so students can get help at the moment they need it.",
    role: "Designed the task and assessment criteria, and recorded the linked tutorial videos.",
    skills: ["Assessment design", "Video tutorials", "Learner support"],
    thumbnail: "auto"
  },

  /* ---------- 2. Multimedia & Design ---------- */
  {
    section: "Multimedia & Design",
    title: "Matilda the Musical JR.",
    type: "Video & Print Design",
    link: "https://drive.google.com/file/d/1VUfd0uD2mInGK5Qvo0uSrPrdLQzgGNTx/view?usp=sharing",
    openLabel: "Watch Video",
    extras: [
      { label: "View Program", url: "https://drive.google.com/file/d/1ZzQDW_Bh5W5JmY0o0UR248oJVlmHumh6/view?usp=sharing", onPage: true }
    ],
    what: "A promotional video trailer and the printed program for the Columbia Grammar & Preparatory School middle school production of Matilda the Musical JR., March 2022.",
    role: "Produced and edited the trailer, and designed the program layout and content.",
    skills: ["Video editing", "Layout design", "Visual communication"],
    thumbnail: "auto"
  },
  {
    section: "Multimedia & Design",
    title: "Junior Area All-State Concert Programs",
    type: "Print Design",
    link: "https://drive.google.com/file/d/1HsSlNhdN2JkyFxif6QkSpIxicut0ep1q/view?usp=sharing",
    openLabel: "2025 Program",
    extras: [
      { label: "2024 Program", url: "https://drive.google.com/file/d/10GyrkeDSwiS5lkU3a4L0crAJxtVMAiia/view?usp=sharing", onPage: true }
    ],
    what: "Concert programs for the 2024 and 2025 MEANYC Junior Area All-State concerts, featuring students from schools across New York City.",
    role: "Designed both programs.",
    skills: ["Layout design", "Event communication"],
    thumbnail: "auto"
  },
  {
    section: "Multimedia & Design",
    title: "MEANYC Event Flyers & Social Media Graphics",
    type: "Graphic Design",
    link: "",   // ADD: Drive link to the flyers and social graphic
    what: "Event flyers and a social media graphic promoting MEANYC events to music educators.",
    role: "Designed the flyers and graphics.",
    skills: ["Graphic design", "Social media", "Brand consistency"],
    thumbnail: "auto"
  },

  /* ---------- 3. Digital Systems & Reporting ---------- */
  {
    section: "Digital Systems & Reporting",
    title: "MEANYC Digital Media Board Report",
    type: "Analytics Report",
    link: "https://drive.google.com/file/d/16BOchFtRkfpHLZYHsj8dkS_2xeRw1teh/view?usp=sharing",
    what: "A September 2024 report to the MEANYC board covering website traffic, top pages, traffic sources, search keywords and online sales.",
    role: "Prepared and presented the report to the board as Digital Media Manager.",
    skills: ["Web analytics", "Data reporting", "Stakeholder communication"],
    thumbnail: "auto"
  },
  {
    section: "Digital Systems & Reporting",
    title: "Lesson Scheduling Automation",
    type: "Google Sheets + Apps Script",
    link: "https://drive.google.com/file/d/1y4qIUDEiZI3hIQGMb0nMHAlii8z1gT_M/view?usp=sharing",
    what: "Screenshots of a tool that turns lesson sign-ups in Google Sheets into Google Calendar events automatically.",
    role: "Wrote the Apps Script and built the workflow, replacing manual scheduling.",
    skills: ["Apps Script", "Google Workspace", "Workflow automation"],
    thumbnail: "auto"
  },

  /* ---------- 4. Research ---------- */
  {
    section: "Research",
    title: "Cognitive Processing in Digital Audio Workstation Composing",
    type: "Published Article",
    link: "https://drive.google.com/file/d/13Yuiy2fuWq0RJlmmwk4y5fgS-8sWvnMW/view?usp=sharing",
    what: "A peer-reviewed article in General Music Today (2021) on how students think and learn when creating in GarageBand and Soundtrap, in class and online.",
    role: "Sole author.",
    skills: ["Technology-enhanced learning", "Online learning", "Research"],
    thumbnail: "auto"
  },
  {
    section: "Research",
    title: "Are Schwab's Commonplaces Common in Music Teaching?",
    type: "Doctoral Dissertation",
    link: "https://drive.google.com/file/d/1rzqth5ZwjkmHrgeNrvnhWecwwUe3mxsO/view?usp=sharing",
    what: "Ed.D. dissertation, Teachers College, Columbia University (2021). A study of how seven New York City middle school music teachers planned curriculum and adapted instruction.",
    role: "Sole researcher and author.",
    skills: ["Curriculum design", "Qualitative research", "Teacher practice"],
    thumbnail: "auto"
  },
];
