<template>
   <div>
      <h3 class="text-2xl">{{ title }}</h3>
      <!-- Hola{{ count?.Number1 }} -->
      <input class="form-control" type="number" :value="operation?.Result" disabled />
      <span
         ><a>Number {{ operation?.Number1 }}</a></span
      >
      <br />
      <span
         ><a>Number {{ operation?.Number2 }}</a></span
      >
   </div>
</template>

<script>
/*eslint-disable */
import {getCurrentInstance, ref, onMounted, onUnmounted} from "vue";
import {useStore} from "vuex";
// import store from "./store";

export default {
   props: {
      title: String,
   },
   data() {
      return {
         store: useStore(),
         nodeId: getCurrentInstance().appContext.config.globalProperties.$df.value.nodeId,
      };
   },
   setup({title}) {
      const nodeId = ref(0);
      const number1 = ref(0);
      const number2 = ref(0);
      const result = ref(0);
      let df = null;
      const store = useStore();
      df = getCurrentInstance().appContext.config.globalProperties.$df.value;

      // const unsubscribe = store.subscribe((mutation, state) => {
      //    number1.value = state.Operations[nodeId.value] ? state.Operations[nodeId.value].Number1 : 0;
      //    number2.value = state.Operations[nodeId.value] ? state.Operations[nodeId.value].Number2 : 0;
      //    result.value = 0;
      //    // console.log(mutation);
      //    evaluateExpressions(title, state, mutation);
      //    // console.log("Hola");
      // });
      // const evaluateExpressions = (expressionType, state, mutation) => {
      //    number1.value = Number.isNaN(number1.value) ? 0 : number1.value;
      //    number2.value = Number.isNaN(number2.value) ? 0 : number2.value;
      //    if (expressionType == "Add") {
      //       result.value = number1.value + number2.value;
      //    } else if (expressionType == "Sub") {
      //       result.value = number1.value - number2.value;
      //    } else if (expressionType == "Multiply") {
      //       result.value = number1.value * number2.value;
      //    } else if (expressionType == "Divide") {
      //       result.value = number1.value / number2.value;
      //    }
      //    if (mutation.type == "addOperation" || mutation.type == "addNumber") {
      //       state.Operations[nodeId.value] = {
      //          Number1: number1.value,
      //          Number2: number2.value,
      //          Result: result.value,
      //       };
      //       df.updateNodeDataFromId(nodeId.value, state.Operations[nodeId.value]);
      //    } else {
      //       unsubscribe();
      //       console.log("Borrando Elemento");
      //    }

      //    // const node = df.getNodeFromId(nodeId.value);
      //    // console.log(node);
      //    // if (node) {
      //    // }
      //    // console.log(nodeId.value);
      //    // if (typeof df.getNodeFromId(nodeId.value) == undefined) {
      //    //    console.log("undefined");
      //    // }

      //    // store.dispatch("setOperationAction", {id: nodeId.value, value: {Number1: number1.value, Number2: number2.value, Result: result.value}});
      // };

      onMounted(() => {
         nodeId.value = df.nodeId;
      });
      // onUnmounted(() => {
      //    unsubscribe();
      // });

      return {nodeId, number1, number2, result};
   },
   computed: {
      operation() {
         return this.store.state.Operations[this.nodeId];
      },
   },
   watch: {
      "store.state.Operations": function () {
         console.log(this.store.state.Operations);
      },
   },
};
</script>

<style scoped></style>
