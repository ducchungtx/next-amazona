import { Button, List, ListItem, TextField, Typography, Link } from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link';

import Layout from '../components/Layout';
import useStyles from '../utils/styles';

export default function login() {
  const classes = useStyles();

  return(
    <Layout>
      <form className={classes.form}>
        <Typography component='h1' variant='h1'>
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{
                type: 'email',
              }}
            >
            </TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{
                type: 'password',
              }}
            >
            </TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account? &nbsp;
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}