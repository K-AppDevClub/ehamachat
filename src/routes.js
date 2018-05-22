import HomeBase from './pages/home/Base';
import PostsPage from './pages/posts/PostsPage';
import TestPage from './pages/test/Test';

import Recommend from './pages/recommend/Recommend';
import DetailPlan from './pages/detail-plan/DetailPlan';
import RegionPage from './pages/region/Region';


export default [
  { name: 'home', path: '/', component: HomeBase },
  { name: 'posts', path: '/posts', component: PostsPage },
  { name: 'test', path: '/test', component: TestPage },
  { name: 'recommend', path: '/recommend', component: Recommend },
  { name: 'detail-plan', path: '/detail-plan', component: DetailPlan },
  { name: 'region', path: '/region', component: RegionPage },
];
