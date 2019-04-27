import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([])

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={mockStore({ editor: {
    documentHasChanged: false,
    spec: '',
    currentSpecSHA: '',
    currentCommitDescription: '',
    isCommitting: false,
  }, global: { notifications: []}})}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
