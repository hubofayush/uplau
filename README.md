# 🏷️ UPLAU – Auction Bidding Web App

**UPLAU** is a full-stack web application that allows users to create, list, and participate in product auctions in real-time. Built with a modern JavaScript stack, the platform mimics live auction functionality while providing user registration, bidding history, and product management.

---

## 📌 Project Overview

The goal of UPLAU is to create an intuitive and efficient auction system where users can:
- Register/login securely
- List products for auction
- Place competitive bids in real time
- View bidding history and auction status

It serves as a learning and showcase project for understanding event-driven architecture, real-time features, and CRUD operations.

---

## 🚀 Features

- 🧑‍💼 **User Authentication** (Register, Login, Logout)
- 📦 **Product Listings** (CRUD: create, view, edit, delete)
- 💰 **Bidding Mechanism** (place bids, track highest bidder)
- 🕒 **Auction Timer** for live bidding sessions
- 📜 **Bid History** tracking for transparency
- 📱 **Responsive Design** using modern UI libraries

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS (Templating Engine)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: express-session (cookie-based)
- **Templating & Layout**: EJS with partials and layout integration

---

## 💻 Getting Started

### 🔧 Installation

```bash
git clone https://github.com/hubofayush/uplau.git
cd uplau
npm install

### 📂 Folder Structure

uplau/
│
├── models/          # Mongoose models (User, Product, Bids)
├── routes/          # All route logic (auth, products, bids)
├── views/           # EJS templates
├── public/          # Static files (CSS, JS, images)
├── app.js           # Entry point
└── package.json     # Dependencies and scripts

🧑‍💻 Author
Made with ❤️ by Ayush Amberkar

## 📃 License
This project is licensed under the MIT License.
