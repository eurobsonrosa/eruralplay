<template>
  <div class="rooms">
    <PageTitle 
    icon="fa fa-tv"
    :main="category.name" sub="Salas disponíveis" />
    <router-link :to="{name: 'roomForm'}" class="add-room">
      <button class=" btn btn-lg btn-success">
        <i class="fa fa-plus"> </i> Adicionar Sala
      </button>
    </router-link>   
    <ul>
        <li v-for="room in rooms" :key="room._id"> 
            <roomItem :room="room" />
        </li>
    </ul>
    <div class="load-more">
        <button v-if="loadMore"
        class="btn btn-lg btn-outline-success"
        @click="getRooms">Carregar Mais</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from "@/global"
import PageTitle from '../templates/PageTitle'
import roomItem from "./RoomItem"

export default {
    name: 'roomsGet',
    components: { PageTitle, roomItem },
    data: function() {
        return {
            category: {},
            rooms: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {    
      getRooms() {
        const url = `${baseApiUrl}/rooms?page=${this.page}`
        axios(url).then(res => {
            this.rooms = this.rooms.concat(res.data.rooms)
            this.page++

            if(res.data.rooms.length === 0) this.loadMore = false
        })
      },      
       verifyLogin(){
            if(!this.$store.state.user) this.$router.push({ path: '/auth' })
        }
    },
    created(){
      this.verifyLogin()
    },
    mounted() {
      this.getRooms()
    }
}
</script>

<style>

.rooms .add-room {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 25px;  
  text-decoration: none;
}

 .rooms ul {
    list-style-type: none;
    padding: 0px;
 }

 .rooms .load-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
 }
</style>