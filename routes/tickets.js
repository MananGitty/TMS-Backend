const express = require("express");
const router = express.Router();

const Ticket = require("../models/ticket");

// Create a new ticket
router.post("/", async (req, res) => {
  try {
    const ticket = new Ticket({
      title: req.body.title,
      todos: req.body.todos,
    });
    await ticket.save();
    res.json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all tickets

// router.get("/", async (req, res) => {
//   try {
//     const tickets = await Ticket.find();
//     res.json({
//       success: true,
//       tickets,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: "Ticket not found",
//     });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    const completedTickets = tickets.filter(
      (ticket) => ticket.completion === 1
    );
    const activeTickets = tickets.filter((ticket) => ticket.completion !== 1);
    res.json({
      success: true,
      completedTickets,
      activeTickets,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }
});

// Get a single ticket
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    res.json({
      success: true,
      ticket,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }
});

// Update a ticket
router.patch("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }
});

// Delete a ticket
router.delete("/:id", async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }
});

module.exports = router;
