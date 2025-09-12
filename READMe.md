# RecycloMate

> A full-stack web application for sustainable urban waste management, enabling efficient scheduling and tracking of recyclable waste pickups.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Overview
RecycloMate connects users, pickup agents, and administrators through a centralized platform to promote eco-friendly behavior and incentivize recycling. Users can register, schedule pickups, track their history, and earn eco-points for submitting recyclable materials. Pickup agents manage assigned tasks and update statuses, while administrators oversee user approvals, agent assignments, statistics, and reporting.

## Features
- **Waste Classification Options:** Users manually select waste categories for accurate coordination.
- **Schedule Pickups:** Users can request pickups based on waste type and preferred time slots.
- **Eco-Points System:** Points are awarded based on the type and quantity of waste submitted. Points can be redeemed for cash or rewards.
- **Automated Reminders:** SMS/WhatsApp alerts (via Twilio or WhatsApp Business API) help minimize missed pickups.
- **User Roles:**
  - **Users:** Register, schedule pickups, track history, earn/redeem eco-points.
  - **Pickup Agents:** View and manage assigned pickups, update statuses.
  - **Administrators:** Approve users, assign agents, monitor statistics, generate reports.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (or React)
- **Backend:** Node.js, Express.js
- **Database:** MySQL (modular relational schema)
- **Notifications:** Twilio or WhatsApp Business API

## Database Schema
- **Users:** Stores user information and roles
- **Pickups:** Tracks pickup requests, statuses, and assignments
- **Eco-Points:** Records points earned and redeemed
- **Waste Categories:** Defines types of recyclable materials

