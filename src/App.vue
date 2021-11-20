<template>
   <div id="app">
      <div class="container" style="height: 1000px; max-width: 100%; max-height: 100%">
         <div class="row">
            <div class="col-md-6 mx-auto" style="width: 200px; text-align: center; padding-right: 0px; padding-left: 0px">
               <ul class="list-group" style="padding-left: 0px; margin-bottom: 10px; margin-top: 10px">
                  <li class="list-group-item list-group-item-action list-group-item-primary" v-for="n in listNodes" :key="n" draggable="true" :data-node="n.item" @dragstart="drag($event)">
                     <div v-on:click="info($event)" class="node" :style="`background: ${n.color};`">{{ n.name }}</div>
                  </li>
                  <li class="list-group">
                     <button v-on:click="generatePythonCode($event)" type="button" class="btn btn-primary">Generate Python Code</button>
                  </li>
               </ul>
            </div>
            <div class="col-md-6 mx-auto" style="padding-top: 10px; height: 100vh; min-height: 492px; width: 1181px; padding-right: 0px; padding-left: 0px">
               <div class="border" id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)"></div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
/*eslint-disable */
import {h, getCurrentInstance, render, readonly, ref, onMounted, shallowRef} from "vue";
import Drawflow from "drawflow";
import {useStore} from "vuex";
import styleDrawflow from "drawflow/dist/drawflow.min.css"; // eslint-disable-line no-use-before-define
import Number from "./components/Number.vue";
import Operation from "./components/Operation.vue";
import Assignation from "./components/Assignation.vue";
import For from "./components/For.vue";
import If from "./components/If.vue";
import Else from "./components/Else.vue";
import Print from "./components/Print.vue";

