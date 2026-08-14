import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../api.js';

function Teams() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('/api/teams/'));

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
          setError(err instanceof Error ? err.message : 'Unable to load teams.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="mb-3">Teams</h2>

        {records.length === 0 ? (
          <p className="text-muted mb-0">No team data is available yet.</p>
        ) : (
          <div className="row g-3">
            {records.map((team, index) => (
              <div key={team._id ?? `${team.name}-${index}`} className="col-md-6">
                <div className="card border h-100">
                  <div className="card-body">
                    <h5 className="card-title">{team.name ?? team.teamName ?? 'Unnamed team'}</h5>
                    <p className="text-secondary mb-2">{team.focus ?? team.motto ?? 'No focus configured yet.'}</p>
                    <div className="small text-muted">
                      Members: {team.members ?? team.memberCount ?? 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
