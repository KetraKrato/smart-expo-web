import React from 'react'
//引入依赖
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import videojs from 'video.js'

const url = [
    {
        url:"rtsp://admin:admin@192.168.1.100:8557/h264",
        name:"CAMERA1"
    },
    {
        url:"rtsp://admin:admin@192.168.1.100:8557/h264",
        name:"CAMERA2"
    }
]
class App extends React.Component{
    state={
        nowPlay:""
    }
//组件挂载完成之后初始化播放控件
    componentDidMount(){
    const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
              src: 'rtmp://localhost/live/cameratest1',
              type: "rtmp/flv"
            }]
          }
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
                    <ul style={{listStyleType: "decimal-leading-zero",float:"left"}}>
                    {/* {
                        url.map((item,index)=>{
                            return <li style={{height:60}} key={item.name} onClick={()=>this.handleClick(item)}>
                                        <span style={this.state.nowPlay===item.name?playing:li}>{item.name}</span>
                                    </li>
                        })
                    } */}
                    </ul>
                    <video style={{width:"50vw",height:"70vh",margin:"0 auto"}} id="my-video" className="video-js vjs-default-skin">
                    </video>
                </div>
            </div>   
        )
    }
}

export default App