import React, { ErrorInfo } from 'react';

import { MaintenancePage } from '@/ui/main/pages';

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  public children: React.ReactNode;
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.trace(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <MaintenancePage />;
    }
    return this.props.children;
  }
}
