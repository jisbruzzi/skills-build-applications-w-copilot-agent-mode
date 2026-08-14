import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../api.js';

function Workouts() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('/api/workouts/'));

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
          setError(err instanceof Error ? err.message : 'Unable to load workouts.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="mb-3">Workouts</h2>

        {records.length === 0 ? (
          <p className="text-muted mb-0">No workout plans are available yet.</p>
        ) : (
          <div className="list-group">
            {records.map((workout, index) => (
              <div key={workout._id ?? `${workout.name}-${index}`} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <h5 className="mb-1">{workout.name ?? workout.type ?? 'Workout plan'}</h5>
                    <p className="mb-1 text-secondary">{workout.focus ?? workout.description ?? 'No description provided.'}</p>
                  </div>
                  <span className="badge bg-warning text-dark rounded-pill">{workout.duration ?? workout.length ?? 'N/A'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
