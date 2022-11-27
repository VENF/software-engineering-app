import { Fragment, useEffect, useState } from "react"
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getCreditCart, getUserById } from "src/domain/creditCart.services"

import { RechargeCredit } from "./Recharge"

export const Filter = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '10px',
  borderRadius: '7px',
  background: '#F4001Baa',
  filter: 'blur(15px)',
  zIndex: 1
}));

export const Credit = styled(Card)(({ theme }) => ({
  background: theme.palette.customColors.primaryGradient,
  borderRadius: '7px',
  position: 'relative',
  zIndex: 100
}));

export const CreditCard = ({ width = '350px' }) => {
  const [userCredit, setUserCredit] = useState({
    name: "",
    amount: 0
  })
  useEffect(() => {
    getCreditCart()
      .then(res => {
        getUserById(res[0].userId)
          .then(userData => {
            setUserCredit({
              name: userData.user.username,
              amount: res[0].amount
            })
          })
      })
  }, [])
  return (
    <Fragment>
      <Box style={{marginBottom: "2rem"}}>
        <Typography variant="h4">
          {userCredit.name}
        </Typography>
        <Typography variant="body2">
          Saldo disponible <spam style={{color: "red"}}>{userCredit.amount.toFixed(2)}$</spam>
        </Typography>
      </Box>
      <Box style={{ position: 'relative', width: width }}>
        <Credit elevation={0} sx={{ width: width }}>
          <CardContent>
            <Box sx={{ marginTop: '1.5rem' }}>
              <Typography variant="h6">1234 5678 9012 3456</Typography>
            </Box>
            <Box sx={{ marginTop: '15px' }}>
              <svg
                width="47"
                height="36"
                viewBox="0 0 47 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6">
                  <rect
                    x="45.5297"
                    y="1.00002"
                    width="33.7563"
                    height="44.5297"
                    rx="5"
                    transform="rotate(90 45.5297 1.00002)"
                    fill="url(#paint0_linear_216_302)"
                    stroke="white"
                  />
                  <rect
                    x="27.934"
                    y="6.11842"
                    width="23.5192"
                    height="9.33785"
                    rx="4.66892"
                    transform="rotate(90 27.934 6.11842)"
                    stroke="white"
                  />
                  <path d="M1.00012 7.87819H19.6234" stroke="white" />
                  <path d="M27.0001 7.87819H45.6234" stroke="white" />
                  <path d="M1.00012 17.8782H18.5961" stroke="white" />
                  <path d="M28.0001 17.8782H45.5961" stroke="white" />
                  <path d="M1.00012 27.8782H19.6234" stroke="white" />
                  <path d="M27.0001 27.8782H45.6234" stroke="white" />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_216_302"
                    x1="46.828"
                    y1="2.74628"
                    x2="77.9074"
                    y2="45.2721"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#C4C4C4" />
                    <stop offset="1" stop-color="#C4C4C4" stop-opacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </Box>
            <Box sx={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Typography sx={{ fontWeight: 600 }} variant="h5">
                BEHOLD
              </Typography>
            </Box>
          </CardContent>
        </Credit>
        <Filter />
      </Box>
      <RechargeCredit/>
    </Fragment>
  );
};
