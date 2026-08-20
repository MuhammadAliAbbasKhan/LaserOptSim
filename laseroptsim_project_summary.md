# LaserOptSim — Complete Project Architecture & Summary Guide

---

## 1. Executive Summary

**LaserOptSim** is an independent, complete web application created as a modern clone of the architecture of `optillumsoft`, featuring a brand-new frontend visually inspired by **BeamXpert** (`https://www.beamxpert.com/en/beamxpertdesigner`).

- **Location**: `d:\Batch new\1 -15 websites\laseroptsim`
- **Backend Stack**: Django REST Framework + MongoDB Cloud Dual Storage (`laseroptsim_db`) + SQLite + Gunicorn WhiteNoise
- **Frontend Stack**: Vite + React 18 + Lucide Icons + Axios API client
- **Header & Footer**: Exact replica clone of BeamXpert layout, logo style, language toggle (`DE | EN`), search bar, and 4-column footer layout.
- **Sub-pages**: 11 dedicated, fully interactive pages covering every header and footer link.

---

## 2. Page & Sub-Page Route Inventory

| Navigation Key | Page Component | Description |
| :--- | :--- | :--- |
| `designer` | `DesignerPage.jsx` | Main product showcase for **LaserOptSimDESIGNER** with live 2D interactive laser ray tracing canvas simulator. |
| `applications` | `ApplicationsPage.jsx` | 5 major laser optics application domains (Fiber Coupling, Laser Resonators, Material Processing, Micro-Optics, Thermal Lensing). |
| `shop` | `ShopPage.jsx` | Commercial, Academic, and Enterprise software licensing options with Stripe payment checkout integration. |
| `support` | `SupportPage.jsx` | Documentation hub, video tutorial library links, user manual download, FAQ accordion, and support ticket form. |
| `whoweare` | `WhoWeArePage.jsx` | LaserOptSim GmbH company history, optical research PhD team, university partners, and Berlin headquarters map. |
| `legal` | `LegalNoticePage.jsx` | Official Impressum, court register HRB 249821 B, VAT ID DE 349 812 045, and managing directors. |
| `privacy` | `PrivacyStatementPage.jsx` | GDPR data protection compliance, cookie policy, server log files, and privacy rights. |
| `terms` | `TermsConditionsPage.jsx` | End User License Agreement (EULA), software warranty, and license grant terms. |
| `servicespecs` | `ServiceSpecificationPage.jsx` | Hardware system requirements, NVIDIA CUDA GPU acceleration, and supported optical CAD formats. |
| `howtoorder` | `HowToOrderPage.jsx` | Procurement workflows, pro-forma quote requests, SEPA / SWIFT bank wire transfer details. |
| `admin` | `AdminDashboardPage.jsx` | High-tech Executive Admin Control Panel with live MongoDB status card, revenue telemetry, user plan updates, and trial leads. |

---

## 3. Core Working Features & Data Flow

1. **Exact Replica BeamXpert Header & Footer**:
   - Logo text `LaserOptSim` with slogan `make light matter`.
   - Upper control bar with Quick Search Modal trigger and `DE | EN` language toggle state.
   - Navigation Bar with light grayish-blue backdrop (`#e5ebf2`) and hover indicators.
   - Footer on soft backdrop (`#d1dbe5`) with 4 distinct columns: Berlin contact info, legal documents, nav links, Vimeo video badge.
2. **Dual Storage MongoDB Synchronization**:
   - User signups, subscriptions, trial requests, contact inquiries, and service briefs are stored in SQLite (`db.sqlite3`) AND automatically mirrored to MongoDB Atlas (`laseroptsim_db`).
3. **Interactive 2D Laser Optics Simulator**:
   - Live canvas rendering Gaussian beam waist $w_0$, Rayleigh length $z_R$, divergence angle $\theta$, ABCD thin lens transformations, and ray density controls.
