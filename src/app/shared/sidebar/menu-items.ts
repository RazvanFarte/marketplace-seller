import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/starter', title: 'Dashboard', icon: 'fa fa-dashboard', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/products/list', title: 'Produse', icon: 'fa fa-database', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/products/list', title: 'Produse', icon: 'fa fa-database', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/products/create', title: 'Produs nou', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/orders/list', title: 'Comenzi', icon: 'fa fa-bars', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/orders/list', title: 'Comenzi', icon: 'fa fa-usd', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/refunds', title: 'Rambursari', icon: 'fa fa-undo', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/coupons/list', title: 'Cupoane', icon: 'fa fa-tags', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/coupons/list', title: 'Cupoane', icon: 'fa fa-tags', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/coupons/create', title: 'Cupon nou', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/messages/conversations', title: 'Mesaje', icon: 'fa fa-comments', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/payout/list', title: 'Plata', icon: 'fa fa-money', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/requestPayout', title: 'Cereri de plata', icon: 'fa fa-tags', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/requestPayout/create', title: 'Cerere noua', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/payout/account', title: 'Cont de plata', icon: 'fa fa-user', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/payout/account/create', title: 'Cont nou', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/payments/history', title: 'Plata', icon: 'fa fa-product-hunt', class: '', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/payments/history', title: 'Istoria platilor', icon: 'fa fa-product-hunt', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/payments/upgrade', title: 'Promoveaza cont', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ]
  }
];
