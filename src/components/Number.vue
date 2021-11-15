<template>
    <div>
        <h4>Number</h4>
        
        <input class="form-control" type="number"  v-model="number" @change="updateValue" placeholder="Ingresa un Numero"/>
    </div>
</template>

<script>
/*eslint-disable */
import { h, getCurrentInstance,nextTick, render, readonly, ref ,onMounted,shallowRef, onBeforeUnmount} from 'vue'

export default {
    name: 'Number',
    setup(){
        let number = ref(1);
        const nodeId = ref(0);
        let df = null
        const dataNode = ref({});
        df = getCurrentInstance().appContext.config.globalProperties.$df.value;
        
        const updateValue = (e) =>{

              //console.log(df.getNodeFromId(nodeId.value));
            dataNode.value = df.getNodeFromId(nodeId.value)
            dataNode.value.data.number = e.target.value;

            const node = {
                type: 'Number',
                id: nodeId.value,
                number: number.value,
                outputs: dataNode.value.outputs.output_1.connections[0]
            }
            df.updateNodeDataFromId(nodeId.value,node);
            console.log(df.getNodeFromId(nodeId.value));
        }
        onMounted(() => {
            nodeId.value = df.nodeId;
            console.log(nodeId.value);
             setTimeout(() => {
                 dataNode.value = df.getNodeFromId(nodeId.value);
                 number.value = dataNode.value.data.number;
            },0);
        });
        return {
            number,
            updateValue
        }
    }
}
</script>

<style>

.number {
    width: 100%;
}

</style>