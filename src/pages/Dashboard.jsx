import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  LinearProgress,
  useTheme,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as CartIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const StatCard = ({ title, value, icon, trend, color }) => {
  const theme = useTheme();
  const isPositive = trend > 0;

  return (
    <StyledCard>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: 2,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {React.cloneElement(icon, {
              sx: { color: color, fontSize: 28 },
            })}
          </Box>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Typography
          variant="h4"
          component="div"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {isPositive ? (
            <TrendingUpIcon sx={{ color: theme.palette.success.main }} />
          ) : (
            <TrendingDownIcon sx={{ color: theme.palette.error.main }} />
          )}
          {Math.abs(trend)}% from last month
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
          {title}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

const ProgressCard = ({ title, value, total, color }) => {
  const progress = (value / total) * 100;

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ mr: 1, fontWeight: 600 }}
          >
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            / {total}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: `${color}15`,
            "& .MuiLinearProgress-bar": {
              backgroundColor: color,
            },
          }}
        />
      </CardContent>
    </StyledCard>
  );
};

const Dashboard = () => {
  const theme = useTheme();

  const stats = [
    {
      title: "Total Users",
      value: "2,420",
      icon: <PeopleIcon />,
      trend: 12.5,
      color: theme.palette.primary.main,
    },
    {
      title: "Total Revenue",
      value: "$12,420",
      icon: <MoneyIcon />,
      trend: 8.2,
      color: theme.palette.success.main,
    },
    {
      title: "Total Orders",
      value: "1,520",
      icon: <CartIcon />,
      trend: -2.4,
      color: theme.palette.warning.main,
    },
    {
      title: "Total Sales",
      value: "$8,420",
      icon: <AssessmentIcon />,
      trend: 5.4,
      color: theme.palette.info.main,
    },
  ];

  const progressData = [
    {
      title: "Monthly Sales Target",
      value: 75,
      total: 100,
      color: theme.palette.primary.main,
    },
    {
      title: "Customer Satisfaction",
      value: 85,
      total: 100,
      color: theme.palette.success.main,
    },
    {
      title: "Project Completion",
      value: 60,
      total: 100,
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Recent Activity
            </Typography>
            {/* Add your activity content here */}
          </Paper>
        </Grid>

        {progressData.map((data, index) => (
          <Grid item xs={12} md={4} key={index}>
            <ProgressCard {...data} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
