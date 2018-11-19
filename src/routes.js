import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'

// 二级路由
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import OrderGuide from './components/about/OrderGuide'
import History from './components/about/History'

// 三级路由
import Phone from './components/about/contact/Phone'
import PersonName from './components/about/contact/PersonName'

export const routes = [
    // router-view复用
    { path: '/', components:{
        default:Home,
        'orderGuide':OrderGuide,
        'delivery':Delivery,
        'history':History,
        
    },name:'homeLink'},
    { path: '/menu', component: Menu,name:'menuLink' },
    { path: '/admin', component: Admin,name:'adminLink' },
    {
        path: '/about', component: About, redirect: '/about/contact', children: [
            {
                path: '/about/contact', name: "contactLink", redirect: '/phone', component: Contact, children: [
                    { path: '/phone', name: "phone", component: Phone },
                    { path: '/personName', name: 'personName', component: PersonName }
                ]
            },
            { path: '/delivery', name: "deliveryLink", component: Delivery },
            { path: '/orderGuide', name: "orderGuideLink", component: OrderGuide },
            { path: '/history', name: "historyLink", component: History }
        ]
    },
    { path: '/login', component: Login,name:'loginLink'},
    { path: '/register', component: Register,name:'registerLink' },
    { path: '*', redirect: '/' }
]