import { createAction } from '@reduxjs/toolkit';

export const apiUnauthorized = createAction('api/unauthorized');

export const sessionTerminated = createAction('session/terminated');
