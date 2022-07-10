import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { styled } from "@mui/material/styles";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import Button from "../components/Button";

// List of cities
import cities from "../assets/cities.json";

import {
  getLocation,
  editLocation,
} from "../redux/features/location/locationActions";

const Wrapper = styled("div")({
  textAlign: "center",
  boxShadow:
    "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  borderRadius: "5px",
  padding: "30px",
  maxWidth: "500px",
  margin: "15px",
});

// Yup schema for form validation
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .max(20, "Name must be less than 20 characters"),
  address: Yup.string()
    .trim()
    .required("Address is required")
    .max(50, "Address must be less than 20 characters"),
  city: Yup.string().trim().required("City is required"),
  longitude: Yup.string().trim().required("Longitude is required"),
  latitude: Yup.string().trim().required("Latitude is required"),
});

const EditLocation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get loaction details based on id
  useEffect(() => {
    dispatch(getLocation(id));
  }, [dispatch, id]);

  const locationDetails = useSelector(
    (state) => state.location.locationDetails
  );

  const defaultValues = {
    name: locationDetails.name || "",
    address: locationDetails.address || "",
    city: locationDetails.city || "",
    longitude: locationDetails.longitude || "",
    latitude: locationDetails.latitude || "",
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  // Reset form
  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line
  }, [locationDetails]);

  // Edit location based on id
  const editLocationHandler = async (formData) => {
    const { name, address, city, longitude, latitude } = formData;

    dispatch(editLocation(id, { name, address, city, longitude, latitude }));

    // Navigate to locations page after successful edit
    navigate("../locations");
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(editLocationHandler)}>
        <Input
          {...register("name")}
          type="text"
          label="Name"
          placeholder="Name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Input
          {...register("address")}
          type="text"
          label="Address"
          placeholder="Address"
          error={!!errors.address}
          helperText={errors.address?.message}
        />
        <Select
          control={control}
          name="city"
          label="City"
          options={cities}
          error={!!errors.city}
          helperText={errors.city?.message}
        />
        <Input
          {...register("latitude")}
          type="text"
          label="Latitude"
          placeholder="Latitude"
          error={!!errors.latitude}
          helperText={errors.latitude?.message}
        />
        <Input
          {...register("longitude")}
          type="text"
          label="Longitude"
          placeholder="Longitude"
          error={!!errors.longitude}
          helperText={errors.longitude?.message}
        />
        <Button type="submit">Save</Button>
      </form>
      <Button color="info" onClick={() => navigate("../locations")}>
        Cancel
      </Button>
    </Wrapper>
  );
};

export default EditLocation;
