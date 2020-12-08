import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';

import MuiTheme from './theme';

// Layout Blueprints

import { LeftSidebar, PresentationLayout } from './layout-blueprints';

// Example Pages

import AuthenticatedRoute from './components/AuthenticatedRoute';
import AuthenticationService from './service/AuthenticationService';

const DashboardDefault = lazy(() => import('./components/cashier/Dashboard'));
const LandingPage = lazy(() => import('./example-pages/LandingPage'));
const Login = lazy(() => import('./components/Login'));

const Pay = lazy(() => import('./components/cashier/Pay'));
const Users = lazy(() => import('./components/admin/Users'));
const Customers = lazy(() => import('./components/admin/Customers'));
const Categories = lazy(() => import('./components/admin/Categories'));
const Sales = lazy(() => import('./components/admin/Sales'));
const Products = lazy(() => import('./components/admin/Products'));
const SubCategories = lazy(() => import('./components/admin/SubCategories'));
const TicketZ = lazy(() => import('./components/admin/TicketZ'));
const TicketX = lazy(() => import('./components/admin/TicketX'));
const Payments = lazy(() => import('./components/admin/Payments'));
const Refunds = lazy(() => import('./components/admin/Refunds'));
const Cashiers = lazy(() => import('./components/admin/Cashiers'));
const SessionPOSClose = lazy(() => import('./components/SessionPOSClose'));
const SessionPOS = lazy(() => import('./components/SessionPOS'));

const Routes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };
  AuthenticationService.checkLogin();
  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense
          fallback={
            <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
              <div className="w-50 mx-auto">Lily Gourmet</div>
            </div>
          }>
          <Switch>
            <Redirect exact from="/" to="/DashboardDefault" />
            <Route path={['/LandingPage', '/login']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/LandingPage" component={LandingPage} />
                    <Route path="/login" exact component={Login} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                '/DashboardDefault',
                '/Categories',
                '/SubCategories',
                '/Products',
                '/Pay',
                '/Customers',
                '/Sales',
                '/Payments',
                '/Cashiers',
                '/SessionPOS',
                '/SessionPOSClose',
                '/TicketZ',
                '/TicketX',
                '/Users',
                '/Refunds'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <AuthenticatedRoute
                      path="/DashboardDefault"
                      component={DashboardDefault}
                    />
                    <AuthenticatedRoute
                      path="/SessionPOS"
                      component={SessionPOS}
                    />
                    <AuthenticatedRoute path="/Users" component={Users} />
                    <AuthenticatedRoute path="/TicketZ" component={TicketZ} />
                    <AuthenticatedRoute path="/TicketX" component={TicketX} />
                    <AuthenticatedRoute
                      path="/SessionPOSClose"
                      component={SessionPOSClose}
                    />

                    <AuthenticatedRoute
                      path="/Categories"
                      component={Categories}
                    />
                    <AuthenticatedRoute
                      path="/SubCategories"
                      component={SubCategories}
                    />
                    <AuthenticatedRoute path="/Pay" component={Pay} />
                    <AuthenticatedRoute path="/Products" component={Products} />
                    <AuthenticatedRoute path="/Sales" component={Sales} />
                    <AuthenticatedRoute path="/Payments" component={Payments} />
                    <AuthenticatedRoute path="/Refunds" component={Refunds} />
                    <AuthenticatedRoute
                      path="/Customers"
                      component={Customers}
                    />
                    <AuthenticatedRoute path="/Cashiers" component={Cashiers} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
