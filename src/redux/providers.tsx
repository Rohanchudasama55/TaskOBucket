import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { store } from "./store"
import { ErrorBoundary } from "../components/common/ErrorBoundary"
import { AuthProvider } from "../contexts/AuthContext"

// Create QueryClient outside component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

type Props = {
  children: ReactNode
}

export function AppProviders({ children }: Props) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  )
}
