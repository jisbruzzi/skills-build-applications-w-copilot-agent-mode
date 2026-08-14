"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importStar(require("./config/app"));
require("./config/database");
const User_1 = __importDefault(require("./models/User"));
const Team_1 = __importDefault(require("./models/Team"));
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Workout_1 = __importDefault(require("./models/Workout"));
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
        apiBaseUrl: app_1.API_BASE_URL,
        routes: routes.map(({ path }) => path),
    });
});
app.get('/api', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API',
        endpoints: routes.map(({ path }) => path),
        apiBaseUrl: app_1.API_BASE_URL,
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
                apiBaseUrl: app_1.API_BASE_URL,
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
        console.log(`Codespaces API URL: ${app_1.API_BASE_URL}`);
    });
}
exports.default = app;
//# sourceMappingURL=server.js.map