import {logErrorToService} from '../api/auth';
import React from 'react';
import Loading from '../components/Loading/Loading';
import RNRS from 'react-native-restart';
import {isDev} from '../bin';

export default class ErrorBoundary extends React.Component {
  state = {hasError: false};

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (isDev) return RNRS.Restart();
    logErrorToService(error, info.componentStack)
      .then(() => RNRS.Restart())
      .catch(() => RNRS.Restart());
  }

  render() {
    return this.state.hasError ? <Loading /> : this.props.children;
  }
}
