  
  

<template>
<div id="app">
  <div class="container" style="border: 3px solid rgb(177, 112, 112); border-radius : 10px; max-width:100%">
    <div class="row">
        <div class="col-md-6 mx-auto" style="width: 200px; text-align: center; padding-right: 0px; padding-left: 0px;">
            <ul style="padding-left: 0px; margin-bottom: 0px;">
              <li v-for="n in listNodes" :key="n" draggable="true" :data-node="n.item" @dragstart="drag($event)">
                <div class="node"  :style="`background: ${n.color};` ">{{ n.name }}</div>
            </li>
            </ul>
        </div>
        <div class="col-md-6 mx-auto" style="width: 1181px;padding-right: 0px;padding-left: 0px; ">
              <div id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)">
          </div>
        </div>
    </div>
</div>


    <!-- <ul> -->
          <!-- <li v-for="n in listNodes" :key="n" draggable="true" :data-node="n.item" @dragstart="drag($event)">
          <div class="node"  :style="`background: ${n.color}`">{{ n.name }}</div>
            </li> -->
        <!-- </ul> -->

</div>
</template>

<script>
/*eslint-disable */
import { h, getCurrentInstance, render, readonly, ref ,onMounted,shallowRef} from 'vue'
import NodeClick from './components/NodeClick.vue'
import Drawflow from 'drawflow'
import styleDrawflow from 'drawflow/dist/drawflow.min.css' // eslint-disable-line no-use-before-define
import Number from './components/Number.vue'
import Operation from './components/Operation.vue'
import Assignation from './components/Assignation.vue'
import For from './components/For.vue'
import If from './components/If.vue'
import Else from './components/Else.vue'
export default {
  name: 'App',
  setup(){
     const listNodes = readonly([
        {
            name: 'Number',
            color: '#EDDCD2',
            item: 'Number',
            input:0,
            output:1
        },
        {
            name: 'Add',
            color: 'red',
            item: 'Add',
            input:2,
            output:1
        },
        {
            name: 'Sub',
            color: 'blue',
            item: 'Sub',
            input:2,
            output:1
        },
        {
            name: 'Multiply',
            color: 'pink',
            item: 'Multiply',
            input:2,
            output:1
        },
         {
            name: 'Divide',
            color: 'green',
            item: 'Divide',
            input:2,
            output:1
        },{
            name: 'Assignation',
            color: 'yellow',
            item: 'Assignation',
            input:1,
            output:0
        },
        {
            name: 'For',
            color: 'White',
            item: 'For',
            input:1,
            output:0
        },
         {
            name: 'If',
            color: 'brown',
            item: 'If',
            input:1,
            output:1
        },
         {
            name: 'Else',
            color: 'cyan',
            item: 'Else',
            input:1,
            output:0
        },
        
    ])
    const editor = shallowRef({})
   const dialogVisible = ref(false)
   const dialogData = ref({})
   const internalInstance = getCurrentInstance()
   internalInstance.appContext.app._context.config.globalProperties.$df = editor;
     const Vue = { version: 3, h, render };



    const drag =(ev) =>{
  if (ev.type === "touchstart") {
        mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
      } else {
      ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
      }
    }
   
       const drop = (ev) => {
      if (ev.type === "touchend") {
        var parentdrawflow = document.elementFromPoint( mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
        if(parentdrawflow != null) {
          addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
        }
        mobile_item_selec = '';
      } else {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("node");
        addNodeToDrawFlow(data, ev.clientX, ev.clientY);
      }

    }
    const allowDrop = (ev) => {
      ev.preventDefault();
    }
        const  addNodeToDrawFlow = (name, pos_x, pos_y)=> {
      pos_x = pos_x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)));
      pos_y = pos_y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)));
    
      const nodeSelected = listNodes.find(ele => ele.item == name);
      editor.value.addNode(name, nodeSelected.input,  nodeSelected.output, pos_x, pos_y, name, {}, name, 'vue');
       // editor.on('nodeCreated');

    }

        onMounted(() => {
        var id = document.getElementById("drawflow");
        editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
        editor.value.start();
       
       editor.value.registerNode('Number', <Number/>, {}, {});
       editor.value.registerNode('Add', <Operation title="Add"/>, {}, {});
       editor.value.registerNode('Sub', <Operation title="Sub"/>, {}, {});
       editor.value.registerNode('Multiply', <Operation title="Multiply"/>, {}, {});
       editor.value.registerNode('Divide', <Operation title="Divide"/>, {}, {});
       editor.value.registerNode('Assignation', <Assignation />, {}, {});
       editor.value.registerNode('For', <For />, {}, {});
       editor.value.registerNode('If', <If />, {}, {});
       editor.value.registerNode('Else', <Else />, {}, {});

       // editor.reroute = true;
        // editor.start();

        // const props = {};
        // const options = {};
        // const value = <Number />;
        // // console.log(value)
        // editor.registerNode('Number',value ,props,options);
        // editor.registerNode('Add',AddVue,props,options);
        // editor.registerNode('NodeClick', NodeClick, props, options);
        // const data = {}
        // editor.addNode('Name3', 0, 1, 120, 250, 'Number',data, 'Number', 'vue');
        // editor.addNode('Name3', 2, 0, 150, 300, 'Add', data, 'Add', 'vue');
        // editor.addNode('Name3', 0, 1, 120, 250, 'Number',data, 'Number', 'vue');
    });

    //var html2 = `<div><input type="text" df-name></div>`;
   
  
    //call a value from component vue
    
  
    //editor.addNode('Name1', 1, 0, 150, 300, 'Class1', data, 'NodeClick', 'vue');
    //editor.addNode('Name2', 0, 1, 150, 150, 'Class2', data, 'NodeClick', 'vue');
    //editor.addNode('Name2', 0, 1, 150, 300, 'github', data, html2);
    return {listNodes, drag, drop, allowDrop, dialogVisible, dialogData}
  },
 
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #050505;
  font-size: 13px;
  text-align: initial;
  width: 100vw;
    height: 94.5vh;
    padding: 0px;
    margin: 0px;
}
#drawflow {
  width: 100%;
  height: 95.8vh;
  border: 3px solid rgb(177, 112, 112);
  border-radius : 10px;
  text-align: initial;
  background: #2b2c30;
  background-size: 20px 20px;
  background-image: radial-gradient(#494949 1px, transparent 1px);
  
}
.column {
    width: 25px;
    border-right: 1px solid #494949;
}
.column ul {
    padding-inline-start: 0px;
    padding: 10px 10px;
 
}

ul {
    list-style-type: none;
}
.column li {
    background: transparent;
}
.node {
    border-radius: 8px;
    border: 2px solid #000000;
    display: block;
    height:40px;
    line-height:40px;
    margin: 10px 0px;
    cursor: move;
    text-align: center;

}
</style>
