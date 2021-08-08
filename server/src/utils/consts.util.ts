export const friendsFields =
  '-email -password -isVerified -role -blocked -friends -language -updatedAt -friendRequests';

export enum FriendRequestsStatusEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined',
}
