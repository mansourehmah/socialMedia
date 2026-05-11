import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class FeedErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("FeedErrorBoundary:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="rounded-2xl border border-red-900/80 bg-red-950/50 p-6 text-red-100">
          <p className="font-medium">Something went wrong loading the feed.</p>
          <p className="mt-2 text-sm text-red-200/90">
            {this.state.error.message}
          </p>
          <button
            type="button"
            className="mt-4 rounded-lg border border-red-800 bg-red-900/40 px-4 py-2 text-sm text-red-50 hover:bg-red-900/60"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
