<template>
  <div class="rooms-admin">
    <b-form>
      <input id="room-id" type="hidden" v-model="room._id" />      
          <b-form-group label="Nome:" label-for="room-name">
            <b-form-input
              id="room-name"
              type="text"
              v-model="room.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome da Sala..." />
          </b-form-group>        
          <b-form-group label="Descrição da Sala:" label-for="room-description"> 
            <b-form-input
            id="room-description" type="text"
            v-model="room.description"
            required
            :readonly="mode === 'remove'" />
          </b-form-group>
          <b-form-group label="URL da Imagem:" label-for="room-imageUrl"> 
            <b-form-input
            id="room-imageUrl" type="text"
            v-model="room.imageUrl"
            :readonly="mode === 'remove'" />
          </b-form-group>
          <b-form-group label="URL do Vídeo:" label-for="room-videoUrl"> 
            <b-form-input
            id="room-videoUrl" type="text"
            v-model="room.videoUrl"
            required
            :readonly="mode === 'remove' || mode === 'update'" />
          </b-form-group> 
          <b-button variant="primary" v-if="mode === 'save' || mode === 'update'" @click="save"
            >Salvar</b-button
          >
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
            >Excluir</b-button
          >
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
    <b-table hover striped :items="rooms" :fields="fields">
      <template v-slot:cell(actions)="data" >
        <b-button variant="warning" @click="loadRoom(data.item, 'update')" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadRoom(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"></b-pagination>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "RoomAdmin",
  data: function () {
    return {
      mode: "save",
      room: {},
      rooms: [],
      count: 0,
      page: 1,
      limit: 0,
      fields: [
        { key: "_id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        {key: "description", label: "Descrição", sortable: true},
        {key: "username", label: "Criador", sortable: true},        
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadRooms() {
      const url = `${baseApiUrl}/rooms?page=${this.page}`;
      axios.get(url).then((res) => {
        this.rooms = res.data.rooms;       
        this.count = res.data.count;       
        this.limit = res.data.limit;       
      });
    },
    reset() {
      (this.mode = "save"), (this.room = {}), this.loadRooms();
    },
    save() {
      const method = this.room._id ? "put" : "post";
      const id = this.room._id ? `/${this.room._id}` : "";
      axios[method](`${baseApiUrl}/rooms${id}`, this.room)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.room._id;
      axios
        .delete(`${baseApiUrl}/rooms/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadRoom(room, mode = "save") {
      this.mode = mode;
      this.room = { ...room };
    },
  },
  mounted() {
    this.loadRooms();
  },
  watch: {
    page(){
      this.loadRooms()
    }
  }
};
</script>

<style>

</style>

