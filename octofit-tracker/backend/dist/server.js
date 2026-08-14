"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./config/app"));
require("./config/database");
const User_1 = __importDefault(require("./models/User"));
const Team_1 = __importDefault(require("./models/Team"));
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Workout_1 = __importDefault(require("./models/Workout"));
const codespaceName = process.env.CODESPACE_NAME;
const codespaceUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${app_1.default.PORT}`;
const app = (0, express_1.default)();
const routes = [
    { name: 'users', path: '/api/users/' },
    { name: 'teams', path: '/api/teams/' },
    { name: 'activities', path: '/api/activities/' },
    { name: 'leaderboard', path: '/api/leaderboard/' },
    { name: 'workouts', path: '/api/workouts/' },
];
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({
        service: 'Octofit Tracker API',
        status: 'ok',
        apiBaseUrl: codespaceUrl,
        routes: routes.map(({ path }) => path),
    });
});
app.get('/api', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API',
        endpoints: routes.map(({ path }) => path),
        apiBaseUrl: codespaceUrl,
    });
});
for (const route of routes) {
    app.get(route.path, async (_req, res) => {
        try {
            const resource = route.name;
            let data = [];
            switch (resource) {
                case 'users':
                    data = await User_1.default.find().lean();
                    break;
                case 'teams':
                    data = await Team_1.default.find().lean();
                    break;
                case 'activities':
                    data = await Activity_1.default.find().sort({ date: -1 }).lean();
                    break;
                case 'leaderboard':
                    data = await Leaderboard_1.default.find().sort({ rank: 1 }).lean();
                    break;
                case 'workouts':
                    data = await Workout_1.default.find().lean();
                    break;
                default:
                    data = [];
            }
            res.json({
                resource,
                apiBaseUrl: codespaceUrl,
                data,
            });
        }
        catch (error) {
            res.status(500).json({
                resource: route.name,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    });
    app.post(route.path, async (req, res) => {
        try {
            const payload = req.body ?? {};
            let createdRecord;
            switch (route.name) {
                case 'users':
                    createdRecord = await User_1.default.create(payload);
                    break;
                case 'teams':
                    createdRecord = await Team_1.default.create(payload);
                    break;
                case 'activities':
                    createdRecord = await Activity_1.default.create(payload);
                    break;
                case 'leaderboard':
                    createdRecord = await Leaderboard_1.default.create(payload);
                    break;
                case 'workouts':
                    createdRecord = await Workout_1.default.create(payload);
                    break;
                default:
                    createdRecord = payload;
            }
            res.status(201).json({
                resource: route.name,
                message: `${route.name} created`,
                data: createdRecord,
            });
        }
        catch (error) {
            res.status(400).json({
                resource: route.name,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    });
}
if (require.main === module) {
    app.listen(app_1.default.PORT, () => {
        console.log(`Octofit Tracker API running on http://localhost:${app_1.default.PORT}`);
        console.log(`Codespaces API URL: ${codespaceUrl}`);
        console.log(`CODESPACE_NAME: ${codespaceName ?? 'not set'}`);
    });
}
exports.default = app;
//# sourceMappingURL=server.js.map