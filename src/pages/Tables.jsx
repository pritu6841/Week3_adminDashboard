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
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
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

const Tables = () => {
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
        id: Math.max(...rows.map((row) => row.id)) + 1,
      };
      setRows((prev) => [...prev, newRow]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users_table.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Users Table", 14, 16);
    autoTable(doc, {
      head: [
        ["ID", "Name", "Email", "Role", "Department", "Join Date", "Status"],
      ],
      body: rows.map((row) => [
        row.id,
        row.name,
        row.email,
        row.role,
        row.department,
        row.joinDate,
        row.status,
      ]),
      startY: 22,
    });
    doc.save("users_table.pdf");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          Users Table
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add User
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="outlined" onClick={handleExportExcel}>
          Export to Excel
        </Button>
        <Button variant="outlined" onClick={handleExportPDF}>
          Export to PDF
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.joinDate}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === "Active" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenDialog(row)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(row.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingRow ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                label="Role"
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="department"
              label="Department"
              value={formData.department}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="joinDate"
              label="Join Date"
              type="date"
              value={formData.joinDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingRow ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tables;
