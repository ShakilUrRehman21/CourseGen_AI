<div align="center">

# 🎓 CourseGen AI
### Interactive AI Course & Curriculum Generator

An intelligent, full-stack learning platform that automatically synthesizes structured masterclass courses, synchronizes targeted YouTube video lectures, and formats interactive code sandboxes in seconds.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-Flash%20Latest-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Neon Postgres](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql)](https://neon.tech/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%203.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Key Features](#-key-features) • [Tech Stack](#-technology-stack) • [Quick Start](#-quick-start) • [Environment Setup](#-environment-variables) • [Database Architecture](#-database-schema) • [Troubleshooting](#-troubleshooting--faqs)

---

</div>

## ✨ Key Features

- **🪄 Intelligent Curriculum Synthesis**: Generate complete, pedagogical lesson plans tailored by subject, skill level (Beginner, Intermediate, Advanced), duration, and chapter count.
- **🛡️ Multi-Model AI Resiliency**: Built-in multi-model fallback chain (`gemini-flash-latest` $\rightarrow$ `gemini-flash-lite-latest` $\rightarrow$ `gemini-3.8-flash` $\rightarrow$ `gemini-pro-latest`) with exponential backoff retry to prevent 503 capacity spikes and 404 deprecations.
- **🎥 Targeted YouTube Video Synchronization**: Queries the YouTube Data v3 API using educational keywords (`"${courseTitle} ${chapterTitle} tutorial"`) to sync relevant video lectures to each chapter.
- **💻 Interactive Code & Concept Breakdown**: Clear markdown formatting with code snippet cards featuring syntax styling and 1-click clipboard copying.
- **🎨 Market-Ready Light Design System**: Clean Slate-50 canvas, crisp Indigo-600 accents, glassmorphic header, mobile drawer navigation, responsive split-pane learning view, and modern progress steppers.
- **🔐 Robust Route & Resource Security**: Clerk authentication middleware protecting course generation workflows, cascading database cleanup on deletion, and input sanitization to prevent quota abuse.
- **🌐 Public Course Discovery & Sharing**: Explore community-published courses with search filtering, pagination, and shareable 1-click dynamic links.
- **🗄️ Visual Database Management**: Out-of-the-box Drizzle Studio support for inspecting Postgres tables in your browser.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | JavaScript (ES6+), React 18 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), Radix UI Primitives, Lucide & React Icons |
| **AI Engine** | [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai) (`gemini-flash-latest`) |
| **Database** | [Neon Serverless PostgreSQL](https://neon.tech/) with [Drizzle ORM](https://orm.drizzle.team/) |
| **Media APIs** | YouTube Data API v3 (Axios), Firebase Cloud Storage (Custom banners) |
| **Authentication** | [Clerk Auth](https://clerk.com/) (`@clerk/nextjs`) |

---

## 📂 Project Structure

```bash
ai-course-generator/
├── app/
│   ├── (auth)/                         # Clerk authentication pages (Sign-in / Sign-up)
│   ├── _components/                    # Shared landing page components (Header, Hero, Footer)
│   ├── _context/                       # React context (UserCourseList, UserInput)
│   ├── _shared/                        # Static metadata (CategoryList)
│   ├── course/[courseId]/              # Public course detail overview
│   │   └── start/                      # Split-pane interactive course player & video viewer
│   ├── create-course/                  # 3-step interactive course generation wizard
│   │   └── [courseId]/                 # Review course outline & generate lesson content
│   │       └── finish/                 # Course ready & shareable URL celebration screen
│   ├── dashboard/                      # Creator dashboard, workspace overview & metrics
│   │   ├── contact/                    # Feedback and support form
│   │   ├── explore/                    # Community published courses gallery
│   │   └── vision/                     # Platform mission & architecture specs
│   ├── globals.css                     # Tailwind design tokens, light theme & glassmorphism
│   ├── layout.js                       # Root layout with Outfit font & Clerk Provider
│   └── page.js                         # SaaS Landing Page
├── components/
│   └── ui/                             # Shadcn & Radix UI primitives (Button, Dialog, Select, etc.)
├── configs/
│   ├── AiModel.jsx                     # Resilient Gemini AI client with multi-model fallback
│   ├── db.jsx                          # Neon serverless Postgres connection
│   ├── fireBase.jsx                    # Firebase Cloud Storage configuration
│   ├── schema.jsx                      # Drizzle ORM schema (CourseList, Chapters)
│   └── service.jsx                     # YouTube Data API educational video searcher
├── lib/
│   ├── jsonHelper.js                   # Safe JSON parser handling code fences & LLM formatting
│   └── utils.js                        # Tailwind class merger (cn)
├── drizzle.config.js                   # Drizzle Kit configuration
├── middleware.ts                       # Clerk route protection middleware
├── next.config.mjs                     # Remote image patterns & Next.js config
└── package.json                        # Dependencies and npm scripts
```

---

## ⚙️ Environment Variables

Create a file named `.env.local` in the root of `ai-course-generator/`:

```env
# Clerk Authentication (https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini API (https://aistudio.google.com)
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...

# Neon PostgreSQL Database Connection (https://neon.tech)
NEXT_PUBLIC_DB_CONNECTION_STRING=postgresql://username:password@ep-xyz.us-east-2.aws.neon.tech/dbname?sslmode=require

# Firebase Cloud Storage (https://console.firebase.google.com)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...

# YouTube Data API v3 (https://console.cloud.google.com)
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSy...

# Base Hostname for sharing URLs
NEXT_PUBLIC_HOST_NAME=http://localhost:3000/
```

### Where to obtain the keys:
1. **Gemini API Key**: Visit [Google AI Studio](https://aistudio.google.com/), click **Get API key**, and create a free key.
2. **Clerk Keys**: Sign in to [Clerk Dashboard](https://dashboard.clerk.com/), create an application, and copy the Publishable & Secret keys.
3. **Neon Database**: Create a free PostgreSQL instance on [Neon](https://neon.tech/) and copy the pooled connection string.
4. **YouTube API Key**: In [Google Cloud Console](https://console.cloud.google.com/), enable the **YouTube Data API v3** and generate an API credential key.
5. **Firebase Key**: In [Firebase Console](https://console.firebase.google.com/), create a project and enable Storage.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: Version 18.17.0 or higher
- **Package Manager**: `npm` (or `yarn` / `pnpm`)

### 2. Install Dependencies
```bash
npm install
```

### 3. Push Database Schema
Apply the Drizzle schema to your Neon PostgreSQL database:
```bash
npm run db:push
```

### 4. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 5. Launch Database Studio (Optional)
To inspect your database tables and rows visually:
```bash
npm run db:studio
```
Open **[https://local.drizzle.studio](https://local.drizzle.studio)** in your browser.

---

## 🗄️ Database Schema

The database consists of two primary relational tables defined in `configs/schema.jsx`:

### 1. `CourseList` Table
Stores course metadata and curriculum outlines:
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `serial` | Auto-incrementing primary key |
| `courseId` | `varchar` | Unique UUID identifier for routing |
| `name` | `varchar` | Course title / topic |
| `category` | `varchar` | Knowledge domain (Programming, Design, etc.) |
| `level` | `varchar` | Difficulty level (Beginner, Intermediate, Advance) |
| `includeVideo` | `varchar` | User video preference (`Yes` / `No`) |
| `courseOutput` | `json` | Complete curriculum outline generated by AI |
| `createdBy` | `varchar` | Clerk primary email address of creator |
| `userName` | `varchar` | Display name of author |
| `userProfileImage`| `varchar` | Avatar URL |
| `courseBanner` | `varchar` | Firebase image URL or placeholder |
| `publish` | `boolean` | Publication state (`true` once chapters are ready) |

### 2. `Chapters` Table
Stores individual lesson chapters and video IDs:
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `serial` | Primary key |
| `courseid` | `varchar` | Foreign courseId mapping to `CourseList` |
| `chapterId` | `integer` | 0-indexed lesson sequence |
| `content` | `json` | In-depth concept descriptions and code snippets |
| `videoId` | `varchar` | Matched YouTube video ID |

---

## 💡 How Course Generation Works

```mermaid
graph TD
    A[User Enters Topic & Options] -->|Create Wizard| B[GenerateCourseLayout_AI]
    B -->|Gemini Flash Latest| C[Curriculum JSON Outline]
    C -->|Save Course Metadata| D[(Neon PostgreSQL)]
    D -->|User Reviews Layout| E[GenerateChapterContent_AI]
    E -->|Search Targeted Video| F[YouTube Data API]
    E -->|Generate Deep Lessons| G[Gemini Concepts & Code]
    F & G -->|Save Sequential Chapters| H[(Chapters Table)]
    H -->|Mark Published| I[Interactive Course Player Ready!]
```

1. **Curriculum Outline**: `GenerateCourseLayout_AI` formulates a multi-chapter structure matching user difficulty and duration.
2. **Review & Customization**: The author can edit the title, adjust the description, and upload a custom course banner.
3. **Sequential Chapter Synthesis**: Content is generated chapter by chapter. Relevant YouTube videos are matched via targeted educational search queries.
4. **Publishing**: The course is marked as published, and a shareable URL is generated for public or private study.

---

## 🛠️ Troubleshooting & FAQs

### Q: Why did course generation fail with "Failed to generate course layout"?
- **Check API Key**: Verify your `NEXT_PUBLIC_GEMINI_API_KEY` in `.env.local` is active and has not expired.
- **Model Compatibility**: If using direct model names, ensure you use `gemini-flash-latest` or `gemini-flash-lite-latest` rather than deprecated model versions (e.g. `gemini-1.5-flash`). The application now handles this automatically with a multi-model fallback chain.

### Q: What if YouTube API returns quota errors?
- The YouTube search service gracefully catches 403 quota errors and defaults `videoId` to an empty string `""`. Chapter generation will proceed without interruption, and the lesson player will display the text & code module.

### Q: How do I change the database connection if the database gets full?
- Update `NEXT_PUBLIC_DB_CONNECTION_STRING` in `.env.local` and `drizzle.config.js`.
- Run `npm run db:push` to apply the tables to the new database.

---

## 📜 Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the Next.js app in development mode on port 3000 |
| **Build** | `npm run build` | Builds the production bundle and validates type correctness |
| **Start** | `npm run start` | Runs the optimized production build |
| **Push DB** | `npm run db:push` | Pushes Drizzle ORM schema to the PostgreSQL database |
| **Studio DB** | `npm run db:studio` | Launches Drizzle Studio visual database inspector |
| **Lint** | `npm run lint` | Runs Next.js ESLint checks |

---

<div align="center">
Built with ❤️ using Next.js 14, Google Gemini, and Neon Postgres.
</div>
