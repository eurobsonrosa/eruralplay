<template>
  <div class="room-form">
    <Loading  v-if="loadingAddRoom"/>
    <div class="room-modal">
      <img src="@/assets/logo.png" alt="logo" width="200" />
      <hr />
      <div class="room-title">Adicionar nova sala</div>
      <input v-model="room.name" type="text" placeholder="Nome" required/>
      <input
        v-model="room.description"
        name="email"
        type="text"
        placeholder="Descrição"
        required
      />
      <input
        v-model="room.videoUrl"
        name="videoUrl"
        type="text"
        placeholder="URL do Vídeo"
        required
      />
      <input v-model="room.imageUrl" type="text" placeholder="URL da imagem" />
      <div class="buttons">
        <b-button variant="success" @click="addRoom">Criar Sala</b-button>
        <b-button @click="resetForm">Cancelar</b-button>
      </div>
      <router-link :to="{name: 'home'}">
            <span>Voltar para as Salas</span>            
        </router-link>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import Loading from "../templates/MyLoading.vue"
import axios from 'axios'
export default {
  name: "RoomForm",
  components: {Loading},
  data: function () {
    return {
      room: {},
      loadingAddRoom: false,
    };
  },
  methods: {
    addRoom() {
      this.loadingAddRoom = true;
      const url = `${baseApiUrl}/rooms/`
      axios.post(url, this.room)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.room = {}
        })
        .catch(showError)
        .finally(() => this.loadingAddRoom = false)
    },
    resetForm() {
      this.room = {};
    },
  },
};
</script>

<style>
.room-form {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.room-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.room-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.room-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.room-modal .buttons button{
    margin: 0 10px;    
}
.room-modal a {
  margin-top: 35px;
}

.room-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>