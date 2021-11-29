
<template>
    <div>
        <h2 class="text-2xl">If</h2>
        <span class="text-lg"><a>Condition</a></span>

        <input  class="form-control" type="number" @change="changeExpr"  v-model="expr1"/>


        <select class="form-select mt-3" aria-label="Default select example" v-model="operator" @change="changeExpr">
        <option selected>Open this select menu</option>
        <option style="text-align: center;" value="<"> <h1>  &lt; </h1> </option>
        <option style="text-align: center;" value=">"> <h1> > </h1> </option>
        <option style="text-align: center;" value="=="> <h1>==</h1> </option>
        <option style="text-align: center;" value="!="> <h1>!=</h1> </option>
        <option style="text-align: center;" value="<="> <h1>>=</h1> </option>
        <option style="text-align: center;" value=">="> <h1> &lt;= </h1> </option>
      

        </select>
        <input  class="form-control mt-3" type="number" @change="changeExpr" v-model="expr2"/>
    </div>
</template>

<script>
/*eslint-disable */
import {h, getCurrentInstance, nextTick, render, readonly, ref, onMounted, shallowRef, onBeforeUnmount, onUpdated} from "vue";

export default {
    name: 'If',
    setup() {
        const expr1 = ref(0);
        const expr2 = ref(0);
        const operator = ref('');
        const nodeId = ref(0);
        let df = null;
        const dataNode = ref({});
        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const changeExpr = (e) => {
             df.updateNodeDataFromId(nodeId.value,  {Expression1:expr1.value,Operator:operator.value,Expression2:expr2.value});
        }


    onMounted(() => {
         nodeId.value = df.nodeId;
         setTimeout(() => {
            dataNode.value = df.getNodeFromId(nodeId.value);
         }, 0);
      });


        return {changeExpr,expr1,expr2,operator};
    }
}
</script>
