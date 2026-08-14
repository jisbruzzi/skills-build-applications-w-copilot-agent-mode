import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../api.js';

function Users() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('/api/users/'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const data = normalizeRecords(payload);

        if (isMounted) {
          setRecords(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load users.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="mb-3">Users</h2>

        {records.length === 0 ? (
          <p className="text-muted mb-0">No user records are available yet.</p>
        ) : (
          <div className="list-group">
            {records.map((user, index) => (
              <div key={user._id ?? `${user.name}-${index}`} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <h5 className="mb-1">{user.name ?? user.username ?? 'Unknown member'}</h5>
                    <p className="mb-1 text-secondary">{user.email ?? user.role ?? 'No email on file'}</p>
                  </div>
                  <span className="badge bg-primary rounded-pill">{user.points ?? user.score ?? 0} pts</span>
                </div>
                <div className="small text-muted mt-2">
                  Team: {user.team ?? user.teamName ?? 'Unassigned'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
