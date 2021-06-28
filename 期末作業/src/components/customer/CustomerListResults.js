/* eslint-disable */
import { Link as RouterLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../Context';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Link
} from '@material-ui/core';

const SalesListResults = () => {
  const {
    salesorders,
    getOrderdetail,
    SeditMode,
    ScancelEdit,
    updateSalesorder,
    deleteSalesorder,
  } = useContext(AppContext);
  console.log(salesorders);

  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateSalesorder(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (seq, salesid, empid, custid, orderdate, descript) => {
    setNewData({
      seq, salesid, empid, custid, orderdate, descript
    });
    SeditMode(seq);
  };

  const deleteConfirm = (seq) => {
    if (window.confirm("Are you sure?")) {
      deleteSalesorder(seq);
    }
  };
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  salesid
                </TableCell>
                <TableCell>
                  empid
                </TableCell>
                <TableCell>
                  custid
                </TableCell>
                <TableCell>
                  orderdate
                </TableCell>
                <TableCell>
                  descript
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesorders.map(({
                seq, salesid, empid, custid, orderdate, descript, isEditing
              }) => {
                return isEditing === true ? (
                  <TableRow
                    hover
                    key={seq}
                  >
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={salesid}
                        onChange={(e) => updateNewData(e, 'salesid')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={empid}
                        onChange={(e) => updateNewData(e, 'empid')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={custid}
                        onChange={(e) => updateNewData(e, 'custid')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={moment(orderdate).format('DD/MM/YYYY')}
                        onChange={(e) => updateNewData(e, 'orderdate')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={descript}
                        onChange={(e) => updateNewData(e, 'descript')}
                      />
                    </TableCell>
                    <Button
                      className="btn green-btn"
                      onClick={() => saveBtn()}
                    >
                      save
                    </Button>
                    <Button
                      className="btn default-btn"
                      onClick={() => ScancelEdit(seq)}
                    >
                      Cancel
                    </Button>
                  </TableRow>
                ) : (
                  <TableRow
                    key={seq}
                  >
                    <TableCell>
                      {salesid}
                    </TableCell>
                    <TableCell>
                      {empid}
                    </TableCell>
                    <TableCell>
                      {custid}
                    </TableCell>
                    <TableCell>
                      {orderdate}
                    </TableCell>
                    <TableCell>
                      {descript}
                    </TableCell>
                    <Button
                      className="btn default-btn"
                      onClick={() => enableEdit(seq, salesid, empid, custid, orderdate, descript)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn red-btn"
                      onClick={() => deleteConfirm(seq)}
                    >
                      Delete
                    </Button>
                    <Link                      
                      color="primary"
                      component={RouterLink}
                      onClick={()=> getOrderdetail(salesid)}
                      to="/app/orderdetailList"
                      variant="h6"
                    >
                      <Button>
                        detail
                      </Button>
                      </Link>
                  </TableRow>
                    );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
        <TablePagination
          component="div"
          count={salesorders.length}
        />
    </Card>
      );
};

      export default SalesListResults;
