import config from '~/config';

import { CartLayout, UserLayout } from '~/layouts';

import { Home, Cart, Profile, Address, Password, Email, Phone, Search, ProductDetail, ConfirmEmail } from '~/pages';

export const publicRoutes = [
    //default layout
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.product_detail, component: ProductDetail },
];

export const privateRoutes = [
    //cart layout
    { path: config.routes.cart, component: Cart, layout: CartLayout },

    // //user layout
    { path: config.routes.user.profile, component: Profile, layout: UserLayout },
    { path: config.routes.user.address, component: Address, layout: UserLayout },
    { path: config.routes.user.password, component: Password, layout: UserLayout },
    { path: config.routes.user.email, component: Email, layout: UserLayout },
    { path: config.routes.user.phone, component: Phone, layout: UserLayout }
]
