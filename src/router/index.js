import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: 'home',
        alias: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
          {
            path: 'recommended',
            alias: '',
            name: 'Recommended',
            component: () => import('../views/Recommended.vue'),
          },
          {
            path: 'feed',
            name: 'Feed',
            component: () => import('../views/Feed.vue'),
          },
          {
            path: 'notes',
            name: 'Notes',
            component: () => import('../views/Notes.vue'),
          },
          {
            path: 'videos',
            name: 'Videos',
            component: () => import('../views/Videos.vue'),
          },
          {
            path: 'activity',
            name: 'Activity',
            component: () => import('../views/Activity.vue'),
          },
        ]
      },
      {
        path: 'classroom',
        name: 'Classroom',
        component: () => import('../views/Classroom.vue')
      },
      {
        path: 'store',
        name: 'Store',
        component: () => import('../views/Store.vue')
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: () => import('../views/Favorites.vue')
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue')
      }
    ]
  },
  {
    path: '/classify',
    name: 'Classify',
    component: () => import('../views/Classify.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/searchcontent',
    name: 'SearchContent',
    component: () => import('../views/SearchContent.vue'),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },
  {
    path: '/notesdetail',
    name: 'Notesdetail',
    component: () => import('../views/Notesdetail.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
  },
  {
    path: '/usercookwares',
    name: 'Usercookwares',
    component: () => import('../views/Usercookwares.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
