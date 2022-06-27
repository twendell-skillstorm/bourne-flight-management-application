import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Creates the reveal animation when scrolling
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);


root.render(
  <> {/* This is a React Fragment. React components can only return one item, fragments bundle multiple into one item */} 
  {/* This is a JSX comment */}
  {/* Provider is the Redux store, placing it here gives my entire application access to it */}
    <Provider store={store}>
        <App />
    </Provider>
  </>
);