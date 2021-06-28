/* eslint-disable */
import { useContext, useState } from 'react';
import { AppContext } from '../Context';
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
} from '@material-ui/core';

const Dashboard = () => {
  const {
    report,
  } = useContext(AppContext);
  console.log(report);

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  custid
                </TableCell>
                <TableCell>
                  custname
                </TableCell>
                <TableCell>
                  income
                </TableCell>
                <TableCell>
                  profit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.map(({
                custid, custname, income, profit
              }) => {
                return  (
                  <TableRow
                    key={custid}
                  >
                    <TableCell>
                      {custid}
                    </TableCell>
                    <TableCell>
                      {custname}
                    </TableCell>
                    <TableCell>
                      {income}
                    </TableCell>
                    <TableCell>
                      {profit}
                    </TableCell>                    
                  </TableRow>
                    );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
        <TablePagination
          component="div"
          count={report.length}
        />
    </Card>
      );

};

export default Dashboard;
