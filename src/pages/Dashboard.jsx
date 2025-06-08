import { Grid, Paper, Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
  { name: "Jul", value: 900 },
  { name: "Aug", value: 750 },
  { name: "Sep", value: 850 },
  { name: "Oct", value: 950 },
  { name: "Nov", value: 1100 },
  { name: "Dec", value: 1200 },
];

const StatCard = ({ title, value, icon }) => (
  <Paper
    sx={{
      p: 4,
      display: "flex",
      flexDirection: "column",
      height: 180,
      minWidth: 0,
      alignItems: "flex-start",
      justifyContent: "center",
      boxShadow: 4,
      borderRadius: 3,
    }}
  >
    <Box
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <Typography color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {icon}
    </Box>
    <Typography component="p" variant="h3">
      {value}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 5 }}>
      {/* First row: Stat Cards */}
      <Grid container spacing={6} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Users" value="1,234" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Revenue" value="$5,678" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Orders" value="890" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Growth" value="23%" />
        </Grid>
      </Grid>

      {/* Second row: Charts side by side */}
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: 520, boxShadow: 4, borderRadius: 3 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              Analytics Charts
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              Monthly Revenue
            </Typography>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: 520, boxShadow: 4, borderRadius: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              Growth Trend
            </Typography>
            <ResponsiveContainer width="100%" height={420}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
