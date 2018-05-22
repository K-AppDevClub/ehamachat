import HomeBase from './pages/home/Base';
import PostsPage from './pages/posts/PostsPage';
import TestPage from './pages/test/Test';
import ChatPage from './pages/chat-page/ChatPage';

import Recommend from './pages/recommend/Recommend';
import DetailPlan from './pages/detail-plan/DetailPlan';
import RegionPage from './pages/region/Region';



export default [
  { name: 'home', path: '/', component: HomeBase },
  { name: 'posts', path: '/posts', component: PostsPage },
  { name: 'test', path: '/test', component: TestPage },
<<<<<<< HEAD
  { name: 'recommend', path: '/recommend', component: Recommend },
  { name: 'detail-plan', path: '/detail-plan', component: DetailPlan },
  { name: 'region', path: '/region', component: RegionPage },
=======
  { name: 'chat-page', path: '/chat-page', component: ChatPage },
  { name: 'create-plan', path: '/create-plan', component: CreatePlan },
  { name: 'recommend', path: '/recommend', component: Recommend },
  { name: 'detail-plan', path: '/detail-plan', component: DetailPlan },
  { name: 'region', path: '/region', component: RegionPage },
  { name: 'userPage', path: '/user-page', component: UserPage },
  
>>>>>>> 4cf55cd515e59ec43e280c5f9b3ae90e34472270
];
