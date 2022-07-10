import { combineReducers } from "redux";

// Reducers
import authReducer from "./features/auth/authSlice";
import notificationReducer from "./features/notification/notificationSlice";
import locationReducer from "./features/location/locationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  location: locationReducer,
});

export default rootReducer;
