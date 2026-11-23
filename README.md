# renee-duncan.com

## What's in here

| File | What it is |
|---|---|
| `index.html` | Home page: name logo, buttons, About, Publications, Contact |
| `portfolio.html` | Password-protected portfolio page |
| `portfolio-items.js` | **Your portfolio list.** Edit this to add Google Drive items |
| `portfolio.js` | Password check and Drive viewer (only edit the password line) |
| `styles.css` | All colours, fonts and layout |
| `set-password.html` | Helper page to make a new password code |
| `CNAME` | Tells GitHub Pages to use renee-duncan.com |

Default portfolio password: **Portfolio2026** (change it, see below).

## Putting it on GitHub Pages (first time)

1. Sign in at github.com and click **New repository**. Name it anything (e.g. `renee-duncan-site`), set it to **Public**, click **Create repository**.
2. On the new repo page click **uploading an existing file**, drag in every file from this folder (not the folder itself), then click **Commit changes**.
3. Go to **Settings > Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main** and folder **/(root)**, then **Save**.
4. Still in Settings > Pages, the Custom domain box should show `renee-duncan.com` (from the CNAME file). If not, type it and Save.
5. At your domain registrar (where you bought renee-duncan.com), set these DNS records:
   - Four **A** records for `@` pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record for `www` pointing to `YOUR-GITHUB-USERNAME.github.io`
   - Remove any other A records for `@` (e.g. old Squarespace/parking ones).
6. DNS can take a few hours. Once Settings > Pages shows your domain is working, tick **Enforce HTTPS**.

To update the site later: open the file on GitHub, click the pencil icon, edit, **Commit changes**. It goes live in about a minute.

## Adding or changing portfolio items

Everything on the portfolio page comes from `portfolio-items.js`. Each item is one `{ ... },` block:

- `section`: the heading it sits under (items with the same wording group together)
- `title`, `type`: the card's title and small label
- `link`: the main Google Drive link (leave `""` to show "Link coming soon")
- `openLabel`: wording for the main button, e.g. `"Watch Video"` (default is "Open")
- `extras`: extra buttons, e.g. `{ label: "View Program", url: "...", onPage: true }`. With `onPage: true` the file opens on the page; without it, it opens in a new tab.
- `what`, `role`, `skills`: shown in the "About this work sample" dropdown

To get a Drive link: right-click the file > **Share** > General access: **Anyone with the link** (Viewer) > **Copy link**.

Lines marked `ADD:` are links still to fill in.

## Changing the password

Open `set-password.html` (on your live site at renee-duncan.com/set-password.html, or double-click the file on your computer), type a new password, click **Make code**, and paste the code into `portfolio.js` in place of the old one inside the quotes.

## Important: how private is the portfolio?

GitHub Pages can only host static files, so the password is checked in the visitor's browser. It stops casual visitors and keeps the page out of Google, but someone technical who views the page source can see the Drive links in `portfolio-items.js`. Don't put anything truly confidential (student data, private records) in the portfolio. For real access control, share those Drive files only with specific people instead.

## Editing your content

Look for `EDIT:` comments in `index.html`: bio, photo, publications, email and LinkedIn link.
