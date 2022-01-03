import React, { useState, useEffect, useContext } from 'react'
import { Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';

import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import useStyles from '../utils/styles';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const [paymentMethod, setPaymentMethod] = useState('');
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart: { shippingAddress } } = state;

  useEffect(() => {
    if(!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, [])

  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if(!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      Cookies.set('paymentMethod', paymentMethod);
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      router.push('/confirmation');
    }
  }

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant='h1'>
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl componen="fieldset">
              <RadioGroup aria-label="Payment Method" name='paymentMethod' value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}>
                <FormControlLabel value='paypal' control={<Radio />} label='Paypal' />
                <FormControlLabel value='stripe' control={<Radio />} label='Stripe' />
                <FormControlLabel value='cash' control={<Radio />} label='Cash' />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="button" fullWidth onClick={() => router.push('/shipping')}>
              Back
            </Button>
          </ListItem>

        </List>
      </form>
    </Layout>
  )
}
