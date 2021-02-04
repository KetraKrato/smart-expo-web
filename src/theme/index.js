// import { createMuiTheme, colors } from '@material-ui/core';
// import shadows from './shadows';
// import typography from './typography';

// const theme = createMuiTheme({
//   palette: {
//     // type: 'dark'
//     background: {
//       dark: '#000a12',
//       default: colors.common.black,
//       paper: '#212121'
//     },
//     primary: {
//       main: colors.indigo[600]
//     },
//     secondary: {
//       main: colors.red[500]
//     },
    
//     text: {
//       primary: colors.grey[50],
//       secondary: colors.grey[100],
    
//     }
//   },
//   shadows,
//   typography
// });

// export default theme;



import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[500]
    },
    secondary: {
      main: colors.indigo[500]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
});

export default theme;