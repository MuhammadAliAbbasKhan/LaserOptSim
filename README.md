# LaserOptSim — Physical Optics Ray Tracing & Laser Beam Simulation Software

LaserOptSim is a decoupled full-stack web application for physical optics simulation, laser beam propagation modeling, and optical CAD design.

## Architecture

- **Backend**: Django REST Framework (Python 3.12) with dual-storage SQLite (`db.sqlite3`) & MongoDB Cloud (`laseroptsim_db`) sync, Django Messages interceptor, and Gunicorn WSGI.
- **Frontend**: React + Vite SPA styled after **BeamXpert** (`https://www.beamxpert.com/en/beamxpertdesigner`).

## Quick Start

### 1. Django Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Runs at `http://127.0.0.1:8000/`

### 2. React Vite Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173/`

## Admin Portal
- Dashboard Route: Open top navigation menu and click **Admin 🛡️**.
- Default Passcode: `LaserOpt#2026!Admin` (or `admin123`).
