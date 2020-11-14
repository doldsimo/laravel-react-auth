import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Example from './components/Example';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(<Example />, document.getElementById('root'));