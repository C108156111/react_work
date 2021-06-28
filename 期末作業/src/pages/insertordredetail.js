import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { useContext, useState } from 'react';
import { AppContext } from '../Context';

const Insertorderdetail = () => {
  const { insertOrderdetail } = useContext(AppContext);
  const [neworderdetail, setNewOrderdetail] = useState({});

  console.log(neworderdetail);
  const addNewdetail = (e, field) => {
    setNewOrderdetail({
      ...neworderdetail,
      [field]: e.target.value,
    });
  };

  const submitSalesorder = (e) => {
    e.preventDefault();
    insertOrderdetail(neworderdetail);
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>新增訂單明細</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              prodid: '000',
              prodname: '000',
              prodprice: '00',
              prodcost: '00',
            }}
          >
            {({
              handleBlur,
              isSubmitting,
            }) => (
              <form onSubmit={submitSalesorder}>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    insert detail
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="seq"
                  onBlur={handleBlur}
                  onChange={(e) => addNewdetail(e, 'seq')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="OrderId"
                  onBlur={handleBlur}
                  onChange={(e) => addNewdetail(e, 'OrderId')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="prodid"
                  onBlur={handleBlur}
                  onChange={(e) => addNewdetail(e, 'prodid')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="qty"
                  onBlur={handleBlur}
                  onChange={(e) => addNewdetail(e, 'qty')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="discount"
                  onBlur={handleBlur}
                  onChange={(e) => addNewdetail(e, 'discount')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    insrt now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Insertorderdetail;
