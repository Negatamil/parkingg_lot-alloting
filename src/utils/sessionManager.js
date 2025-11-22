import { store } from '../store/store';
import { logoutUser } from '../store/slices/authSlice';

class SessionManager {
  constructor() {
    this.timeoutId = null;
    this.SESSION_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours
  }

  startSession() {
    this.resetTimeout();
    this.addActivityListeners();
  }

  resetTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    this.timeoutId = setTimeout(() => {
      this.handleSessionTimeout();
    }, this.SESSION_TIMEOUT);
  }

  addActivityListeners() {
    const events = ['mousedown', 'keypress', 'click'];
    events.forEach(event => {
      document.addEventListener(event, this.handleActivity.bind(this), true);
    });
  }

  handleActivity() {
    const { isAuthenticated } = store.getState().auth;
    if (isAuthenticated) {
      this.resetTimeout();
    }
  }

  handleSessionTimeout() {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }

  endSession() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

export default new SessionManager();