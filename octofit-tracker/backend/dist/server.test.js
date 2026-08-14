"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("./server"));
(0, node_test_1.default)('API routes are exposed for the Octofit tracker resources', async () => {
    const routes = ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'];
    for (const route of routes) {
        const response = await (0, supertest_1.default)(server_1.default).get(route);
        strict_1.default.equal(response.status, 200, `Expected 200 from ${route}`);
        strict_1.default.ok(response.body.resource, `Missing resource in ${route}`);
    }
});
//# sourceMappingURL=server.test.js.map