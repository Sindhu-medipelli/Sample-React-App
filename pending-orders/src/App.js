import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";

const initialOrders = [
  {
    id: 1,
    totalLines: 4,
    orderNumber: "383311750",
    effectiveDate: "03/13/2024",
    orderType: "SERVICES & PERKS",
    lineStatus: "OK - LINE READY TO GOTO",
  },
  {
    id: 2,
    totalLines: 3,
    orderNumber: "614750456",
    effectiveDate: "03/13/2024",
    orderType: "PLAN CHANGE",
    lineStatus: "OK - LINE READY TO GOTO",
  },
  {
    id: 3,
    totalLines: 2,
    orderNumber: "614790385",
    effectiveDate: "03/13/2024",
    orderType: "PLAN CHANGE",
    lineStatus: "OK - LINE READY TO GOTO",
  },
];

function App() {
  const [orders, setOrders] = useState(initialOrders);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (event) => {
    setSelected(event.target.checked ? orders.map((order) => order.id) : []);
  };

  const handleDelete = () => {
    setOrders(orders.filter((order) => !selected.includes(order.id)));
    setSelected([]);
    setOpen(false);
  };

  const handleOpenDialog = () => {
    if (selected.length > 0) {
      setOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Pending Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < orders.length
                  }
                  checked={selected.length === orders.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Total Lines</TableCell>
              <TableCell>Order Number</TableCell>
              <TableCell>Effective Date</TableCell>
              <TableCell>Order Type</TableCell>
              <TableCell>Line Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(order.id)}
                    onChange={() => handleSelect(order.id)}
                  />
                </TableCell>
                <TableCell>{order.totalLines}</TableCell>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.effectiveDate}</TableCell>
                <TableCell>{order.orderType}</TableCell>
                <TableCell>{order.lineStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDialog}
          disabled={selected.length === 0}
        >
          Delete Selected
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog 
        open={open} 
        onClose={handleCloseDialog}
        BackdropProps={{
          sx: {
            backgroundColor: "#ffffff", // Set the background behind the dialog to white
            opacity: 1, // Make it fully opaque
          },
        }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected {selected.length}{" "}
            {selected.length === 1 ? "item" : "items"}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
