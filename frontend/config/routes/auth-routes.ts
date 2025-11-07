/**
 * An array of routes that require authentication
 * These routes will redirect users to login if not authenticated
 * @type {string[]}
 */
export const privateRoutes = [
  '/(root)/dashboard',
  '/(root)/settings',
  '/(root)/billing'
];

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/auth/new-verification',
  '/assessments/:assessmentId',
  '/score/:assessmentId',
  '/test',
  '/mock-tests',
  '/mock-tests/:id',
  '/blog'
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/new-password',
  '/auth/reset'
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
