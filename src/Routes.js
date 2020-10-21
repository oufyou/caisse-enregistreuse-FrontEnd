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
const Customers = lazy(() => import('./components/admin/Customers'));
const Categories = lazy(() => import('./components/admin/Categories'));
const Products = lazy(() => import('./components/admin/Products'));
const SubCategories = lazy(() => import('./components/admin/SubCategories'));

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
              <div className="w-50 mx-auto">
                Please wait while we load the live preview examples
              </div>
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
                '/Customers'
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
                      path="/Categories"
                      component={Categories}
                    />
                    <AuthenticatedRoute
                      path="/SubCategories"
                      component={SubCategories}
                    />
                    <AuthenticatedRoute path="/Pay" component={Pay} />
                    <AuthenticatedRoute path="/Products" component={Products} />
                    <AuthenticatedRoute
                      path="/Customers"
                      component={Customers}
                    />
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
