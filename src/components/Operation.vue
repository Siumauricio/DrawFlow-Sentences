<template>
   <div>
      <h3>{{ title }}</h3>
      <input class="form-control" type="number" v-model="result" disabled />
      <span
         ><a>Number {{ number1 }}</a></span
      >
      <br />
      <span
         ><a>Number {{ number2 }}</a></span
      >
   </div>
</template>

<script>
/*eslint-disable */
import {getCurrentInstance, ref, onMounted, onUnmounted} from "vue";
import {useStore} from "vuex";

export default {
   props: {
      title: String,
   },
   setup({title}) {
      const nodeId = ref(0);
      const number1 = ref(0);
      const number2 = ref(0);
      const result = ref(0);
      let df = null;
      const store = useStore();
      df = getCurrentInstance().appContext.config.globalProperties.$df.value;

      const unsubscribe = store.subscribe((mutation, state) => {
         number1.value = state.Operations[nodeId.value] ? state.Operations[nodeId.value].Number1 : 0;
         number2.value = state.Operations[nodeId.value] ? state.Operations[nodeId.value].Number2 : 0;
         result.value = 0;
         evaluateExpressions(title);
      });
      const evaluateExpressions = (expressionType) => {
         number1.value = Number.isNaN(number1.value) ? 0 : number1.value;
         number2.value = Number.isNaN(number2.value) ? 0 : number2.value;
         if (expressionType == "Add") {
            result.value = number1.value + number2.value;
         } else if (expressionType == "Sub") {
            result.value = number1.value - number2.value;
         } else if (expressionType == "Multiply") {
            result.value = number1.value * number2.value;
         } else if (expressionType == "Divide") {
            result.value = number1.value / number2.value;
         }
      };

      onMounted(() => {
         nodeId.value = df.nodeId;
      });
      onUnmounted(() => {
         unsubscribe();
      });

      return {nodeId, number1, number2, result};
   },
};
</script>

<style scoped></style>
