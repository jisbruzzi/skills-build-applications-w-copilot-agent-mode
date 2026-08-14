import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function HomePage() {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex align-items-center gap-3 mb-4">
          <img
            src="/octofitapp-small.png"
            alt="Octofit Tracker logo"
            width="64"
            height="64"
            className="rounded-3"
          />
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Octofit Tracker</p>
            <h1 className="display-6 mb-0">Fitness squad dashboard</h1>
          </div>
        </div>

        <p className="lead text-secondary mb-4">
          Track progress, compare teams, and celebrate wins across the whole training program.
        </p>

        <div className="row g-3">
          <div className="col-md-6 col-xl-3">
            <div className="stat-card h-100">
              <span>Members</span>
              <strong>Users</strong>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="stat-card h-100">
              <span>Groups</span>
              <strong>Teams</strong>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="stat-card h-100">
              <span>Moments</span>
              <strong>Activities</strong>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="stat-card h-100">
              <span>Results</span>
              <strong>Leaderboard</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="container py-4 app-shell">
      <nav className="navbar navbar-expand-lg navbar-light bg-white rounded-4 shadow-sm px-3 mb-4 border">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src="/octofitapp-small.png" alt="Octofit logo" width="40" height="40" />
            <span className="fw-bold">Octofit Tracker</span>
          </NavLink>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto gap-2">
              {navItems.map((item) => (
                <li key={item.to} className="nav-item">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-link rounded-pill px-3 ${isActive ? 'active bg-primary text-white' : 'text-dark'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
