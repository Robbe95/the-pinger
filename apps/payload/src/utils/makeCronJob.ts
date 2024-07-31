import { handlePings } from '@payload/utils/handlePings'
// // Cron job every 10 seconds
export async function makeCronjob() {
  const cron = await import('cron')

  // eslint-disable-next-line no-new
  new cron.CronJob(
    '*/10 * * * * *', // cronTime
    () => {
      void handlePings()
    }, // onTick
    null, // onComplete
    true, // start
    'America/Los_Angeles', // timeZone
  )
}
