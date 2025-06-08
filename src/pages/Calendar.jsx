import {
  Box,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  useTheme,
  IconButton,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import AddIcon from "@mui/icons-material/Add";

const initialEvents = [
  {
    title: "Team Meeting",
    start: "2024-03-20T10:00:00",
    end: "2024-03-20T11:00:00",
  },
  {
    title: "Project Review",
    start: "2024-03-21T14:00:00",
    end: "2024-03-21T15:30:00",
  },
  {
    title: "Client Call",
    start: "2024-03-22T11:00:00",
    end: "2024-03-22T12:00:00",
  },
];

const Calendar = () => {
  const theme = useTheme();
  const [events, setEvents] = useState(initialEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [tasksForDay, setTasksForDay] = useState([]);

  // Open dialog for a specific date
  const handleDateClick = (info) => {
    const dateStr = info.dateStr || info.startStr;
    setSelectedDate(dateStr);
    // Find tasks for this day
    const dayTasks = events.filter(
      (event) => event.start.slice(0, 10) === dateStr.slice(0, 10)
    );
    setTasksForDay(dayTasks);
    setDialogOpen(true);
  };

  // Add a new task for the selected day
  const handleAddTask = () => {
    if (taskTitle && selectedDate) {
      setEvents((prev) => [
        ...prev,
        {
          title: taskTitle,
          start: selectedDate,
          end: selectedDate,
        },
      ]);
      setTasksForDay((prev) => [
        ...prev,
        {
          title: taskTitle,
          start: selectedDate,
          end: selectedDate,
        },
      ]);
      setTaskTitle("");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTaskTitle("");
    setSelectedDate(null);
    setTasksForDay([]);
  };

  // Get next 5 upcoming events
  const upcomingEvents = [...events]
    .filter((e) => new Date(e.start) >= new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 5);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: "text.primary" }}
      >
        Calendar
      </Typography>
      <Paper
        sx={{
          p: 0,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 3,
          boxShadow: 4,
          overflow: "hidden",
          minHeight: 500,
        }}
      >
        <Box
          sx={{
            flex: 3,
            p: { xs: 2, md: 4 },
            background: theme.palette.background.default,
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            eventClick={handleDateClick}
            dateClick={handleDateClick}
            select={handleDateClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            eventBackgroundColor={theme.palette.primary.main}
            eventTextColor={theme.palette.primary.contrastText}
          />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />
        <Box
          sx={{
            flex: 1,
            p: 3,
            background: theme.palette.background.paper,
            minWidth: 260,
            borderLeft: { md: `1px solid ${theme.palette.divider}` },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Upcoming Events
          </Typography>
          {upcomingEvents.length === 0 && (
            <Typography color="text.secondary">No upcoming events.</Typography>
          )}
          {upcomingEvents.map((event, idx) => (
            <Paper
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                mb: 1,
                background: theme.palette.background.default,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <EventIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(event.start).toLocaleString()}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: 6,
            p: 2,
            background: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          Tasks for {selectedDate}
        </DialogTitle>
        <DialogContent>
          <List>
            {tasksForDay.length === 0 && (
              <ListItem>
                <ListItemText primary="No tasks for this day." />
              </ListItem>
            )}
            {tasksForDay.map((task, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={task.title} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <TextField
              label="Add Task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              fullWidth
              size="small"
              variant="outlined"
            />
            <IconButton
              color="primary"
              onClick={handleAddTask}
              disabled={!taskTitle}
              sx={{ height: 40, width: 40 }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
