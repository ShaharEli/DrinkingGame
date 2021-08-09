export const calcFriendRequests = user =>
  user?.friendRequests.reduce(
    (acc, curr) =>
      acc + (curr.status === 'pending' && curr.to === user._id ? 1 : 0),
    0,
  );
