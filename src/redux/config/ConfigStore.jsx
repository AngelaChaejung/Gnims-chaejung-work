import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../modules/LoginSlice";
import ScheduleSlice from "../modules/ScheduleSlice";
import SingupSlice from "../modules/SingupSlice";
import InvitationSlice from "../modules/InvitationSlice";
import NotificationSlice from "../modules/notificationSlice";

const store = configureStore({
  reducer: {
    LoginSlice,
    SingupSlice,
    ScheduleSlice,
    InvitationSlice,
    NotificationSlice,
  },
});

export default store;
