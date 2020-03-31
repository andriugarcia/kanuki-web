import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/home'
import Pill from '~/pages/pill'
import Card from '~/pages/card'
import User from '~/pages/user'
import Search from '~/pages/search'
import Discover from '~/pages/discover'
import Categorie from '~/pages/categorie'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: "Home",
        path: '/',
        component: Home
      },
      {
        name: "Pill",
        path: '/p/:pill',
        component: Pill
      },
      {
        name: "Card",
        path: '/u/:author/:card',
        component: Card
      },
      {
        name: "Publication",
        path: '/p/:pill/:author/:card',
        component: Card
      },
      {
        name: "User",
        path: '/u/:author',
        component: User
      },
      {
        name: "Discover",
        path: '/s',
        component: Discover
      },
      {
        name: "Discover",
        path: '/c',
        component: Discover
      },
      {
        name: "Categorie",
        path: '/c/:categorie',
        component: Categorie
      },
      {
        name: "Search",
        path: '/s/:search',
        component: Search
      }

    ]
  })
}