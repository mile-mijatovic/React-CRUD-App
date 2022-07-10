import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import { CssBaseline } from "@mui/material";

import Alert from "./components/Alert";
import ProtectedRoute from "./utils/ProtectedRoute";

import { hideNotification } from "./redux/features/notification/notificationSlice";
import { setUser } from "./redux/features/auth/authSlice";

import { auth } from "./firebase";

// Layout
import Layout from "./layout";

// Routes
import Auth from "./pages/Auth";
import NewLocation from "./pages/NewLocation";
import EditLocation from "./pages/EditLocation";
import Locations from "./pages/Locations";
import Location from "./pages/Location";
import NotFound from "./pages/NotFound";

const App = () => {
  const dispatch = useDispatch();

  // Check notification state
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.auth.user);

  // Handle notification close
  const handleClose = () => {
    dispatch(hideNotification());
  };

  // Check if user is logged in and set user data to persist state between page reloads
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Snackbar
        open={notification.isOpen}
        onClose={handleClose}
        autoHideDuration={5000}
      >
        <Alert severity={notification.type} sx={{ width: "100%", mb: 7 }}>
          {notification.message}
        </Alert>
      </Snackbar>
      <CssBaseline />
      {/** App Routes */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={user ? <Navigate to="locations" /> : <Auth />}
            />
            <Route
              path="/create-new-location"
              element={
                <ProtectedRoute>
                  <NewLocation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/locations"
              element={
                <ProtectedRoute>
                  <Locations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/locations/:id"
              element={
                <ProtectedRoute>
                  <Location />
                </ProtectedRoute>
              }
            />
            <Route
              path="/locations/:id/edit"
              element={
                <ProtectedRoute>
                  <EditLocation />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
