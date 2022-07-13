import {
  setLocations,
  setLocationDetails,
  startLoading,
  stopLoading,
} from "./locationSlice";
import { showNotification } from "../notification/notificationSlice";

import { auth } from "../../../firebase";

// Database
import { db } from "../../../firebase";

// Create a new location
export const createLocation = (location) => {
  return async (dispatch) => {
    let locationsRef = db.ref("users/" + auth?.currentUser?.uid + "/locations");

    // Add new location to database
    locationsRef
      .push(location)
      .then(() => {
        dispatch(setLocations(location));
        dispatch(
          showNotification({
            message: "Location has been successfully created",
            type: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: error.message,
            type: "error",
          })
        );
      });
  };
};

// Get all locations from database
export const getLocations = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    let locationsRef = db.ref("users/" + auth?.currentUser?.uid + "/locations");
    locationsRef
      .once("value")
      .then((snapshot) => {
        let locations = [];
        snapshot.forEach((childSnapshot) => {
          let key = childSnapshot.key;
          let data = childSnapshot.val();
          let dataObject = {
            key,
            ...data,
          };
          locations.push(dataObject);
        });
        dispatch(setLocations(locations));
        dispatch(stopLoading());
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: error.message,
            type: "error",
          })
        );
      });
  };
};

// Get a location by id
export const getLocation = (id) => {
  return async (dispatch) => {
    let locationsRef = db.ref("users/" + auth?.currentUser?.uid + "/locations");

    locationsRef
      .child(id)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          dispatch(setLocationDetails(data));
        }
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: error.message,
            type: "error",
          })
        );
      });
  };
};

// Edit location
export const editLocation = (id, location) => {
  return async (dispatch) => {
    let locationsRef = db.ref("users/" + auth?.currentUser?.uid + "/locations");

    // Update location in database
    locationsRef
      .child(id)
      .update(location)
      .then(() => {
        dispatch(setLocations(location));
        dispatch(
          showNotification({
            message: "Location has been successfully updated",
            type: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: error.message,
            type: "error",
          })
        );
      });
  };
};

// Delete location
export const deleteLocation = (id) => {
  return async (dispatch) => {
    let locationsRef = db.ref("users/" + auth?.currentUser?.uid + "/locations");

    // Delete location from database
    locationsRef
      .child(id)
      .remove()
      .then((snapshot) => {
        dispatch(
          showNotification({
            message: "Location has been successfully deleted",
            type: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: error.message,
            type: "error",
          })
        );
      });
  };
};
