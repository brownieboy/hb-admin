import React from "react";

import {
  createNotification,
  NOTIFICATION_TYPE_SUCCESS
} from "react-redux-notify";

const DURATION = 500000;

// Action creators, return a notification (object?)
export const notifySuccess = (message = "No message supplied") =>
  createNotification({
    message,
    type: NOTIFICATION_TYPE_SUCCESS,
    duration: DURATION,
    canDismiss: true,
    icon: <i className="fa fa-check" />
  });


