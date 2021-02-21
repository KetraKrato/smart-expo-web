import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { string } from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


export default class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            filesURL: null
        };
    }
    
    handleClose() {
        
        var file = this.state.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        console.log(url)
        this.setState({
            filesURL: [reader.result],
            open: false
        });

    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.

        this.setState({
            files: files,
            open: false,
        });
       
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {
        
        return (
            
            <div>
                <Button onClick={this.handleOpen.bind(this)}>
                    Add Image
                </Button>
                <CardMedia
                    image="Klee.jpg"
                    title="Contemplative Reptile"
                    />
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}