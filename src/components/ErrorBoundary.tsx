'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-screen items-center justify-center bg-navy px-6"
        >
          <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <p className="font-syne text-lg font-bold text-white mb-2">
              Something went wrong
            </p>
            <p className="text-sm text-gray-400 mb-6">{this.state.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, message: '' })}
              className="rounded-xl bg-accent px-6 py-2.5 text-sm font-bold text-black hover:opacity-90 transition-opacity"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}