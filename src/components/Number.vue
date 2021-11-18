<template>
    <div>
        <h4>Number</h4>
        <input class="form-control" type="number"  v-model="number" @change="updateNumber" placeholder="Ingresa un Numero" df-number  required/>
    </div>
</template>

<script>
/*eslint-disable */
import { h, getCurrentInstance,nextTick, render, readonly, ref ,onMounted,shallowRef, onBeforeUnmount,onUpdated} from 'vue'

export default {
    name: 'Number',
    data() {
        return {
            number: 0
        }
    },
    setup(){
         const el = ref(null);
        const nodeId = ref(0);
        let df = null
        let s = null;
        const dataNode = ref({});
        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const updateNumber = (e) =>{
            if(Number.isNaN(parseInt(e.target.value))){
             df.updateNodeDataFromId(nodeId.value, {Number:0});
            }else{
             df.updateNodeDataFromId(nodeId.value, {Number:parseInt(e.target.value)});
            }
        }


         onMounted(() => {
            nodeId.value = df.nodeId;
             setTimeout(() => {
               dataNode.value = df.getNodeFromId(nodeId.value);
            },0);
        });


        return { df,nodeId, dataNode,updateNumber }
    }
    // ,watch:{
    //     // number:function(value){
    //     //     const obj = this.df.getNodeFromId(this.nodeId);
    //     //     this.df.updateNodeDataFromId(this.nodeId,{Number:value});
    //     //     if (obj.outputs.output_1.connections.length == 1){
    //     //          const operation = this.df.getNodeFromId(parseInt(obj.outputs.output_1.connections[0].node));
    //     //         if (obj.outputs.output_1.connections[0].output == 'input_1'){
    //     //              this.df.updateNodeDataFromId(parseInt(obj.outputs.output_1.connections[0].node),{Number1:value,Number2:operation.data.Number2});
    //     //         }else if(obj.outputs.output_1.connections[0].output == 'input_2'){
    //     //           this.df.updateNodeDataFromId(parseInt(obj.outputs.output_1.connections[0].node),{Number1:operation.data.Number1,Number2:value});
    //     //         }
    //     //     // console.log(this.df.getNodeFromId(parseInt(obj.outputs.output_1.connections[0].node)))
    //     //     }
    //     // }
    // }
}
</script>

<style>
.Number {
    width: 100%;
}
</style>