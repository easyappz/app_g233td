const Dialog = require('../models/Dialog');
const Message = require('../models/Message');

// Get all dialogs for a user
exports.getDialogs = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const dialogs = await Dialog.find({ participants: userId })
      .populate('participants', 'username email')
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: dialogs,
    });
  } catch (error) {
    next(error);
  }
};

// Get messages in a specific dialog
exports.getMessages = async (req, res, next) => {
  try {
    const dialogId = req.params.dialogId;
    const userId = req.user.id;

    const dialog = await Dialog.findById(dialogId);
    if (!dialog || !dialog.participants.includes(userId)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this dialog',
      });
    }

    const messages = await Message.find({ dialog: dialogId })
      .populate('sender', 'username email')
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// Send a message to another user
exports.sendMessage = async (req, res, next) => {
  try {
    const senderId = req.params.userId;
    const targetUserId = req.params.targetUserId;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Message content is required',
      });
    }

    // Check if dialog exists between these users
    let dialog = await Dialog.findOne({
      participants: { $all: [senderId, targetUserId] },
    });

    // If no dialog exists, create a new one
    if (!dialog) {
      dialog = await Dialog.create({
        participants: [senderId, targetUserId],
      });
    }

    // Create the message
    const message = await Message.create({
      dialog: dialog._id,
      sender: senderId,
      content,
      readBy: [senderId],
    });

    // Update the dialog's last message and timestamp
    dialog.lastMessage = message._id;
    await dialog.save();

    // Populate sender details for response
    await message.populate('sender', 'username email');

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// Mark messages as read in a dialog
exports.markMessagesAsRead = async (req, res, next) => {
  try {
    const dialogId = req.params.dialogId;
    const userId = req.params.userId;

    const dialog = await Dialog.findById(dialogId);
    if (!dialog || !dialog.participants.includes(userId)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this dialog',
      });
    }

    await Message.updateMany(
      { dialog: dialogId, readBy: { $ne: userId } },
      { $push: { readBy: userId } }
    );

    res.status(200).json({
      success: true,
      message: 'Messages marked as read',
    });
  } catch (error) {
    next(error);
  }
};
