// import admin from "firebase-admin";
// export const firebaseAdmin = admin.initializeApp({
//   credential: admin.credential.cert("firebaseConfig.json"),
// });

// export const sendMessage = (to: string[], data: any, notification = {}) =>
//   admin.messaging().sendToDevice(
//     to, // device fcm tokens...
//     {
//       data,
//       notification,
//     },
//     {
//       // Required for background/quit data-only messages on iOS
//       contentAvailable: true,
//       // Required for background/quit data-only messages on Android
//       priority: "high",
//     }
//   );
export {};

// export const getTokensList = (chat, userId) =>
//   chat.participants
//     .filter(
//       (participant) =>
//         !!participant.firebaseToken &&
//         (!userId || participant?._id != userId) &&
//         !chat?.usersWithoutNotifications?.find((id) => id == participant?._id)
//     )
//     .map(({ firebaseToken }) => firebaseToken);
