import Vue from 'vue'
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost'
import App from './App.vue'

Vue.use(VueApollo);

//creating apollo client
const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        authorization: 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjM4Njc5NjMsInN1YiI6IjEwMDAifQ.MHj9Wv4NO5V6G3gFzfla03UwnsFnitlm6ABz2I8u2FY'
      },
    });
  }
});

const apolloProvider = new VueApollo({
  defaultClient: client,
})

//injecting apolloProvider to root vue instance
new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app')