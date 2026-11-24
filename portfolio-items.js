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
   mainAction: optional, makes the main button open a link in a new tab
             instead of on the page, e.g. a "Make a Copy" link:
             { label: "Make a Copy", url: "https://docs.google.com/.../copy" }
   note:     optional short note shown on the card
   extras:   optional extra buttons, e.g.
             [{ label: "Get a copy", url: "https://..." }]
             add  onPage: true  to open a Drive file on the page
             instead of in a new tab
   what / role / skills: shown in the "About this work sample" dropdown
   thumbnail: "auto" = Drive's preview image, "" = none,
              or an image file name you uploaded

   Every Drive file must be shared as "Anyone with the link can view".
   ========================================================= */

/* Buttons at the top of the portfolio.
   onPage: true  opens the file on the page; otherwise it opens in a new tab.
   style: "wakelet" uses dark navy (set in styles.css as --wakelet). */
const TOP_BUTTONS = [
  { label: "View Resume", url: "https://drive.google.com/file/d/1Dx7Ad1hqnmC55Ywsznw2HCkyKgHruMdo/view?usp=sharing", onPage: true },
  { label: "Wakelet Handout", url: "https://drive.google.com/file/d/1aHlHawd65NZWl-LKrrPvtFLizEsMJod5/view?usp=sharing", onPage: true, style: "wakelet" },
  { label: "Open Wakelet", url: "https://wakelet.com/i/invite?code=20mvw0q2", style: "wakelet" },
];

const PORTFOLIO_INTRO =
  "Selected work in learning design, multimedia, digital systems and research. Select a sample to open it, or use the dropdown to read about it.";

const PORTFOLIO_ITEMS = [

  /* ---------- 1. Learning Design ---------- */
  {
    section: "Learning Design",
    title: "Chord Basics Interactive Lesson",
    type: "Interactive Google Slides",
    link: "https://docs.google.com/presentation/d/16-I_6M3MVG-oSPIAFALhamzzuaI2zVXPgfj6Cn0rUK8/edit?usp=sharing",
    mainAction: { label: "Try It (Get a Copy)", url: "https://docs.google.com/presentation/d/16-I_6M3MVG-oSPIAFALhamzzuaI2zVXPgfj6Cn0rUK8/copy" },
    extras: [
      { label: "View Video", url: "https://drive.google.com/file/d/1G1HZ4NZPX05b_NizHs2M59CFAnKTk6Zm/view?usp=sharing", onPage: true }
    ],
    what: "A self-paced, interactive slide deck for middle school music. Students watch a demonstration video, build chords in drag-and-drop activities, play them on a linked online xylophone, and can unlock an optional next level.",
    role: "Designed and built the lesson, including the activities, navigation and a help page linking to my video tutorials.",
    skills: ["Interactive learning design", "Self-paced learning", "Google Slides"],
    thumbnail: "auto"
  },
  {
    section: "Learning Design",
    title: "Composing a Melody: Online Task with Video Tutorials",
    type: "Online Lesson & Task Sheet",
    link: "https://docs.google.com/document/d/1pQPIwLgfQAOu0X1ZP7yVl0SpotUhPb5_E-ctGxhRhmA/edit?usp=sharing",
    what: "A self-paced online task for Year 7 music. Students compose an 8-bar melody in C major in Soundtrap, choosing to record live or build it in the piano roll, with a short tutorial video linked at each stage.",
    role: "Designed the task, its step-by-step success criteria and the two learning pathways, and created the linked tutorial videos.",
    skills: ["Online task design", "Video tutorials", "Learner choice", "Soundtrap"],
    thumbnail: "auto"
  },

  {
    section: "Learning Design",
    title: "edTPA Guide: Instruction Commentary",
    type: "Annotated Learner Guide",
    link: "https://docs.google.com/document/d/1lzmMVxlEZ12ksTlI9_PhpuCKcsZzXNDwO0hVhxUUSLU/edit?usp=sharing",
    what: "An annotated guide to edTPA Task 2 for music education candidates. For each prompt it sets out how long the response should be, ways to organise it, and how to cite evidence from teaching video clips.",
    role: "Created the guide while mentoring the 2020 and 2021 music education cohorts at Teachers College, Columbia University, who achieved a 100% edTPA pass rate.",
    skills: ["Scaffolding", "Assessment literacy", "Adult learning"],
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
    title: "MEANYC Marketing",
    type: "Design & E-commerce",
    link: "https://drive.google.com/file/d/1iS4G6qdS4F3QGr15khaxsX_k30nSi6YU/view?usp=sharing",
    openLabel: "Flyers",
    extras: [
      { label: "Social Media", url: "https://drive.google.com/file/d/1VHTf_bihRkdwUVwemh_RCkHSQXOH5-SN/view?usp=sharing", onPage: true },
      { label: "Merch Store", url: "https://www.meanyc.org/merch" }
    ],
    note: "Some QR codes in the flyers may be out of date.",
    what: "Marketing for the Music Educators Association of New York City: QR code event flyers, a social media graphic, and the association's merchandise range (tote bags, pins, drinkware, hats, tees and hoodies) sold through its online store.",
    role: "Designed the flyers, the social media graphic and the merchandise, and set up the e-commerce store that sells the merch online.",
    skills: ["Graphic design", "Merchandise design", "E-commerce setup", "Social media"],
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

  /* ---------- 4. Research & Presentations ---------- */
  {
    section: "Research & Presentations",
    title: "Moving a Middle School General Music Class Online",
    type: "Conference Presentation",
    link: "https://drive.google.com/file/d/1Id493Ce8s6uRAkG5UhPFoel3WuxP-nIf/view?usp=sharing",
    note: "Some QR codes inside may be out of date.",
    what: "Strategies for Success. Session slides from the 57th NAfME Eastern Division Biennial In-Service Conference (April 2021), showing how project-based lessons were designed to work in person, online and in hybrid classes, with assessment examples and student work.",
    role: "Co-designed the curriculum and co-presented the session with Dr. Kary Haddad.",
    skills: ["Online & hybrid learning design", "Project-based learning", "Professional presentation"],
    thumbnail: "auto"
  },
  {
    section: "Research & Presentations",
    title: "Cognitive Processing in Digital Audio Workstation Composing",
    type: "Published Article",
    link: "https://drive.google.com/file/d/13Yuiy2fuWq0RJlmmwk4y5fgS-8sWvnMW/view?usp=sharing",
    what: "A peer-reviewed article in General Music Today (2021) on how students think and learn when creating in GarageBand and Soundtrap, in class and online.",
    role: "Sole author.",
    skills: ["Technology-enhanced learning", "Online learning", "Research"],
    thumbnail: "auto"
  },
  {
    section: "Research & Presentations",
    title: "Are Schwab's Commonplaces Common in Music Teaching?",
    type: "Doctoral Dissertation",
    link: "https://drive.google.com/file/d/1rzqth5ZwjkmHrgeNrvnhWecwwUe3mxsO/view?usp=sharing",
    what: "Ed.D. dissertation, Teachers College, Columbia University (2021). A study of how seven New York City middle school music teachers planned curriculum and adapted instruction.",
    role: "Sole researcher and author.",
    skills: ["Curriculum design", "Qualitative research", "Teacher practice"],
    thumbnail: "auto"
  },
];
