# 🚲 Flow Cycle Management API

A backend service to manage bike servicing records, customers, and bikes efficiently. This API provides endpoints for creating, updating, and retrieving information about bike services, tracking status updates like "pending", "in-progress", and "completed", and identifying overdue services.

---

## 🔗 Live Backend Link

🌐 [Live API ](https://flow-cycle-server.vercel.app)

---

## 🧰 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **TypeScript** – Typed JavaScript
- **Prisma ORM** – Type-safe database queries
- **PostgreSQL** – Relational database
- **Zod** – Input validation
- **dotenv** – Environment variable management
- **ts-node-dev** – Development runtime for TypeScript

---

## ⚙️ Setup Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SharminMily/flow_cycle.git
   cd flow_cycle


✨ Key Features
✅ Create/Update/Delete bikes, customers, and service records

🔍 Get service status (pending, in-progress, completed/done)

⏳ Track overdue services (older than 7 days)

🔗 Relational data handled through Prisma and PostgreSQL

📦 Modular architecture for controllers, services, routes

🛡️ Validation using Zod schema for safer APIs

💬 Meaningful API responses with status and messages

Developed with ❤️ by SM