const Topic = require('../models/forum');
const Notification = require('../models/notification');

exports.initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New WS Connection');

    socket.on('register', ({ userId }) => {
      socket.join(`user_${userId}`);
    });

    socket.on('joinTopic', ({ topicId }) => {
      socket.join(topicId);
    });

    socket.on('newMessage', async ({ topicId, author, content, subscribers }) => {
      try {
        const topic = await Topic.findById(topicId);
        if (!topic) return;
        const message = { author, content };
        topic.messages.push(message);
        await topic.save();
        io.to(topicId).emit('messageAdded', { topicId, message });
      } catch (err) {
        console.error(err);
      }

      for (const userId of subscribers) {
        const notif = await Notification.create({
          userId,
          type: 'newMessage',
          payload: { topicId, author, content },
        });
        io.to(`user_${userId}`).emit('notification', notif);
      }

    });



    socket.on('disconnect', () => {
      console.log('WS Disconnected');
    });
  });
};
