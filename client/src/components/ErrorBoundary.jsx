import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error de renderizado:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" role="alert">
          <h2>Algo salió mal 🙀</h2>
          <button className="primary" onClick={() => window.location.reload()}>Recargar</button>
        </div>
      );
    }
    return this.props.children;
  }
}