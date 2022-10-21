<template>
  <div class="room-by-id">
    <PageTitle icon="fa fa-play" :main="room.name"/>    
    <div class="room-content">
      <div class="video-player-container col-12 col-lg-8">
        <video-player  class="vjs-big-play-centered"
          ref="videoPlayer"
          :options="playerOptions"
          :width="680"
          :playsinline="true"
          />
          <div class="room-user-bar">
          <span> Controlado por <strong>@{{controls.controller}}</strong></span>
          <span>Usuários Online: {{userCount}}</span>
          </div>
          <b-button v-if="iAmController()">Assumir Controle</b-button>
          <b-button v-else variant="success" @click="takeControl">Assumir Controle</b-button>
        </div>
        
      <div class="room-chat col-12 col-lg-4">
        <h3>Chat</h3>
        <hr>
        <ul class="room-messages" v-chat-scroll="{always: false, smooth: true, scrollonremoved:true}">
          <li v-for="message in messages" :key="message.id">
            <MainMessage :message="message" />
          </li>
      </ul>
      <div class="room-message-input">        
        <input type="text" placeholder="Digite sua mensagem" v-model="message" @keyup.enter="sendMessage">
        <b-button variant="success" @click.prevent="sendMessage">Enviar</b-button>
      </div>
      </div>      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {baseApiUrl } from "@/global"
import PageTitle from "../templates/PageTitle";
import MainMessage from "../message/MainMessage"
import "video.js/dist/video-js.min.css"
import "videojs-youtube/dist/Youtube.min.js"
import { videoPlayer } from 'vue-video-player'
import SocketioService from '../../services/socketio.service.js'
import {mapState} from "vuex"

export default {
  name: "roomById",
  components: { PageTitle, MainMessage, videoPlayer },
  data: function () {
    return {
      socketioService: new SocketioService(this.$route.params.id),
      room: {},
      controls: {},
      userCount: 0,
      message: null,
      messages: [],
      playerOptions: {},
      pulling: null,
    };
  },
  computed: mapState(['user']),
  methods: {
    sendMessage() {
      if(this.message.trim().length > 0){
        this.socketioService.imit(this.user.username, this.message)
        this.message = null
      }
      this.message = null
    },
    takeControl() {     
      this.controls.controller = this.user.username
      this.$refs.videoPlayer.player.controls(true)
      this.socketioService.emitControls(this.controls)
    },
    iAmController() {
      return this.user.username === this.controls.controller
    },
    updateControls(){
           this.pulling = setInterval(()=>{
              this.controls = this.socketioService.getControls()
              this.userCount = this.socketioService.getUserCount()
              if(this.iAmController()){
                this.$refs.videoPlayer.player.controls(true)
                this.controls.currentTime = this.$refs.videoPlayer.player.currentTime()
                this.controls.paused = this.$refs.videoPlayer.player.paused()      
                this.socketioService.emitControls(this.controls)
              } else {

                  this.$refs.videoPlayer.player.controls(false)

                  const estimated = this.controls.currentTime + 1
                  const myCurrent = this.$refs.videoPlayer.player.currentTime()
                  if(Math.abs(estimated - myCurrent) > 3){
                    this.$refs.videoPlayer.player.currentTime(this.controls.currentTime)
                  }

                  if(this.controls.currentTime + 1)
                  if(!this.controls.paused){
                    this.$refs.videoPlayer.player.play()
                  } else {
                    this.$refs.videoPlayer.player.currentTime(this.controls.currentTime)
                    this.$refs.videoPlayer.player.pause()
                    }                
                }}, 300)
        
    }
  },
  created() {    
    this.socketioService.setupSocketConnection(this.user.username)           
 },

  beforeMount() {    
    this.room.id = this.$route.params.id     
  },
  mounted() {    
    const url = `${baseApiUrl}/rooms/${this.$route.params.id}`
    axios.get(url).then(res => {      
      this.room = res.data.room
      this.playerOptions = {       
          playbackRates: [0.5, 1.0, 1.5, 2.0],
          techOrder: ["youtube"],
          sources: [{
            type: "video/youtube",
            src: this.room.videoUrl,
            youtube: { "iv_load_policy": 1 }
          }],
          poster: this.room.imageUrl,
        }
      })

    this.messages = this.socketioService.getMessage() 
    this.updateControls()      
  },  
 beforeDestroy() {
    this.socketioService.disconnect()
    clearInterval(this.pulling)
  },

};
</script>

<style>


 .room-content {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 8px;
    padding: 25px;
 }

.video-player-container {
  max-width: 100%;
  margin-bottom: 10px 
}

.video-player > div {
  width: 100%;
  height: 400px;
}

.room-user-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.room-user-bar span {
  font-size: 1.2rem;
}

.video-player-container button {
  margin-top: 10px;
}
  
 .room-chat {
    padding: 0;
    display: flex;
    flex-direction: column;    
    background-color: #e9e7e7;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 8px;    
 }

 .room-chat h3 {
  margin: 5px;
  align-self: center;
 }
.room-chat .room-messages {
  height: 420px;
  overflow-y: scroll;
}

.room-chat hr {
  margin: 0;
  border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
}
 .room-messages {
  display: flex;
  flex-direction: column;
  align-items: stretch;

 }

 .room-message-input {
  align-self: stretch;  
  display: flex;
 }

 .room-message-input input {
  flex: 1;
  border: none;
  outline: none;
  background-color: #fff;
  border-radius: 8px 0px 0px 8px;
  }

 .room-content ul {
    list-style-type: none;
    padding: 0px;
 }

 .room-content :last-child {
    margin-bottom: 0px;
 }
</style>