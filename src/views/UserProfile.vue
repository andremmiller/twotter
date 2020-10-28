<template>
  <div class="user-profile">
    <div class="user-profile__user-panel">
      <h1 class="user-profile__username">@{{ user.username }}</h1>
      <h2>id: {{ userId }}</h2>
      <div class="user-profile__admin-badge" v-if="user.isAdmin">Admin</div>
      <div class="user-profile__follower-count">
        <strong>Followers: </strong> {{ followers }}
      </div>
      <CreateTwootPanel @add-twoot="addTwoot" />
    </div>
    <div class="user-profile__twoots-wrapper">
      <TwootItem
        v-for="twoot in user.twoots"
        :key="twoot.id"
        :username="user.username"
        :twoot="twoot"
        @favourite="toggleFavourite"
      />
    </div>
  </div>
</template>

<script>
import TwootItem from "../components/TwootItem"
import CreateTwootPanel from "../components/CreateTwootPanel"
import users from '../assets/users'
// To access the router or the route inside the setup function, call the useRouter or useRoute functions. We will learn more about this in the Composition API
// https://next.router.vuejs.org/guide/#javascript
// import { useRoute } from 'vue-router'
// ex: 
// const route = useRoute()
// const userId = route.params.userId

export default {
  name: "UserProfile",
  components: { CreateTwootPanel, TwootItem },
  data() {
    return {
      followers: 0,
      user: {}
      //user: users[userId.value - 1] || users[0] 
      // impossivel referenciar userId (computed) dentro de data. dá pra acessar userId usando o mounted
      // é possível usando Composition API, dentro de reactive({}),com a sintaxe acima
    };
  },
  watch: {
    // execute a function when a value changes
    followers(newFollowerContent, oldFollowerContent) {
      if (oldFollowerContent < newFollowerContent) {
        console.log(`${this.user.username} has gained a follower!`);
      }
    },
  },
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    userId() {
      return this.$route.params.userId
    }
  },
  methods: {
    followUser() {
      this.followers++;
    },
    toggleFavourite(id) {
      console.log(`Favourited twoot: ${id}`);
    },
    addTwoot(twoot) {
      this.user.twoots.unshift({ id: this.user.twoots.length + 1, content: twoot })
    }
  },
  mounted() {
    this.followUser()
    console.log(users)
    this.user = users[this.userId - 1] || users[0] 
  },
};
</script>

<style scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  padding: 50px 5%;
}
.user-profile__user-panel {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #dfe3e8;
}
.user-profile__admin-badge {
  background: red;
  color: white;
  border-radius: 5px;
  margin-right: auto;
  padding: 0 10px;
  font-weight: bold;
}

h1 {
  margin: 0;
}

.user-profile__create-twoot {
  border-top: 1px solid #dfe3e8;
  border-radius: 5px;
  margin-right: auto;
  padding-top: 20px;
  font-weight: bold;
}

.user-profile__create-twoot > textarea {
  width: 100%;
}
</style>