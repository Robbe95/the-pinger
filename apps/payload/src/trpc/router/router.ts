import { authRouter } from '@payload/modules/auth/auth.router'
import { router } from '@payload/trpc/trpc'

export const appRouter = router({
  auth: authRouter,
})

export type AppRouter = typeof appRouter
