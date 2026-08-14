import express, { Express, Request, Response } from 'express';
import config, { API_BASE_URL } from './config/app';
import './config/database';
import User from './models/User';
import Team from './models/Team';
import Activity from './models/Activity';
import LeaderboardEntry from './models/Leaderboard';
import Workout from './models/Workout';

const app: Express = express();
const routes = [
  { name: 'users', path: '/api/users/' },
  { name: 'teams', path: '/api/teams/' },
  { name: 'activities', path: '/api/activities/' },
  { name: 'leaderboard', path: '/api/leaderboard/' },
  { name: 'workouts', path: '/api/workouts/' },
] as const;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    service: 'Octofit Tracker API',
    status: 'ok',
    apiBaseUrl: API_BASE_URL,
    routes: routes.map(({ path }) => path),
  });
});

app.get('/api', (_req: Request, res: Response) => {
  res.json({
    message: 'Octofit Tracker API',
    endpoints: routes.map(({ path }) => path),
    apiBaseUrl: API_BASE_URL,
  });
});

for (const route of routes) {
  app.get(route.path, async (_req: Request, res: Response) => {
    try {
      const resource = route.name;
      let data: unknown[] = [];

      switch (resource) {
        case 'users':
          data = await User.find().lean();
          break;
        case 'teams':
          data = await Team.find().lean();
          break;
        case 'activities':
          data = await Activity.find().sort({ date: -1 }).lean();
          break;
        case 'leaderboard':
          data = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
          break;
        case 'workouts':
          data = await Workout.find().lean();
          break;
        default:
          data = [];
      }

      res.json({
        resource,
        apiBaseUrl: API_BASE_URL,
        data,
      });
    } catch (error) {
      res.status(500).json({
        resource: route.name,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  app.post(route.path, async (req: Request, res: Response) => {
    try {
      const payload = req.body ?? {};
      let createdRecord: unknown;

      switch (route.name) {
        case 'users':
          createdRecord = await User.create(payload);
          break;
        case 'teams':
          createdRecord = await Team.create(payload);
          break;
        case 'activities':
          createdRecord = await Activity.create(payload);
          break;
        case 'leaderboard':
          createdRecord = await LeaderboardEntry.create(payload);
          break;
        case 'workouts':
          createdRecord = await Workout.create(payload);
          break;
        default:
          createdRecord = payload;
      }

      res.status(201).json({
        resource: route.name,
        message: `${route.name} created`,
        data: createdRecord,
      });
    } catch (error) {
      res.status(400).json({
        resource: route.name,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}

if (require.main === module) {
  app.listen(config.PORT, () => {
    console.log(`Octofit Tracker API running on http://localhost:${config.PORT}`);
    console.log(`Codespaces API URL: ${API_BASE_URL}`);
  });
}

export default app;