export default {
   name: "App",
   setup() {
      const listNodes = readonly([
         {
            name: "Number",
            item: "Number",
            input: 0,
            output: 1,
         },
         {
            name: "Add",
            item: "Add",
            input: 2,
            output: 1,
         },
         {
            name: "Sub",
            item: "Sub",
            input: 2,
            output: 1,
         },
         {
            name: "Multiply",
            item: "Multiply",
            input: 2,
            output: 1,
         },
         {
            name: "Divide",
            item: "Divide",
            input: 2,
            output: 1,
         },
         {
            name: "Assignation",
            item: "Assignation",
            input: 1,
            output: 1,
         },
         {
            name: "For",
            item: "For",
            input: 1,
            output: 1,
         },
         {
            name: "If",
            item: "If",
            input: 1,
            output: 1,
         },
         {
            name: "Else",
            item: "Else",
            input: 1,
            output: 1,
         },
         {
            name: "Print",
            item: "Print",
            input: 1,
            output: 1,
         },
      ]);

      const editor = shallowRef({});
      const dialogVisible = ref(false);
      const dialogData = ref({});
      const internalInstance = getCurrentInstance();
      internalInstance.appContext.app._context.config.globalProperties.$df = editor;
      const Vue = {version: 3, h, render};
      const {dispatch} = useStore();

      const drag = (ev) => {
         if (ev.type === "touchstart") {
            mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute("data-node");
         } else {
            ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
         }
      };

      const drop = (ev) => {
         if (ev.type === "touchend") {
            var parentdrawflow = document.elementFromPoint(mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
            if (parentdrawflow != null) {
               addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
            }
            mobile_item_selec = "";
         } else {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("node");
            addNodeToDrawFlow(data, ev.clientX, ev.clientY);
         }
      };
      const allowDrop = (ev) => {
         ev.preventDefault();
      };

      const addNodeToDrawFlow = (name, pos_x, pos_y) => {
         pos_x =
            pos_x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) -
            editor.value.precanvas.getBoundingClientRect().x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom));
         pos_y =
            pos_y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) -
            editor.value.precanvas.getBoundingClientRect().y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom));

         const nodeSelected = listNodes.find((ele) => ele.item == name);
         assignDefaultValues(nodeSelected, name, pos_x, pos_y);
      };

      const assignDefaultValues = (nodeSelected, name, pos_x, pos_y) => {
         if (nodeSelected.name == "Add" || nodeSelected.name == "Sub" || nodeSelected.name == "Multiply" || nodeSelected.name == "Divide") {
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {Number1: 0, Number2: 0}, name, "vue");
         } else if (nodeSelected.name == "Number") {
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {Number: 0}, name, "vue");
         } else {
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {}, name, "vue");
         }
      };

      const assignValues = (data) => {
         const input = editor.value.getNodeFromId(data.input_id);
         const output = editor.value.getNodeFromId(data.output_id);

         if (data.input_class == "input_1") {
            editor.value.updateNodeDataFromId(data.input_id, {Number1: parseInt(output.data.Number), Number2: input.data.Number2});
            dispatch("setOperationAction", {id: data.input_id, value: {Number1: parseInt(output.data.Number), Number2: parseInt(input.data.Number2)}});
         } else if (data.input_class == "input_2") {
            editor.value.updateNodeDataFromId(data.input_id, {Number1: input.data.Number1, Number2: parseInt(output.data.Number)});
            dispatch("setOperationAction", {id: data.input_id, value: {Number1: parseInt(input.data.Number1), Number2: parseInt(output.data.Number)}});
         }
      };
      const updateValues = (id) => {
         const input = editor.value.getNodeFromId(id);
         const {
            outputs: {
               output_1: {connections},
            },
         } = input;
         if (connections.length == 1 && input.class == "Number") {
            const {node, output} = connections[0];
            const expression = editor.value.getNodeFromId(node);
            if (output == "input_1") {
               console.log(expression);
               editor.value.updateNodeDataFromId(node, {Number1: parseInt(input.data.number), Number2: expression.data.Number2});
               dispatch("setOperationAction", {id: node, value: {Number1: parseInt(input.data.number), Number2: parseInt(expression.data.Number2)}});
            } else if (output == "input_2") {
               editor.value.updateNodeDataFromId(node, {Number1: expression.data.Number1, Number2: parseInt(input.data.number)});
               dispatch("setOperationAction", {id: node, value: {Number1: parseInt(expression.data.Number1), Number2: parseInt(input.data.number)}});
            }
         }
      };
      onMounted(() => {
         var id = document.getElementById("drawflow");
         editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
         editor.value.start();

         editor.value.on("nodeCreated", (id) => {
            const typeNode = editor.value.getNodeFromId(id).class;
            if (typeNode == "Number") {
               dispatch("setNumberAction", {id: id, value: 0});
            } else if (typeNode == "Add" || typeNode == "Sub" || typeNode == "Multiply" || typeNode == "Divide") {
               dispatch("setOperationAction", {id: id, value: {Number1: 0, Number2: 0}});
            }
         });

         editor.value.on("nodeRemoved", (id) => {
            dispatch("deleteNumberAction", {id: id});
            dispatch("deleteOperationAction", {id: id});
         });

         editor.value.on("nodeDataChanged", (dataNode) => {
            updateValues(dataNode);
         });

         editor.value.on("connectionCreated", (dataNode) => {
            assignValues(dataNode);
         });

         editor.value.on("connectionRemoved", (dataNode) => {
            removeValues(dataNode);
         });

         editor.value.registerNode("Number", <Number />, {}, {});
         editor.value.registerNode("Add", <Operation title="Add" />, {}, {});
         editor.value.registerNode("Sub", <Operation title="Sub" />, {}, {});
         editor.value.registerNode("Multiply", <Operation title="Multiply" />, {}, {});
         editor.value.registerNode("Divide", <Operation title="Divide" />, {}, {});
         editor.value.registerNode("Assignation", <Assignation />, {}, {});
         editor.value.registerNode("For", <For />, {}, {});
         editor.value.registerNode("If", <If />, {}, {});
         editor.value.registerNode("Else", <Else />, {}, {});
         editor.value.registerNode("Print", <Print />, {}, {});
      });

      const removeValues = (data) => {
         const input = editor.value.getNodeFromId(data.input_id);
         if (data.input_class == "input_1") {
            editor.value.updateNodeDataFromId(data.input_id, {Number1: 0, Number2: input.data.Number2});
            dispatch("setOperationAction", {id: data.input_id, value: {Number1: 0, Number2: parseInt(input.data.Number2)}});
         } else if (data.input_class == "input_2") {
            editor.value.updateNodeDataFromId(data.input_id, {Number1: input.data.Number1, Number2: 0});
            dispatch("setOperationAction", {id: data.input_id, value: {Number1: parseInt(input.data.Number1), Number2: 0}});
         }
      };

      const generatePythonCode = (e) => {
         var exportdata = editor.value.export();
         console.log(exportdata);
      };

      return {listNodes, drag, drop, allowDrop, dialogVisible, dialogData, generatePythonCode, internalInstance};
   },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
#app {
   font-family: "Roboto", sans-serif;
   text-align: center;
   color: #050505;
   font-size: 13px;
   text-align: initial;
   width: 100vw;
   height: 100vh;
   padding: 0px;
   margin: 0px;
   background: #2b2c30;
   background-size: 20px 20px;
   background-image: radial-gradient(#494949 1px, transparent 1px);
}
#drawflow {
   box-sizing: border-box;
   width: 100%;
   height: 95%;

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
   /* border-radius: 8px;
    border: 2px solid #000000; */
   display: block;
   height: 40px;
   line-height: 40px;
   margin: 10px 0px;
   cursor: move;
   text-align: center;
}

.drawflow .drawflow-node {
   border-radius: 8px;
   background: #181818;
   border: 2px solid #494949;
   color: white;
   min-width: 250px;
}

.drawflow .drawflow-node.selected {
   background: #181818;
   border: 2px solid rgb(241, 241, 241);
}

.drawflow .drawflow-node .drawflow_content_node input,
.drawflow .drawflow-node .drawflow_content_node .el-select,
.drawflow .drawflow-node .drawflow_content_node button {
   width: 100%;
}
</style>
