import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Layout from './components/Layout';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(<Layout />, document.getElementById('root'));