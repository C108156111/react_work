/* eslint-disable */
import { useContext, useState } from 'react';
import { AppContext } from '../../Context';
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
} from '@material-ui/core';

const orderdetailList = () => {
  const {
    orderdetail,
    updateOrderdetail,
    deleteOrderdetail,
    OeditMode,
    OcancelEdit,
  } = useContext(AppContext);
  console.log(orderdetail);

  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateOrderdetail(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (seq, OrderId, prodid, qty, discount) => {
    setNewData({
        seq, OrderId, prodid, qty, discount
    });
    OeditMode(seq);
  };

  const deleteConfirm = (seq) => {
    if (window.confirm("Are you sure?")) {
        deleteOrderdetail(seq);
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
                  orderid
                </TableCell>
                <TableCell>
                  prodid
                </TableCell>
                <TableCell>
                  qty
                </TableCell>
                <TableCell>
                  discount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderdetail.map(({
                       seq, OrderId, ProdId, Qty, Discount, isEditing
              }) => {
                return isEditing === true ? (
                  <TableRow
                    hover
                    key={seq}
                  >
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={OrderId}
                        onChange={(e) => updateNewData(e, 'OrderId')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={ProdId}
                        onChange={(e) => updateNewData(e, 'prodid')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={Qty}
                        onChange={(e) => updateNewData(e, 'qty')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={Discount}
                        onChange={(e) => updateNewData(e, 'discount')}
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
                      onClick={() => OcancelEdit(seq)}
                    >
                      Cancel
                    </Button>
                  </TableRow>
                ) : (
                  <TableRow
                    key={seq}
                  >
                    <TableCell>
                      {OrderId}
                    </TableCell>
                    <TableCell>
                      {ProdId}
                    </TableCell>
                    <TableCell>
                      {Qty}
                    </TableCell>
                    <TableCell>
                      {Discount}
                    </TableCell>
                    <Button
                      className="btn default-btn"
                      onClick={() => enableEdit(seq, OrderId, ProdId, Qty, Discount)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn red-btn"
                      onClick={() => deleteConfirm(seq)}
                    >
                      Delete
                    </Button>
                  </TableRow>
                    );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
        <TablePagination
          component="div"
          count={orderdetail.length}
        />
    </Card>
      );
};

      export default orderdetailList;
