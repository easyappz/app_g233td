const Dialog = require('../models/Dialog');
const Message = require('../models/Message');

// Get dialogs for a user
exports.getDialogs = async (req, res) => {
  try {
    const { userId } = req.params;
    const dialogs = await Dialog.find({ participants: userId })
      .populate('participants', 'username fullName profilePicture')
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    res.status(200).json(dialogs);
  } catch (error) {
    console.error('Error fetching dialogs:', error);
    res.status(500).json({ error: 'Failed to fetch dialogs' });
  }
};

// Get messages in a dialog
exports.getMessages = async (req, res) => {
  try {
    const { dialogId } = req.params;
    const messages = await Message.find({ dialogId })
      .populate('senderId', 'username profilePicture')
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { userId, targetUserId } = req.params;
    const { content } = req.body;

    // Find or create a dialog
    let dialog = await Dialog.findOne({ participants: { $all: [userId, targetUserId] } });
    if (!dialog) {
      dialog = new Dialog({ participants: [userId, targetUserId] });
      await dialog.save();
    }

    // Create a new message
    const newMessage = new Message({
      dialogId: dialog._id,
      senderId: userId,
      content,
    });
    await newMessage.save();

    // Update dialog's last message
    dialog.lastMessage = newMessage._id;
    await dialog.save();

    res.status(201).json({ message: 'Message sent successfully', message: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Mark messages as read
exports.markMessagesAsRead = async (req, res) => {
  try {
    const { dialogId, userId } = req.params;

    await Message.updateMany(
      { dialogId, senderId: { $ne: userId }, read: false },
      { read: true }
    );

    res.status(200).json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ error: 'Failed to mark messages as read' });
  }
};
