import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { styled } from "@mui/material/styles";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import Button from "../components/Button";

import { createLocation } from "../redux/features/location/locationActions";

// List of cities
import cities from "../assets/cities.json";

const Wrapper = styled("div")({
  textAlign: "center",
  boxShadow:
    "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  borderRadius: "5px",
  padding: "30px",
  maxWidth: "500px",
  margin: "15px",
});

let latitudeRegex =
  /^(\+|-)?((\d((\.)|\.\d{1,6})?)|(0*?[0-8]\d((\.)|\.\d{1,6})?)|(0*?90((\.)|\.0{1,6})?))$/;
let longitudeRegex =
  /^(\+|-)?((\d((\.)|\.\d{1,6})?)|(0*?\d\d((\.)|\.\d{1,6})?)|(0*?1[0-7]\d((\.)|\.\d{1,6})?)|(0*?180((\.)|\.0{1,6})?))$/;

// Yup schema for form validation
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .max(20, "Name must be less than 20 characters")
    .matches(
      /^[a-z\u0161\u0111\u010D\u0107\u017E ]+$/gi,
      "Name must be letters only"
    ),
  address: Yup.string()
    .trim()
    .required("Address is required")
    .max(50, "Address must be less than 20 characters"),
  city: Yup.string().trim().required("City is required"),
  // Longitude must be number before -180 and 180
  longitude: Yup.string()
    .trim()
    .required("Longitude is required")
    .matches(longitudeRegex, "Longitude must be number before -180 and 180"),
  // Latitude must be number before -90 and 90
  latitude: Yup.string()
    .trim()
    .required("Latitude is required")
    .matches(latitudeRegex, "Latitude must be number before -90 and 90"),
});

const NewLocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      longitude: "",
      latitude: "",
    },
    resolver: yupResolver(validationSchema),
  });

  // Add new location to database
  const addLocationHandler = async (formData) => {
    const { name, address, city, longitude, latitude } = formData;

    dispatch(createLocation({ name, address, city, longitude, latitude }));

    // Navigate to locations page after successful creation of location
    navigate("../locations");
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(addLocationHandler)}>
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

export default NewLocation;
