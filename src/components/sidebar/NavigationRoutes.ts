export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'home',
      displayName: 'menu.trips',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'logout',
      displayName: 'menu.logout',
      meta: {
        icon: 'vuestic-iconset-components',
      },
    },
  ] as INavigationRoute[],
}
