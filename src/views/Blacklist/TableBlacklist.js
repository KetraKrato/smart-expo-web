import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Grid, Container, Button } from '@material-ui/core';
import {historyService} from "../../services"
import Page from '../../components/Page';
import moment from "moment"
import Avatar from "@material-ui/core/Avatar"
import {apiConstants} from "../../_constants"
import GroupIcon from '@material-ui/icons/Group';
import { colors} from "@material-ui/core"
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Popover from '@material-ui/core/Popover';
import { useNavigate } from 'react-router-dom';
import Klee from './Klee.jpg'
import {userService} from "../../services"
function createData(id,  name, sex, age, height,weight, detail) {
  return {
    id,  name, sex, age, height, weight, detail
  };
}


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}




const headCells = [
  {
    id: 'id', numeric: false, disablePadding: true, label: 'ID'
  },
  {
    id: 'name', numeric: true, disablePadding: false, label: 'Name'
  },
  {
    id: 'sex', numeric: true, disablePadding: false, label: 'Sex'
  },
  {
    id: 'age', numeric: true, disablePadding: false, label: 'Age '
  },
  {
    id: 'height', numeric: true, disablePadding: false, label: 'Height'
  },
  {
    id: 'weight', numeric: true, disablePadding: true, label: 'Weight'
  },
  //   {
  //   id: ' ', numeric: false , disablePadding: false, label: ' '
  // },
];

