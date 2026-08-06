import { startExpiryReminderJob } from "../jobs/expiryReminder.job.js";

const startCronJobs = () => {
  startExpiryReminderJob();
};

export default startCronJobs;
