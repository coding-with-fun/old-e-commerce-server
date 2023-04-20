import { CronJob } from 'cron';
import { CronEnums } from '../app/utils/types';

// Jobs
import CronPong from '../commands/CronPong';
import DeleteTempFiles from '../commands/DeleteTempFiles';

const cronSetup = async (): Promise<void> => {
    new CronJob(CronEnums.EVERY_YEAR, CronPong).start();
    new CronJob(CronEnums.EVERYDAY_MIDNIGHT, DeleteTempFiles).start();
};

export default cronSetup;
