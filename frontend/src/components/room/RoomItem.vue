<template>
  <div class="room-item">
    <router-link :to="{name: 'roomById', params: {id: room._id } }">
        <div class="room-item-img d-none d-sm-block">
            <img v-if="room.imageUrl"
            :src="room.imageUrl"
            height="150" width="150" alt="room" />
            <img v-else src="@/assets/rooms.png"
            height="150" width="150" alt="room" />
        </div>
        <div class="room-item-info">
            <h2>{{ room.name }}</h2>
            <p>{{ room.description }}</p>
            <span>
                Criada por <strong>{{ room.username }}</strong>
            </span>
        </div>
    </router-link>
  </div>
</template>

<script>
export default {
    name: 'roomItem',
    props: ['room']
}
</script>

<style>
    .room-item {
        border-radius: 8px;
        margin-bottom: 15px;
        padding: 20px;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15)
    }

     .room-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
     }

     .room-item-info h2 {
        font-size: 1.7rem;
     }

     .room-item-img {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
     }

     .room-item-img img {
        border-radius: 5px;
     }

     .room-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
     }

     .room-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
     }
</style>