import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service if needed,
    // avoiding exposing sensitive information on the UI.
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert" style={{ padding: '20px', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: '8px', backgroundColor: 'var(--bg-card, #ffffff)', color: 'var(--text-primary, #1e293b)' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.25rem', fontWeight: 600 }}>Something went wrong</h2>
          <p style={{ margin: '8px 0 16px', color: 'var(--text-secondary, #64748b)' }}>{this.props.fallbackMessage || 'A component failed to render. We have logged the error.'}</p>
          <button 
            type="button" 
            onClick={this.handleRetry}
            style={{ padding: '6px 12px', background: 'var(--accent-color, #3b82f6)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
