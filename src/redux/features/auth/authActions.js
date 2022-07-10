import { startLoading, stopLoading } from "./authSlice";
import { showNotification } from "../notification/notificationSlice";
import { setUser } from "./authSlice";
import { auth } from "../../../firebase";

// Login with email and password
export const signIn = (email, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      // Sign in a user with an email address and password
      await auth.signInWithEmailAndPassword(email, password);
      dispatch(stopLoading());
      dispatch(
        showNotification({
          message: "You have successfully signed in",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(stopLoading());
      dispatch(
        showNotification({
          message: error.message,
          type: "error",
        })
      );
    }
  };
};

// Register with email and password
export const signUp = (email, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      // Create a password-based account
      await auth.createUserWithEmailAndPassword(email, password);
      dispatch(stopLoading());
      dispatch(
        showNotification({
          message: "User account has been successfully created",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(stopLoading());
      dispatch(
        showNotification({
          message: error.message,
          type: "error",
        })
      );
    }
  };
};

// Logout
export const logout = () => {
  return async (dispatch) => {
    try {
      // Sign out the current user
      await auth.signOut();
      dispatch(setUser(null));
    } catch (error) {
      // catch error
      dispatch(
        showNotification({
          message: error.message,
          type: "error",
        })
      );
    }
  };
};
