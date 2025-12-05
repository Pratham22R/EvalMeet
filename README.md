# 🎥💬 EvalMeet —  Technical Interview Platform

<div align="center">
  <a href="https://evalmeet.vercel.app/" target="_blank">
    <img src="public/readme/evalmeetposter.png" alt="Project Banner" width="900" height="450"/>
  </a>

  <br /><br />

  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=next.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Convex-4A90E2?style=for-the-badge&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Clerk.dev-6C47FF?style=for-the-badge&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Stream%20Video-00C7B7?style=for-the-badge&logoColor=white"/>
    <br/>
    <img src="https://img.shields.io/badge/-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Shadcn UI-black?style=for-the-badge&logoColor=white"/>
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  </div>

  <br />

  <h3 align="center">Real-Time Interviews. Collaboration. Scheduling. Recording. All in One Platform.</h3>

  <a href="https://evalmeet.vercel.app/" target="_blank">
    🔥 <b>Live Demo</b>
  </a>
</div>

---

## 📋 Table of Contents

- ✨ [Introduction](#introduction)
- ⚙️ [Tech Stack](#tech-stack)
- 🔋 [Features](#features)
- 🤸 [Quick Start](#quick-start)
- 📡 [Environment Variables](#environment-variables)
- 🧱 [Architecture Overview](#architecture-overview)
- 🗂️ [Directory Overview](#directory-overview)
- 🚀 [Deployment](#deployment)
- 🤝 [Contributing](#contributing)
- 📬 [Contact](#contact)

---

## ✨ Introduction

**EvalMeet** is a powerful, modern platform designed for seamless technical interviews with:

- Real-time video calls  
- Collaborative coding  
- Commenting & feedback  
- Scheduling workflows  
- Automatic recording & playback  
- Admin dashboards  
- Beautiful UI powered by Tailwind + Shadcn  

Built with **Next.js 14**, **Convex**, **Clerk**, and **Stream Video SDK**, EvalMeet provides a production-ready interview environment for teams, bootcamps, and organizations.

---

## ⚙️ Tech Stack

### **Frontend**
- Next.js 14 (App Router)
- Shadcn/UI
- TailwindCSS
- TypeScript

### **Backend**
- Convex (realtime DB + functions)
- Stream Video SDK
- Clerk Authentication

### **Infrastructure**
- Vercel (hosting)
- Convex Cloud
- Stream Cloud Services

---

## 🔋 Features

### 🎥 **Real-Time Video Rooms**
- HD Stream-powered video  
- Auto device setup  
- Participant state tracking  
- Smooth join/leave UX  

### 🧠 **Interview Tools**
- Integrated collaborative code editor  
- Comment dialogs  
- Realtime updates via Convex  

### 📅 **Scheduling System**
- Create/edit interview sessions  
- Dashboard for upcoming meetings  
- Unified meeting management  

### 📼 **Recordings**
- Automatic session recording  
- Playback UI  
- Timestamps + metadata  

### 📊 **Admin Dashboard**
- Manage interviews  
- View recordings  
- Track user activity  

### 🌗 **Dark/Light Theme**
- Built-in theme switch using Shadcn  

---

## 🤸 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/pratham22r-evalmeet.git
cd pratham22r-evalmeet
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Add Environment Variables
```bash
#Create a .env.local file:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_FRONTEND_API_URL=

CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
```
### 4. Start Development Server
```bash
npm run dev
```
### 5. Link on which app is running
```bash
http://localhost:3000
```
---

## 🧱 Architecture Overview

### **Frontend (Next.js)**

- App Router
- Server + client components
- Shadcn UI

### **Backend (Convex)**

- Realtime queries/mutations
- Data models for interviews, comments, recordings

### **Video Layer (Stream)**


Room creation

Recording pipeline

Device & participant lifecycle

Auth Layer (Clerk)

User identity

Route protection