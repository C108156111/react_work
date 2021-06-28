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

const Insertproduct = () => {
  const { insertproduct } = useContext(AppContext);
  const [newProduct, setNewProduct] = useState({});

  // Storing the Insert User Form Data.
  const addNewProduct = (e, field) => {
    setNewProduct({
      ...newProduct,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitProduct = (e) => {
    e.preventDefault();
    insertproduct(newProduct);
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>新增產品</title>
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
              <form onSubmit={submitProduct}>
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
                  name="id"
                  onBlur={handleBlur}
                  onChange={(e) => addNewProduct(e, 'prodid')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="prodname"
                  onBlur={handleBlur}
                  onChange={(e) => addNewProduct(e, 'prodname')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="prodprice"
                  onBlur={handleBlur}
                  onChange={(e) => addNewProduct(e, 'prodprice')}
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  fullWidth
                  label="Standard"
                  margin="normal"
                  name="prodcost"
                  onBlur={handleBlur}
                  onChange={(e) => addNewProduct(e, 'prodcost')}
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

export default Insertproduct;
