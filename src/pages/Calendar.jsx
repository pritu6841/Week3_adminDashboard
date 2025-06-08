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
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

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

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: "text.primary" }}
      >
        Calendar
      </Typography>
      <Paper sx={{ p: 2 }}>
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
        />
      </Paper>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Tasks for {selectedDate}</DialogTitle>
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
          <TextField
            label="Add Task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button
            onClick={handleAddTask}
            variant="contained"
            disabled={!taskTitle}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
