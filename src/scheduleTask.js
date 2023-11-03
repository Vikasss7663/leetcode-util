const cron = require('node-cron');

// Define your task to be executed
const task = () => {
  console.log('Task executed at', new Date());
  // send email
  sendEmail();
};

const scheduledTask = cron.schedule('0 0 6,18 * * *', task);

// Start the scheduler
scheduledTask.start();
