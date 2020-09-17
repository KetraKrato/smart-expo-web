import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes, { element } from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  colors,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
const data = [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/static/images/products/product_4.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: moment().subtract(9, 'hours')
  }
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 100,
    width: 100,
    padding: 15
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
    padding:5
  },
  avatarStanger: {
    backgroundColor: colors.blue[600],
    height: 56,
    width: 56
  },
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [products] = useState(data);
  const [user,setUser] = useState([])
  React.useEffect(()=>{
    let value = {...rest}
    // setUser(value)
    // console.log(rest)
  },[rest])

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Notification"
      />
      <Divider />
      <List>
        {rest.data.slice(0,5).map((product, i) => (
          <div key = {i}>
            {product.message =="Profile have found"
            ?
             <div>
             <ListItem
            divider={i < products.length - 1}
          >
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={product.img_name}
              />
            </ListItemAvatar>
            {/* <ListItemText
             primary={<Typography  variant="caption" > faceid:{product.faceid}</Typography>}
              secondary={`Updated ${product.timeStamp}  ` }
            /> */}
               <ListItemText
              primary={<Typography  type="body2" > Name:
              {product.name}</Typography>
              
            }
            secondary={`Updated ${product.timeStamp}  `}
            />

            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
        
           
            {/* <br></br>
             <ListItemText
              primary={`${product.message}`}
            /> */}
           

                <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={"http://192.168.1.71:3000/images/upload_images/"+ product.match}
              />
            </ListItemAvatar>
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
            </div>
            :
          <div>
          <ListItem
            divider={i < products.length - 1}
          >
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={product.img_name}
              />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography  variant="caption" > faceid :{product.faceid}</Typography>}
              secondary={`Updated ${product.timeStamp}  ` }
            />
            <Avatar className={classes.avatarStanger}>
              <PeopleIcon />
            </Avatar>
            {/* <br></br>
             <ListItemText
              primary={`${product.message}`}
            /> */}

              {product.data.map((i,element)=>
                <ListItemAvatar key={element}>
                <img
                  alt="Product"
                  className={classes.image}
                  src={"http://192.168.1.71:3000/images/face_detection/res_"+ i.path_file}
                />
              </ListItemAvatar>

              )
              }
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
          </div> }
          </div>

        ))}
      </List>
      {/* <List>
        {products.map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
            key={product.id}
          >
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={product.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Updated ${product.updatedAt.fromNow()}`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List> */}
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string,
};

export default LatestProducts;
