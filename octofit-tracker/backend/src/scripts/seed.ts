import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teamA = await Team.create({
      name: 'Cardio Crew',
      description: 'A high-energy running and endurance team.',
      captain: 'Ava Stone',
      members: ['Ava Stone', 'Leo Park', 'Maya Chen', 'Noah Singh'],
      sport: 'Running',
    });

    const teamB = await Team.create({
      name: 'Strength Squad',
      description: 'Power and conditioning athletes with a focus on strength gains.',
      captain: 'Priya Shah',
      members: ['Priya Shah', 'Jonas Reed', 'Iris Gomez', 'Samir Ali'],
      sport: 'Strength',
    });

    const users = await User.insertMany([
      {
        name: 'Ava Stone',
        email: 'ava@example.com',
        passwordHash: 'hashed-password-ava',
        fitnessLevel: 'advanced',
        teamId: teamA._id,
      },
      {
        name: 'Leo Park',
        email: 'leo@example.com',
        passwordHash: 'hashed-password-leo',
        fitnessLevel: 'intermediate',
        teamId: teamA._id,
      },
      {
        name: 'Priya Shah',
        email: 'priya@example.com',
        passwordHash: 'hashed-password-priya',
        fitnessLevel: 'advanced',
        teamId: teamB._id,
      },
      {
        name: 'Jonas Reed',
        email: 'jonas@example.com',
        passwordHash: 'hashed-password-jonas',
        fitnessLevel: 'beginner',
        teamId: teamB._id,
      },
    ]);

    const userMap = new Map(users.map((user) => [user.name, user._id]));

    await Activity.insertMany([
      {
        userId: userMap.get('Ava Stone')!,
        type: 'Run',
        durationMinutes: 42,
        distanceKm: 8.4,
        points: 180,
        date: new Date('2026-08-12T06:00:00.000Z'),
      },
      {
        userId: userMap.get('Leo Park')!,
        type: 'Cycle',
        durationMinutes: 35,
        distanceKm: 12.6,
        points: 160,
        date: new Date('2026-08-11T18:30:00.000Z'),
      },
      {
        userId: userMap.get('Priya Shah')!,
        type: 'Strength',
        durationMinutes: 55,
        distanceKm: 0,
        points: 210,
        date: new Date('2026-08-10T17:15:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: userMap.get('Ava Stone')!, userName: 'Ava Stone', score: 1820, rank: 1 },
      { userId: userMap.get('Priya Shah')!, userName: 'Priya Shah', score: 1745, rank: 2 },
      { userId: userMap.get('Leo Park')!, userName: 'Leo Park', score: 1690, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Hill Sprint Circuit',
        type: 'Cardio',
        durationMinutes: 30,
        difficulty: 'intermediate',
        equipment: ['Cones', 'Stopwatch'],
        focus: ['Speed', 'Power'],
      },
      {
        title: 'Core Strength Flow',
        type: 'Strength',
        durationMinutes: 40,
        difficulty: 'beginner',
        equipment: ['Mat'],
        focus: ['Core', 'Stability'],
      },
      {
        title: 'Lower Body Power',
        type: 'Strength',
        durationMinutes: 45,
        difficulty: 'advanced',
        equipment: ['Dumbbells', 'Bench'],
        focus: ['Legs', 'Explosiveness'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
