import React, { Fragment, useState } from 'react';

import { Grid, Container, Button } from '@material-ui/core';

import hero from '../assets/images/hero-bg/hero.jpg';
import Card from '@material-ui/core/Card';
import AuthenticationService from '../service/AuthenticationService';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  let history = useHistory();
  const loginClicked = () => {
    AuthenticationService.executeJwtAuthenticationService(username, password)
      .then(response => {
        AuthenticationService.registerSuccessfulLoginForJwt(
          username,
          response.data.accessToken
        );
        console.log(response);
        localStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        sessionStorage.setItem('sessionPOS_State', true);
        history.push(`/SessionPOS`);
      })
      .catch(() => {
        setShowSuccessMessage(false);
        setHasLoginFailed(true);
      });
  };
  return (
    <Fragment>
      <div className="hero-wrapper bg-composed-wrapper bg-premium-dark min-vh-100">
        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image opacity-5"
            style={{ backgroundImage: 'url(' + hero + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-3" />
          <div className="bg-composed-wrapper--bg bg-red-lights opacity-1" />
          <div className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5">
            <Container maxWidth="md" className="pb-5">
              <div className="text-center">
                <h1 className="display-2 mb-5 text-white font-weight-bold">
                  Lily Gourmet
                </h1>
                <Card>
                  <CardHeader>S'identifier</CardHeader>
                  <CardContent>
                    <Grid container spacing={4}>
                      <Grid item md={12}>
                        {/*<ShowInvalidCredentials hasLoginFailed={hasLoginFailed}/>*/}
                        {hasLoginFailed && (
                          <div className="alert alert-warning">
                            Les informations d'identification invalides
                          </div>
                        )}
                        {showSuccessMessage && <div>Connexion réussie</div>}
                        {/*<ShowLoginSuccessMessage showSuccessMessage={showSuccessMessage}/>*/}
                      </Grid>
                      <Grid item md={12}>
                        User Name:{' '}
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="text"
                          name="username"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                        />
                      </Grid>
                      <Grid item md={12}>
                        Password:{' '}
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="password"
                          name="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Button
                          className="p-4"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={loginClicked}>
                          S'identifier
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
