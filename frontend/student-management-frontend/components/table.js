import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as tableConfig from '../config/table-config';
import styles from '../styles/Home.module.css'

export default function AppTable({type, items, isRefresh}) {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const th = tableConfig.getTableHeadersByType(type);
  
  
  useEffect(() => {
    if (th.length > 0) setTableHeaders(th);
    // setTableHeaders(th);
    console.log(items);
    // if (tableHeaders.length > 0 && (items && items !== undefined && items.length > 0)) {
    //     setIsReady(true);
    //     console.log('true', type, items);
    // } else {
    //     setIsReady(false);
    // }
    
  }, [isRefresh]);


  return (
    <TableContainer component={Paper}>
    {tableHeaders.length > 0 && (items && items !== undefined && items.length > 0) ?
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">#</TableCell>
                    <TableCell align="center">Student Email</TableCell>
                    {/* <TableCell align="center">Actions</TableCell> */}
                    {/* {
                        tableHeaders.map(header => {
                        })
                    } */}
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={item}>
                        <TableCell align="center" component="th" scope="row">
                            {index+1}
                        </TableCell>
                        <TableCell align="center">{item}</TableCell>
                        {/* <TableCell align="center">
                            <button className={styles.buttonDanger} type="button">Suspend</button>
                        </TableCell> */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
     : <></>
    }
      
    </TableContainer>
  );
}
