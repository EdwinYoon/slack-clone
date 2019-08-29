export const unexpectedError = (path: string) => ({
  path,
  message: 'something went wrong',
});

export const invalidUserError = (path: string) => ({
  path,
  message: 'Invalid user',
});

export const invalidTeamError = (path: string) => ({
  path,
  message: 'Invalid Team',
});
