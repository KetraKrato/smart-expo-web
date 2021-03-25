import React, { Component, useState } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import { string } from 'yup';
import NoImage from './NoImage.png'

const DropzoneDialogExample = ({check,image}) =>{
    const [open,setOpen] = useState(false);
    const [files,setFiles] = useState([NoImage]);
    const [filesURL,setFileURL] = useState(null);

   function setImagetoSend(file){
        this.props.setImage(file)
    }

   function handleClose() {
       setOpen(false)
      
    }
   
    function handleSave(files) {
        console.log(files)
        var file = files[0];
   
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
   
        reader.onloadend = function (result) {
        console.log(file)
        image = file
        console.log("parameter"+image)
        // check()
        setFileURL(reader.result)
        setFiles(reader.result)
        setOpen(false)
  }
}
    function handleOpen() {
        if(open == false)  {
        setOpen(true);
     }
    }

    return(
        <div onClick={handleOpen}>
                
        <img style={{
            marginLeft: '6px',
            border: 'solid 1px #000',
            borderRadius : '5px',
            width: '200px',
            height:'300px',
        
        }} src={files} alt="..." />
        

        <DropzoneDialog
            open={open}
            onSave={handleSave}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={handleClose}
        />
    </div>
    );
};
export default DropzoneDialogExample;
// export default class DropzoneDialogExample extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             open: false,
//             files: [NoImage],
//             filesURL: null
//         };
//         this.setFile = this.setFile.bind(this);
//     }
    
//     setFile(file){
//         this.props.setImage(file)
//     }

//     handleClose() {
//         try {
//         this.setState(prevState => {
//             return {
//               ...prevState,
//               open: false,
//             };
//           });
//         }catch (e) {
//             console.log(e)
//         }
//         console.log(this.state)
//     }
//     setFile(files){ 
//         var file = files.target.file[0]
//         console.log(file)
//         var reader = new FileReader();
//         if (file) {
//             var url = reader.readAsDataURL(file);
//             console.log(url)
//             console.log("checkfile")
//             console.log(this.state.files)
            
//             this.setState({
//                 filesURL: [reader.result],
//             });
//         }
//         else {
//             console.log(this.state.files)
//             console.log("Not file")
//         }
//     }
//     handleSave(files) {
//         //Saving files to state for further use and closing Modal.
//         // this.setState({
//         //     files: files,
//         //     open: false,
//         // });
//         // this.setState(prevState => ({
//         //     file: files,
//         //     open: false
//         // }))
//         console.log(files)
//         // this.setState(prevState => {
//         // return {
//         //     files: files,
//         //     // filesURL : URL.createObjectURL(files.target.files[0]),
//         //     open: false,
//         //  }
//         // })
//         var file = files[0];
   
//     const reader = new FileReader();
//     var url     = reader.readAsDataURL(file);
//     try{
//         reader.onloadend = function (result) {
//         console.log(file)
        
//         console.log(reader.result)
//             this.setState({
//                 files: [reader.result],
//                 open: false,
//             });
//      }.bind(this)
     
//     }
//     catch(e) {
//       alert("นำเข้ารูปภาพล้มเหลว")
//     } 
    
//     // console.log(profile); // Would see a path?
//   };
//         //console.log(this.state.files)
//         // this.setFile(files)
//     check() { 
//         console.log(this.state.files)
//     }


//     handleOpen() {
//         if(this.state.open == false)  {
//         this.setState({
//             open: true,
//         });
//      }
//     }

//     render() {
        
//         return (
            
//             <div onClick={this.handleOpen.bind(this)}>
                
//                 {/* <Button onClick={this.handleOpen.bind(this)}>
//                     Add Image
//                 </Button> */}

//                 <img style={{
//                     marginLeft: '6px',
//                     border: 'solid 1px #000',
//                     borderRadius : '5px',
//                     width: '200px',
//                     height:'300px',
                
//                 }} src={this.state.files} alt="..." />
                

//                 <DropzoneDialog
//                     open={this.state.open }
//                     onSave={this.handleSave.bind(this)}
//                     acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
//                     showPreviews={true}
//                     maxFileSize={5000000}
//                     onClose={this.handleClose.bind(this)}
//                 />
//             </div>
//         );
//     }
// }