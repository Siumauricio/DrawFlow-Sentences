import {createStore} from "vuex";

export default createStore({
   state: {
      Numbers: {},
      Operations: {},
      Statements: {},
   },
   mutations: {
      addNumber(state, number) {
         state.Numbers[number.id] = number.value;
      },
      deleteNumber(state, number) {
         delete state.Numbers[number.id];
      },
      addOperation(state, operation) {
         state.Operations[operation.id] = operation.value;
      },
      deleteOperation(state, operation) {
         // state.Operations[operation.id] = null;
         delete state.Operations[operation.id];
         // console.log(state.Operations);
      },
      addStatement(state, statement) {
         state.Statements[statement] = statement;
      },
   },
   actions: {
      setNumberAction({commit}, number) {
         commit("addNumber", number);
      },
      deleteNumberAction({commit}, number) {
         commit("deleteNumber", number);
      },
      setOperationAction({commit}, operation) {
         commit("addOperation", operation);
      },
      deleteOperationAction({commit}, operation) {
         commit("deleteOperation", operation);
      },
      addStatementAction({commit}, statement) {
         commit("addStatement", statement);
      },
   },
   getters: {
      getNumbers: (state) => state.Numbers,
      getNumberbyId: (state) => (id) => state.Numbers[id],
      getOperations: (state) => state.Operations,
      getStatements: (state) => state.Statements,
   },
   modules: {},
});
