import ErrorBoundary from '@/components/ErrorBoundary'
import FreightCalculator from '@/components/FreightCalculator'

export default function Home() {
  return (
    <ErrorBoundary>
      <FreightCalculator />
    </ErrorBoundary>
  )
}