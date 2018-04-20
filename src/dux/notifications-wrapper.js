// Adapted from https://github.com/gor181/react-notification-system-redux

// Action types
const RNS_SHOW_NOTIFICATION = "RNS_SHOW_NOTIFICATION";
const RNS_HIDE_NOTIFICATION = "RNS_HIDE_NOTIFICATION";

// reducer
// export default function Notifications(state = [], action = {}) {
const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case RNS_SHOW_NOTIFICATION: {
      const { type, ...rest } = action; // eslint-disable-line no-unused-vars

      return [...state, { ...rest, uid: action.uid }];
    }
    case RNS_HIDE_NOTIFICATION:
      return state.filter(notification => notification.uid !== action.uid);
    default:
      return state;
  }
};

// Example opts
// {
//   title: "Hey, it\"s good to see you!",
//   message: "Now you can see how easy it is to use notifications in React!",
//   position: "tr",
//   autoDismiss: 0,
//   action: {
//     label: "Awesome!",
//     callback: function() {
//       console.log("Clicked");
//     }
//   }
// }

const show = (opts = {}, level = "success") => ({
  type: RNS_SHOW_NOTIFICATION,
  ...opts,
  uid: opts.uid || Date.now(),
  level
});

const success = opts => show(opts, "success");
const error = opts => show(opts, "error");
const warning = opts => show(opts, "warning");
const info = opts => show(opts, "info");

const hide = uid => ({
  type: RNS_HIDE_NOTIFICATION,
  uid
});

export { error, hide, info, success, warning };

export default reducer;
