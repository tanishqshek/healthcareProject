import { LocalizationProvider, MobileDateTimePicker } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import useData from "../../Hooks/useData";
import { HashLink } from "react-router-hash-link";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useHistory } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useContext } from "react";
import { UserContext } from "../Home/UserContext";
import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import swal from "sweetalert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useAuth from "../../Hooks/useAuth";

const Services = ({flags}) => {
  
  //OLD DECLARATIONS

  const { user } = useAuth();

  // <DateTimePicker label="Basic date time picker" />
  // const [clearedDate, setClearedDate] = React.useState(null);
  const [value, setValue] = React.useState(new Date());

  // doctor name function
  const [docName, setDocName] = React.useState("");

  const handleChange = (event) => {
    setDocName(event.target.value);
  };

  //swal alert
  const swalAlert = () => {
    return swal("Your Appointment is Done You will Receive a mail ASAP.", {
      button: false,
      icon: "success",
    });
  };

  //NEW DECLARATIONS
  const services = useData();
  const history = useHistory();
  const ServiceDetails = (servId) => {
    history.push(`/services/details/${servId}`);
    console.log(servId);
  };

  const userId = useContext(UserContext);
    console.log("YOLO: " + userId);
    console.log(flags);

  //RETURN
  return flags.newServicesFlag && userId % 2 == 0 ? (
      <Box
      id="appointment"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Container style={{ justifyContent: "center" }}>
          <Typography
            variant="h5"
            sx={{
              mt: 5,
              mb: 5,
            }}
          >
            Select your time and data for Appointment
          </Typography>
        </Container>
        {/* set doctor name */}
        <FormControl sx={{ mb: 5, minWidth: "50%" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Select Doctor Name
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={docName}
            onChange={handleChange}
            autoWidth
            label="Select Doctor Name"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Dr. Neha A Agrawal.</MenuItem>
            <MenuItem value={11}>Dr. Vrushali Naik</MenuItem>
            <MenuItem value={12}>Dr. Tejaswini Manogna</MenuItem>
            <MenuItem value={13}>Dr. Aditya Gupta</MenuItem>
            <MenuItem value={14}>Dr. Vivek k Bansode</MenuItem>
            <MenuItem value={16}>Dr. Pratima J Singh</MenuItem>
            <MenuItem value={17}>Dr. Amit Lanke</MenuItem>
            <MenuItem value={18}>Dr. Johnny Pandit</MenuItem>
            <MenuItem value={19}>Dr. Sandip Nehe</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ mb: 2 }}
          // value={user.displayName}
          fullWidth
          label="Your Name"
          id="fullWidth"
        />
        <TextField
          sx={{ mb: 2 }}
          // value={user.email}
          fullWidth
          label="Your Mail"
          id="fullWidth"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <MobileDateTimePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              label="Appointment Date"
              onError={console.log}
              minDate={new Date("2024-01-01T00:00")}
              inputFormat="yyyy/MM/dd hh:mm a"
              mask="___/__/__ __:__ _M"
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>

        <TextField
          sx={{ mt: 2, mb: 2 }}
          fullWidth
          label="Problem type"
          id="fullWidth"
        />

        <Button
          sx={{ p: 1, mt: 2, mb: 5 }}
          onClick={swalAlert}
          fullWidth
          variant="contained"
        >
          <AddCircleIcon /> Confirm
        </Button>
      </Container>
    </Box>
  ):

  //NEW
  

  (

    <Box
      id="services"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#fce4ec",
        color: "primary.main",
        p: 2,
        mb: 2,
        mt: 6,
        textAlign: "center",
      }}
    >
      {services[0].length > 1 ? (
        <Container maxWidth="xl">
          <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6">
            Our Services
          </Typography>

          <Grid container spacing={3} style={{justifyContent: 'center'}}>
            {services[0]?.map((service) => (
              <Grid key={service.id} item xs={12} sm={6} md={6} lg={4} style={{justifyContent: 'center'}} >
                <Card
                  sx={{
                    mx: "auto",
                    maxWidth: 345,
                    transition: "0.5s all ease-in-out",
                    ":hover": {
                      boxShadow: 10,
                      color: "#e91e63",
                    },
                    img: { transition: "0.5s all ease-in-out" },
                    ":hover img": {
                      transform: "scale(1.1)",
                    },
                  }} 
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={service?.service_img}
                      alt="card image of service"
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        mx: "auto",
                        my: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 40, mr: 1, mx: "auto" }}
                        image={service?.icon}
                        alt="service icon"
                      />
                      <Typography gutterBottom variant="h5" component="div">
                        Consult for {service.treatment}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Typography sx={{ mx: 2, p: 2, textAlign: "end" }}>
                      <Button
                        onClick={() => {
                          ServiceDetails(service.id);
                        }}
                        variant="contained"
                        color="primary"
                        startIcon={<ReadMoreIcon />}
                      >
                        See More Details...
                      </Button>
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <HashLink smooth to="/home#home" className="text-style">
            {" "}
            <Button
              variant="contained"
              color="primary"
              startIcon={<HomeIcon />}
              sx={{ mb: 5, mt: 5 }}
            >
              Back to Home
            </Button>
          </HashLink>
        </Container>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
    </Box>
  );
};

export default withLDConsumer()(Services);
