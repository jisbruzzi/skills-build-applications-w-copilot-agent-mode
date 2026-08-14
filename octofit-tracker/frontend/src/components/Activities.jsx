import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../api.js';

function Activities() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('/api/activities/'));

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
          setError(err instanceof Error ? err.message : 'Unable to load activities.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="mb-3">Activities</h2>

        {records.length === 0 ? (
          <p className="text-muted mb-0">No activity logs are available yet.</p>
        ) : (
          <div className="list-group">
            {records.map((activity, index) => (
              <div key={activity._id ?? `${activity.name}-${index}`} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <h5 className="mb-1">{activity.type ?? activity.name ?? 'Workout activity'}</h5>
                    <p className="mb-1 text-secondary">{activity.user ?? activity.member ?? 'Unknown user'}</p>
                  </div>
                  <span className="badge bg-success rounded-pill">{activity.points ?? 0} pts</span>
                </div>
                <div className="small text-muted mt-2">
                  {activity.date ? new Date(activity.date).toLocaleDateString() : 'No date recorded'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
