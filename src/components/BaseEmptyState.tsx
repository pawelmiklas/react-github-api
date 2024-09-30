import { Box, Typography, SvgIcon } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

interface BaseEmptyStateProps {
  title?: string;
  message?: string;
}

export const BaseEmptyState = ({
  title = "No Data Found",
  message = "We couldn't find any data to display at the moment.",
}: BaseEmptyStateProps) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    py={3}
  >
    <SvgIcon
      component={SearchOffIcon}
      sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
    />
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {message}
    </Typography>
  </Box>
);
