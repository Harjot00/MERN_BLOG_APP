import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        pt: 1,
        pb: 1,
        mt: 1,
        backgroundColor: "#6F38C5",
      }}
    >
      <Typography variant="caption" sx={{ color: "white" }}>
        Copyright ©2022
      </Typography>
    </Box>
  );
};

export default Footer;
