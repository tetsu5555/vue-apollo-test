<template>
  <div class="repos">
    <div v-if="!loading">
      <h2>First 10 repositories</h2>
      <!-- looping through viewer repos -->
      <ul v-for="repo in viewer.repositories.edges" :key="repo.node.id">
        <li>{{repo.node.name}}</li>
        <li>Stars : {{repo.node.stargazers.totalCount}}</li>
        <li v-if="!repo.node.viewerHasStarred">
          <add-star :id="repo.node.id" :refetch="refetch"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { gql } from "apollo-boost";
import AddStar from "./AddStar"

export default {
  components: {
    AddStar
  },
  data: function() {
    return {
      viewer: [],
      loading:true
    };
  },
  // TODO: クエリを別ファイルに記述する
  apollo: {
    viewer: {
      query: gql`
      query MyRepos($first: Int!) {
          viewer {
            repositories(first: $first) {
              pageInfo {
                endCursor
                hasNextPage
                startCursor
                hasPreviousPage
              }
              edges {
                node {
                  id
                  name
                  viewerHasStarred
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
        }
      `,
      variables: { first: 30 },
      result:function({data}){
        if(data){
          this.loading=false
        }
      }
    }
  },
  methods: {
    refetch: function() {
      this.$apollo.queries.viewer.refetch();
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  border: 1px solid;
  padding: 1rem;
}
</style>