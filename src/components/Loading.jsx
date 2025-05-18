import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Backdrop
      open={true}
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
    >
      <CircularProgress size={150} color="inherit" />
    </Backdrop>
  );
}
