import {
  Box,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useTheme,
  Fab,
  Tooltip,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columnColors = {
  todo: "#42a5f5",
  inProgress: "#ffb300",
  done: "#66bb6a",
};

const initialColumns = {
  todo: {
    title: "To Do",
    items: [
      { id: "1", content: "Design new dashboard" },
      { id: "2", content: "Implement authentication" },
    ],
  },
  inProgress: {
    title: "In Progress",
    items: [
      { id: "3", content: "Create API endpoints" },
      { id: "4", content: "Write documentation" },
    ],
  },
  done: {
    title: "Done",
    items: [
      { id: "5", content: "Setup project structure" },
      { id: "6", content: "Install dependencies" },
    ],
  },
};

const Kanban = () => {
  const theme = useTheme();
  const [columns, setColumns] = useState(initialColumns);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // 'add' or 'edit'
  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskContent, setTaskContent] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  // CRUD Handlers
  const handleOpenAddDialog = (columnId) => {
    setDialogMode("add");
    setCurrentColumn(columnId);
    setTaskContent("");
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (columnId, task) => {
    setDialogMode("edit");
    setCurrentColumn(columnId);
    setCurrentTask(task);
    setTaskContent(task.content);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTaskContent("");
    setCurrentTask(null);
    setCurrentColumn(null);
  };

  const handleAddTask = () => {
    if (!taskContent.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      content: taskContent,
    };
    setColumns((prev) => ({
      ...prev,
      [currentColumn]: {
        ...prev[currentColumn],
        items: [...prev[currentColumn].items, newTask],
      },
    }));
    handleDialogClose();
  };

  const handleEditTask = () => {
    if (!taskContent.trim()) return;
    setColumns((prev) => ({
      ...prev,
      [currentColumn]: {
        ...prev[currentColumn],
        items: prev[currentColumn].items.map((item) =>
          item.id === currentTask.id ? { ...item, content: taskContent } : item
        ),
      },
    }));
    handleDialogClose();
  };

  const handleDeleteTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter((item) => item.id !== taskId),
      },
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: "text.primary" }}
      >
        Kanban Board
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{ display: "flex", flexDirection: "row", gap: 4, minHeight: 540 }}
        >
          {Object.entries(columns).map(([columnId, column]) => (
            <Paper
              key={columnId}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 3,
                boxShadow: 4,
                background: theme.palette.background.paper,
                borderTop: `6px solid ${columnColors[columnId]}`,
                display: "flex",
                flexDirection: "column",
                minWidth: 280,
                maxWidth: 340,
                minHeight: 520,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: columnColors[columnId],
                    flex: 1,
                  }}
                >
                  {column.title}
                </Typography>
                <Tooltip title={`Add task to ${column.title}`}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenAddDialog(columnId)}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ flex: 1, minHeight: 420 }}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              p: 2,
                              mb: 2,
                              borderRadius: 2,
                              backgroundColor: snapshot.isDragging
                                ? `${columnColors[columnId]}22`
                                : theme.palette.background.default,
                              boxShadow: snapshot.isDragging ? 6 : 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              transition: "background 0.2s, box-shadow 0.2s",
                            }}
                          >
                            <Typography sx={{ flex: 1, fontWeight: 500 }}>
                              {item.content}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
                              <Tooltip title="Edit">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() =>
                                    handleOpenEditDialog(columnId, item)
                                  }
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() =>
                                    handleDeleteTask(columnId, item.id)
                                  }
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Paper>
          ))}
        </Box>
      </DragDropContext>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, boxShadow: 6, p: 2 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          {dialogMode === "add" ? "Add Task" : "Edit Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Task"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            fullWidth
            autoFocus
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={dialogMode === "add" ? handleAddTask : handleEditTask}
            variant="contained"
            disabled={!taskContent.trim()}
          >
            {dialogMode === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Kanban;
