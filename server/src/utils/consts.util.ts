export const friendsFields =
  '-email -password -isVerified -role -blocked -friends -language -updatedAt -friendRequests';

export enum FriendRequestsStatusEnum {
  SENT = 'sent',
  APPROVED = 'approved',
  DECLINED = 'declined',
}
