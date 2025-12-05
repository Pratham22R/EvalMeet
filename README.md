# EvalMeet 🎥💬

<br />
    <a href="https://evalmeet.vercel.app/" target="_blank">
      <img src="public/readme/evalmeetposter.png" alt="Project Banner">
    </a>
<br/><br />

**EvalMeet** is a modern, full-stack interview platform built with **Next.js 14**, **Convex**, **Clerk**, and **Stream Video SDK**. It enables seamless technical interviews, real-time collaboration, scheduling, and recording — all with a beautiful UI and a premium developer experience.

🌐 **Live Site**: [evalmeet.vercel.app](https://evalmeet.vercel.app)

---

## ✨ Features

- 🔐 **Authentication** via [Clerk](https://clerk.dev)
- 🎥 **Video Rooms** powered by [Stream Video SDK](https://getstream.io)
- 🧠 **Smart Interview Tools** — code editor, comments, and scheduling
- 📼 **Interview Recordings** to revisit candidate sessions
- 📊 **Admin Dashboard** for managing interview workflows
- 🌗 **Dark/Light Theme** toggle
- ⚡ **Convex Backend** for real-time data management
- 💅 **TailwindCSS + ShadCN/UI** for beautiful UI components

---

## 🗂️ Directory Overview

```bash
Directory structure:
└── pratham22r-evalmeet/
    ├── README.md
    ├── components.json
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.mjs
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── convex/
    │   ├── README.md
    │   ├── auth.config.ts
    │   ├── comments.ts
    │   ├── http.ts
    │   ├── interview.ts
    │   ├── schema.ts
    │   ├── tsconfig.json
    │   ├── users.ts
    │   └── _generated/
    │       ├── api.d.ts
    │       ├── api.js
    │       ├── dataModel.d.ts
    │       ├── server.d.ts
    │       └── server.js
    └── src/
        ├── middleware.ts
        ├── actions/
        ├── app/
        │   ├── globals.css
        │   ├── layout.tsx
        │   ├── page.tsx
        │   ├── (admin)/
        │   │   └── dashboard/
        │   ├── (auth)/
        │   │   ├── layout.tsx
        │   │   ├── home/
        │   │   ├── meeting/
        │   │   ├── recordings/
        │   │   └── schedule/
        │   ├── sign-in/
        │   └── sign-up/
        ├── components/
        │   ├── ActionCard.tsx
        │   ├── ClientProviders.tsx
        │   ├── CodeEditor.tsx
        │   ├── CommentDialog.tsx
        │   ├── DasboardBtn.tsx
        │   ├── EndCallButton.tsx
        │   ├── LoaderUI.tsx
        │   ├── MeetingCard.tsx
        │   ├── MeetingModal.tsx
        │   ├── MeetingRoom.tsx
        │   ├── MeetingSetup.tsx
        │   ├── ModeToggle.tsx
        │   ├── Navbar.tsx
        │   ├── RecordingCard.tsx
        │   ├── UserInfo.tsx
        │   ├── landing/
        │   ├── providers/
        │   │   ├── ConvexClerkProvider.tsx
        │   │   ├── StreamClientProvider.tsx
        │   │   └── ThemeProvider.tsx
        │   └── ui/
        ├── constants/
        ├── hooks/
        └── lib/
```

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Auth**: Clerk.dev
- **Backend**: Convex (Serverless Functions + DB)
- **Video**: Stream Video SDK
- **Styling**: TailwindCSS + ShadCN
- **Type Safety**: TypeScript
- **Hosting**: Vercel

---

## 🧪 Local Development

1. **Clone the repo:**

```bash
   git clone https://github.com/your-username/pratham22r-evalmeet.git
   cd pratham22r-evalmeet
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a .env.local file and add your keys for:

    Clerk

    Convex

    Stream

4. **Run the development server:**

```bash
npm run dev
```

---

## 📦 Deployment

EvalMeet is deployed on Vercel. You can deploy your own version by:

Forking the repo

Connecting it to Vercel

Adding the required environment variables

---

## 🤝 Contribution

If you'd like to contribute:

Fork the repo

Create a new branch

Submit a pull request

Open to ideas, bug fixes, UI enhancements, or documentation help!

---

## 📬 Contact

Feel free to reach out for collaboration, suggestions, or questions:

    🌐 Website: https://pratham-portfolio-op6k.onrender.com/

    💼 LinkedIn: https://www.linkedin.com/in/pratham-raghuvanshi-9b782127b/

    🐙 GitHub: https://github.com/Pratham22R

---

Made with ❤️ by Pratham
