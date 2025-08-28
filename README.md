# Scruffy Butts Prototype

This repository contains a simple browser‑based prototype of the **Scruffy Butts** dog grooming application. It is written in a single HTML file using React (loaded from a CDN) and does not require a build step. The prototype allows you to:

- Navigate between **Home**, **Book**, **Calendar**, **Clients**, **Admin**, and **Messages** tabs.
- Book appointments by selecting a client, pet, service, stylist, and date/time.
- View scheduled appointments on a calendar and mark them complete.
- View client details and their pets.
- See a basic payroll summary and employee schedules.
- Exchange simple chat messages in a messaging view (demo only; no backend).

## How to run

To run the prototype locally, simply open `index.html` in your web browser:

```bash
cd scruffy-butts-prototype
open index.html # or double click the file to open in your default browser
```

Since the project uses React from a CDN and is bundled in a single file, no additional setup is required. You can also deploy this project to a static host such as **GitHub Pages** by configuring your repository to serve the `index.html` file.

## Next steps

This prototype is for layout and interaction testing only. For a production iOS app, the user interface will need to be ported back into SwiftUI and integrated with a backend (e.g. Firebase) for data persistence, authentication, and real‑time messaging.