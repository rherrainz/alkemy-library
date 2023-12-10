import cron from "node-cron";
import backup from "../security/backup.security.js";

const backupTask = () => {
    cron.schedule("0 0 0 * * *", () => {
        backup(true)
    });
}

export default backupTask
