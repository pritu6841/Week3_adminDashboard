import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  useTheme,
  Stack,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const createData = (id, name, email, role, status, department, joinDate) => ({
  id,
  name,
  email,
  role,
  status,
  department,
  joinDate,
});

const initialRows = [
  createData(
    1,
    "John Doe",
    "john@example.com",
    "Admin",
    "Active",
    "IT",
    "2023-01-15"
  ),
  createData(
    2,
    "Jane Smith",
    "jane@example.com",
    "User",
    "Active",
    "HR",
    "2023-02-20"
  ),
  createData(
    3,
    "Bob Johnson",
    "bob@example.com",
    "Editor",
    "Inactive",
    "Marketing",
    "2023-03-10"
  ),
  createData(
    4,
    "Alice Brown",
    "alice@example.com",
    "User",
    "Active",
    "Finance",
    "2023-04-05"
  ),
  createData(
    5,
    "Charlie Wilson",
    "charlie@example.com",
    "Editor",
    "Active",
    "Sales",
    "2023-05-12"
  ),
  createData(
    6,
    "Emma Davis",
    "emma@example.com",
    "User",
    "Active",
    "IT",
    "2023-06-18"
  ),
  createData(
    7,
    "Michael Lee",
    "michael@example.com",
    "Admin",
    "Inactive",
    "HR",
    "2023-07-22"
  ),
  createData(
    8,
    "Sarah Miller",
    "sarah@example.com",
    "Editor",
    "Active",
    "Marketing",
    "2023-08-30"
  ),
  createData(
    9,
    "David Wilson",
    "david@example.com",
    "User",
    "Active",
    "Finance",
    "2023-09-14"
  ),
  createData(
    10,
    "Lisa Anderson",
    "lisa@example.com",
    "User",
    "Inactive",
    "Sales",
    "2023-10-25"
  ),
];

const roleColors = {
  Admin: "primary",
  User: "info",
  Editor: "secondary",
};
const statusColors = {
  Active: "success",
  Inactive: "default",
};

const Tables = () => {
  const theme = useTheme();
  const [rows, setRows] = useState(initialRows);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
    department: "",
    joinDate: "",
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleOpenDialog = (row = null) => {
    if (row) {
      setEditingRow(row);
      setFormData(row);
    } else {
      setEditingRow(null);
      setFormData({
        name: "",
        email: "",
        role: "User",
        status: "Active",
        department: "",
        joinDate: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRow(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (editingRow) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editingRow.id ? { ...formData, id: row.id } : row
        )
      );
    } else {
      const newRow = {
        ...formData,
        id: rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1,
      };
      setRows((prev) => [...prev, newRow]);
    }
    setOpenDialog(false);
    setEditingRow(null);
  };

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        ["ID", "Name", "Email", "Role", "Status", "Department", "Join Date"],
      ],
      body: rows.map((row) => [
        row.id,
        row.name,
        row.email,
        row.role,
        row.status,
        row.department,
        row.joinDate,
      ]),
    });
    doc.save("users.pdf");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: "text.primary" }}
      >
        Users Table
      </Typography>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          background: theme.palette.background.paper,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                sx: {
                  borderRadius: 2,
                  background: theme.palette.background.default,
                },
              }}
            />
            <Tooltip title="Add User">
              <IconButton color="primary" onClick={() => handleOpenDialog()}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Export as Excel">
              <IconButton color="success" onClick={handleExportExcel}>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export as PDF">
              <IconButton color="error" onClick={handleExportPDF}>
                <PictureAsPdfIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <TableContainer sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: theme.palette.background.default }}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    transition: "background 0.2s",
                    "&:hover": {
                      background:
                        `${theme.palette.primary.main}11` || "#f5f5f5",
                    },
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.role}
                      color={roleColors[row.role] || "default"}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={statusColors[row.status] || "default"}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.joinDate}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleOpenDialog(row)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, boxShadow: 6, p: 2 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          {editingRow ? "Edit User" : "Add User"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleInputChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleInputChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Join Date"
              name="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={handleInputChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingRow ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tables;
