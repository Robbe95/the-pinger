export async function register() {
  // eslint-disable-next-line node/prefer-global/process
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const cronjobby = await import('./utils/makeCronJob')

    void cronjobby.makeCronjob()
  }
}
