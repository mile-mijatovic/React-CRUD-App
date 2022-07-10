import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api";

import { useLocation, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRowsIcon from "@mui/icons-material/TableRows";

import AlertDialog from "../components/Dialog";

const Wrapper = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const Text = styled(Typography)({
  margin: "2px",
});

const HorizontalLine = styled(Divider)({
  margin: "5px",
  background: "#ffffff",
});

const Location = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [map, setMap] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    key,
    name,
    address,
    city,
    longitude: long,
    latitude: lat,
  } = location.state;

  const center = {
    lat: Number(lat),
    lng: Number(long),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return isLoaded ? (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        defaultZoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <InfoWindow position={center}>
          <>
            <Text variant="body2">
              <strong>Name:</strong> {name}
            </Text>
            <Text variant="body2">
              <strong>Address:</strong> {address}
            </Text>
            <Text variant="body2">
              <strong>City:</strong> {city}
            </Text>
            <Text variant="body2">
              <strong>Latitude:</strong> {lat}
            </Text>
            <Text variant="body2">
              <strong>Longitude:</strong> {long}
            </Text>
            <HorizontalLine />
            <Stack spacing={1}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => navigate("edit")}
              >
                Edit Location
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<TableRowsIcon />}
                onClick={() => navigate("../locations")}
              >
                Locations list
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDialogOpen}
              >
                Delete Location
              </Button>
            </Stack>
          </>
        </InfoWindow>
      </GoogleMap>
      <AlertDialog
        title="Are you sure you want to delete this location?"
        locationKey={key}
        isDialogOpened={isDialogOpen}
        handleCloseDialog={() => setIsDialogOpen(false)}
      />
    </Wrapper>
  ) : (
    <></>
  );
};

export default Location;
