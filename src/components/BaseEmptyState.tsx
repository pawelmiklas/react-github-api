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
    data-testid="base-empty-state-box"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    py={3}
  >
    <SvgIcon
      data-testid="base-empty-state-icon"
      component={SearchOffIcon}
      sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
    />
    <Typography data-testid="base-empty-state-title" variant="h5" gutterBottom>
      {title}
    </Typography>
    <Typography
      data-testid="base-empty-state-message"
      variant="body1"
      color="text.secondary"
    >
      {message}
    </Typography>
  </Box>
);
