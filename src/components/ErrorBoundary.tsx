"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] flex items-center justify-center px-4">
          <div className="text-center">
            <p className="font-barlow font-bold text-lg text-navy dark:text-white mb-2">
              Coś poszło nie tak
            </p>
            <p className="text-steel dark:text-dark-text-muted text-sm mb-4">
              Spróbuj odświeżyć stronę.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="text-blue hover:text-blue-light text-sm font-semibold transition-colors"
            >
              Spróbuj ponownie
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
