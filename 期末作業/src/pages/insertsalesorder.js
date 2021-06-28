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

const Insertsalesorder = () => {
  const { insertsalesorder } = useContext(AppContext);
  const [newSalesorder, setNewSalesorder] = useState({});

  console.log(newSalesorder);
  const addNewalesorder = (e, field) => {
    setNewSalesorder({
      ...newSalesorder,
      [field]: e.target.value,
    });
  };

  const submitSalesorder = (e) => {
    e.preventDefault();
    insertsalesorder(newSalesorder);
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>新增訂單</title>
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
                    insert product
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="salesid"
                  onBlur={handleBlur}
                  onChange={(e) => addNewalesorder(e, 'salesid')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="empid"
                  onBlur={handleBlur}
                  onChange={(e) => addNewalesorder(e, 'empid')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="custid"
                  onBlur={handleBlur}
                  onChange={(e) => addNewalesorder(e, 'custid')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="orderdate"
                  onBlur={handleBlur}
                  onChange={(e) => addNewalesorder(e, 'orderdate')}
                  type="date"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="descript"
                  onBlur={handleBlur}
                  onChange={(e) => addNewalesorder(e, 'descript')}
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

export default Insertsalesorder;