function EnhancedTableHead(props) {
  const {
    classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
         <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
          </TableCell> 
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={ 'left'}
            // align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >

              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    
    flex: '1 1 100%',
  },

}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;



  
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected}
          {' '}
          selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Visitor History
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 1,
    // background:'#12346f',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  avatar: {
    '& svg': {
        fontSize: 32
      },
    backgroundColor: colors.lightBlue[600],
    height:48,
    width: 48,
    color: colors.grey[100],
    marginRight: '0px',
  },
  avatarVerify: {
    '& svg': {
        fontSize: 32
      },
    backgroundColor: colors.lightGreen[600],
    height:48,
    width: 48,
    color:colors.grey[100]
  },
  avatarWarning: {
    '& svg': {
        fontSize: 32
      },
    backgroundColor: colors.red[600],
    height:48,
    width: 48,
    color:colors.grey[100]
  },
  editpop: {
    background: '#00e676',
    color:'#ffffff'
  }, '&:hover': {
    background: '#33eb91',
    color:'#000'
  },
  deletepop: {
    background: '#ba000d',
    color:'#ffffff'
  }

}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

 const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickPop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  
  const [rows,setRows] = React.useState([
    createData(1,'Nattatam Watanakajonchaikul','Male', 22, 170, 65.6),
    createData(2,'Watanaka Tinkuran','Female', 10, 180, 46),
    createData(3,'LLLLLLLL dfsdfsdfsdfdsf', 'Female', 25, 175, 44),
    createData(4,'Watanakas Tinkuran', 'Female', 10, 165, 53.5),
    createData(5, 'Watanakaa Tinkuran', 'Female', 10, 155, 48.9),
    createData(6, 'Watanakad Tinkuran', 'Female', 10, 150, 65),
    createData(7,'Watanakaf Tinkuran','Female', 10, 140, 78),
  ])

  //call data form backend
  React.useEffect(async ()=>{
    let getAllUser = await userService.getAllUser().then((data)=>{
      console.log("start call data staff")
      return data
  
    }).catch((e)=>{
      throw e
    })
    console.log(getAllUser.data)
    var dataUser = getAllUser.data.group.map(datas => datas.members.map( memb => datas.name == 'Dangerous' && createData(memb.id,memb.firstName +'  '+ memb.lastName,memb.sex, memb.age, 100, 50.4)  ))
    console.log(dataUser)
    console.log(dataUser[0][0])
    var temp = []
    var fommatdataUser = []
    var lengthData = dataUser.length
    for ( let i = 0 ; i < lengthData;i++){
      console.log(i)
      for( let j = 0 ; j < dataUser[i].length;j++){
        console.log("check j")
          temp = dataUser[i][j]; 
          fommatdataUser.push(temp);
      } 
    }
    console.log(fommatdataUser)
    var NumUser = fommatdataUser.length
    for (let f = 0; f < NumUser;f++){
      const index = fommatdataUser.indexOf(false);
      if (index > -1) {
        fommatdataUser.splice(index, 1);
      }
    }

    setRows(fommatdataUser)
  },[])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Container maxWidth={false}>

  <Grid container spacing={3}>

  <Grid xs={12}>
    <Page
      className={classes.root}
      title="Review"
    >
     
                <Paper className={classes.paper}>
                  {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                  <TableContainer>
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                      size={dense ? 'small' : 'medium'}
                      aria-label="enhanced table"
                    >
                      <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        // onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            const isItemSelected = isSelected(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                
                                onClick={(event) => handleClick(event, row.name)}
                                // role="checkbox"
                                // aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                                selected={isItemSelected}
                              >
                                <TableCell padding="checkbox">
                                  {/* <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                  /> */}
                                    { !row.face?.member_picture ? (
                                    
                                      <Avatar   className={classes.avatar}>
                                       <GroupIcon></GroupIcon>
                                      </Avatar> )
                                      :(
                                          <div>
                                             { row.face?.member_picture.member.type ? 
                                             ( <Avatar   className={classes.avatarVerify}>
                                             <VerifiedUserIcon></VerifiedUserIcon>
                                             </Avatar>
                                             ):(
                                              <Avatar   className={classes.avatarWarning}>
                                              <PersonAddDisabledIcon></PersonAddDisabledIcon>
                                             </Avatar>
                                             )
                                             }
                                          </div>
                                       )
                                    }
                                </TableCell>
                                <TableCell component="th" id={labelId} scope="row" >
                                  {row.id}
                                </TableCell>
                             {/*   <TableCell component="th" id={labelId} scope="row" >

                                  {moment(row.created).format("DD-MM-YYYY")}
                                  <br></br>
                                  {moment(row.created).format("HH:mm:ss")}

                                </TableCell>*/}
                                {/* <TableCell component="th" id={labelId} scope="row"align="center" >
                                    <Avatar
                                    alt="image_detection"
                                    className={classes.avatar}
                                    src={apiConstants.uri+row.face_path?.substring(6,row.face_path.length)}
                                   />
                                </TableCell> */}


                                 { row.face?.member_picture ? (
                                 <TableCell align="left">
                                  
                                  {row.face?.member_picture.member.group.name}
                                  </TableCell>
                                ) : (
                                    // demo data
                                   
                                      <TableCell component="th" id={labelId} scope="row"align="center" style={{ cursor: 'pointer' }} onClick={() => { navigate('/app/blacklist/detailblacklist/' + row.id , { push: true }); }} >
                                      <Grid container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="center"
                                        spacing={2}>
                                        <Grid item>
                                           <Avatar
                                        alt="image_detection"
                                        className={classes.avatar}
                                        //src={apiConstants.uri+row.face_path?.substring(6,row.face_path.length)}
                                        src={Klee}
                                        />
                                        </Grid>
                                        <Grid item>
                                          { row.name}
                                        </Grid>
                                          </Grid>
                                      {/* <Avatar
                                        alt="image_detection"
                                        className={classes.avatar}
                                        //src={apiConstants.uri+row.face_path?.substring(6,row.face_path.length)}
                                        src={Klee}
                                        /> */}
                                      
                                        </TableCell>
                                      
                                     
                                  )   
                                }
                                { row.sex?.member_picture ? (
                                  <TableCell align="left">
                                  
                                  <Avatar
                                    alt="image_detection"
                                    className={classes.avatar}
                                    src={apiConstants.uri+row.face.member_picture.image_path?.substring(6,row.face.member_picture.image_path.length)}
                                   />
                                  </TableCell>
                                ) : (
                                    <TableCell>
                                      {row.sex}
                                    </TableCell>
                                )

                                }

                                { row.age?.member_picture ? (
                                  <TableCell align="left">
                                  
                                  <Avatar
                                    alt="image_detection"
                                    className={classes.avatar}
                                    src={apiConstants.uri+row.face.member_picture.image_path?.substring(6,row.face.member_picture.image_path.length)}
                                   />
                                  </TableCell>
                                ) : (
                                    <TableCell>
                                      {row.age}
                                    </TableCell>
                                )

                                }
                              { row.company?.member_picture ? (
                                  <TableCell align="left">
                                  
                                  <Avatar
                                    alt="image_detection"
                                    className={classes.avatar}
                                    src={apiConstants.uri+row.face.member_picture.image_path?.substring(6,row.face.member_picture.image_path.length)}
                                   />
                                  </TableCell>
                                ) : (
                                    <TableCell>
                                      {row.height}
                                    </TableCell>
                                )

                                }
                                { row.position?.member_picture ? (
                                  <TableCell align="left">
                                  
                                  <Avatar
                                    alt="image_detection"
                                    className={classes.avatar}
                                    src={apiConstants.uri+row.face.member_picture.image_path?.substring(6,row.face.member_picture.image_path.length)}
                                   />
                                  </TableCell>
                                ) : (
                                    <TableCell>
                                      {row.weight}
                                    </TableCell>
                                )

                                }
                                {/* <TableCell>
                                  <Button onClick={handleClickPop}>
                                    <MoreHorizIcon/>
                                  </Button>
                                  <Popover
                                      id={labelId}
                                      open={open}
                                      anchorEl={anchorEl}
                                      onClose={handleClosePop}
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                      }}
                                      transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                      }}
                                    >
                                      <Button fullWidth className={classes.editpop} onClick={() => { navigate('/app/blacklist/detailblacklist/' + row.id , { replace: true }); }} >Edit</Button><br/>
                                      <Button className={classes.deletepop}>Delete</Button>
                                    </Popover>
                                  </TableCell> */}
                                {/* <TableCell align="center">{row.device?.device_name} </TableCell>
                                <TableCell align="center">{row.device?.location.LocationName} </TableCell>
                                <TableCell align="center">{row.device?.location.event.eventName}</TableCell> */}
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
                
    </Page>
    </Grid>
    </Grid>
</Container>
    
  );
}
