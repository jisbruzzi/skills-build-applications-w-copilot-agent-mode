import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from './server';

test('API routes are exposed for the Octofit tracker resources', async () => {
  const routes = ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'];

  for (const route of routes) {
    const response = await request(app).get(route);
    assert.equal(response.status, 200, `Expected 200 from ${route}`);
    assert.ok(response.body.resource, `Missing resource in ${route}`);
  }
});
