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
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
        <Box sx={{ display: "flex", gap: 2 }}>
          {Object.entries(columns).map(([columnId, column]) => (
            <Box key={columnId} sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "text.primary", flex: 1 }}
                >
                  {column.title}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleOpenAddDialog(columnId)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <Paper
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ p: 2, minHeight: 500 }}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              p: 2,
                              mb: 2,
                              backgroundColor: "background.paper",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span style={{ flex: 1 }}>{item.content}</span>
                            <Box>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleOpenEditDialog(columnId, item)
                                }
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleDeleteTask(columnId, item.id)
                                }
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </Box>
          ))}
        </Box>
      </DragDropContext>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === "add" ? "Add Task" : "Edit Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Task Content"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            fullWidth
            autoFocus
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          {dialogMode === "add" ? (
            <Button
              onClick={handleAddTask}
              variant="contained"
              disabled={!taskContent.trim()}
            >
              Add
            </Button>
          ) : (
            <Button
              onClick={handleEditTask}
              variant="contained"
              disabled={!taskContent.trim()}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Kanban;
