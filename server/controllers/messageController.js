const Dialog = require('../models/Dialog');
const Message = require('../models/Message');

// Get user's dialogs
exports.getDialogs = async (req, res) => {
  try {
    const dialogs = await Dialog.find({ participants: req.params.userId })
      .populate('participants', 'name username avatar')
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    res.json(dialogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get messages in a dialog
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ dialog: req.params.dialogId })
      .populate('sender', 'name username avatar')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    let dialog = await Dialog.findOne({
      participants: { $all: [req.params.userId, req.params.targetUserId] },
    });

    if (!dialog) {
      dialog = new Dialog({
        participants: [req.params.userId, req.params.targetUserId],
      });
      await dialog.save();
    }

    const message = new Message({
      content,
      sender: req.params.userId,
      dialog: dialog._id,
    });

    await message.save();

    dialog.lastMessage = message._id;
    dialog.updatedAt = Date.now();
    await dialog.save();

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark messages as read
exports.markMessagesAsRead = async (req, res) => {
  try {
    await Message.updateMany(
      { dialog: req.params.dialogId, sender: { $ne: req.params.userId }, isRead: false },
      { $set: { isRead: true } }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
