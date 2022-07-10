import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";

import { getLocations } from "../redux/features/location/locationActions";

import Spinner from "../components/Spinner";
import Table from "../components/Table";

const Locations = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.location.locations);
  const isLoading = useSelector((state) => state.location.isLoading);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : locations.length > 0 ? (
        <Table rows={locations} />
      ) : (
        <>
          <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
            No locations found.
          </Typography>
          <Typography variant="body1">
            You can add locations <Link to="../create-new-location">here</Link>.
          </Typography>
        </>
      )}
    </>
  );
};

export default Locations;
