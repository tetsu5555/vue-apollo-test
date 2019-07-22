<template>
  <div id="app">
    <div v-if="$apollo.loading">Loading..</div>
    <div v-else>
      <h1>Name: {{ user.name}}</h1>
      <p>Email: {{viewer.email }}</p>
      <!-- <div v-for="repository in repositories.nodes" :key="repository.id">
        <div>repository.name</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { gql } from "apollo-boost";
export default {
  data: function() {
    return {
        //query data is added
      viewer: {},
      user: {}
    };
  },
  apollo: {
      //this query will update the `viewer` data property
    user: {
      query: gql`
        {
          user(userID: "id_1009"){
            name
            userProfiles {
              email
              name
              avatar
              profile
            }
            followersCount
          }
        }`

    }
  }
};
</script>