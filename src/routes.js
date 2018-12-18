import Home from './pages/Home';
import Post from './pages/Post';

export default [{
    path: '/',
    exact: true,
    component: Home
}, {
    path: '/post',
    exact: true,
    component: Post,
}];
