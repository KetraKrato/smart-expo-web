import React from 'react'
//引入依赖
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import { connect } from 'react-redux';
import videojs from 'video.js'
const url = [
    {
        url:"rtmp://0.0.0.0/live/STREAM_NAME12",
        name:"Camera 1"
    },
    {
        url:"rtmp://0.0.0.0/live/STREAM_NAME12",
        name:"Camera 2"
    }
]
class App extends React.Component{
    state={
        nowPlay:"",
        device_name:"",
        stream_url:""
    }
//组件挂载完成之后初始化播放控件
componentDidUpdate(previousProps, previousState) {
    if (previousProps.device_name !== this.props?.device_name) {
        this.setState({device_name:this.props.device_name})
        console.log(this.state.device_name)
        this.setState({stream_url:this.state.stream_url})
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
              src: this.state.stream_url,
              type: 'rtmp/flv'
            }]
          }
          if(this.state.device_name===this.props.device_name){
            return
        }
        this.setState({
            device_name:this.state.device_name
        })
            this.player.pause();
            this.player.src(this.props.stream_url);
            this.player.load();
            this.player.play();
    }
}

    componentDidMount(){
    const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
              src: 'rtmp://0.0.0.0/live/STREAM_NAME12',
              type: 'rtmp/flv'
            }]
          }
          this.setState({nowPlay:"start"})
          this.player = videojs('my-video', videoJsOptions , function onPlayerReady() { //(id或者refs获取节点，options，回调函数)
            videojs.log('Your player is ready!');
            // In this context, `this` is the player that was created by Video.js.
            this.play();
            // How about an event listener?
            this.on('ended', function() {
              videojs.log('Awww...over so soon?!');
            });
          }); 
         
    }

    handleClick(item){
        if(item.name===this.state.nowPlay){
            return
        }
        this.setState({
            nowPlay:item.name
        })
            this.player.pause();
            this.player.src(item.url);
            this.player.load();
            this.player.play();
    }
    render(){
        let li = {
            background: "cadetblue",
            padding: "11px",
            width: "fit-content",
            marginBottom:"5px",
            cursor:"pointer"
        }
        let playing = {
            background: "rgb(141, 182, 28)",
            padding: "11px",
            width: "fit-content",
            marginBottom:"5px",
            cursor:"pointer"
        }
        return(
            <div
                className="main-wrap"
            >
                <div>
                    {/* {
                        url.map((item,index)=>{
                            return <li style={{height:60}} key={item.name} onClick={()=>this.handleClick(item)}>
                                        <span style={this.state.nowPlay===item.name?playing:li}>{item.name}</span>
                                    </li>
                        })
                    } */}
                    <video style={{width:"30vw",height:"50vh",margin:"0 auto"}} id="my-video" className="video-js vjs-default-skin">
                    </video>
                </div>
            </div>   
        )
    }
}

function mapState(state) {
    const { device } = state.device;
    console.log(device)
    return device ;
}

const actionCreators = {
   
};
const connectedDevice = connect(mapState, actionCreators)(App);
export default connectedDevice 