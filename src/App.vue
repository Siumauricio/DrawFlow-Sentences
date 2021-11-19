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
                     <button v-on:click="validateSemantic($event)" type="button" class="btn btn-success mb-0">Validate Semantic</button>
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
import {h, getCurrentInstance, render, readonly, ref, onMounted, shallowRef, onBeforeUnmount} from "vue";
import NodeClick from "./components/NodeClick.vue";
import Drawflow from "drawflow";
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
      const num1 = ref(25);
      const num2 = ref(50);
      const Vue = {version: 3, h, render};

      const cache = {};

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

      function makeid(length) {
         var result = "";
         var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
         var charactersLength = characters.length;
         for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
         return result;
      }
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
            console.log(cache[input.id]);
            cache[input.id].refA1.innerText = output.data.Number;

            editor.value.updateNodeDataFromId(data.input_id, {Number1: parseInt(output.data.Number), Number2: input.data.Number2});
         } else if (data.input_class == "input_2") {
            cache[input.id].refA2.innerText = output.data.Number;
            editor.value.updateNodeDataFromId(data.input_id, {Number1: input.data.Number1, Number2: parseInt(output.data.Number)});
            // num2.value = output.data.Number;
         }
      };

      onMounted(() => {
         var id = document.getElementById("drawflow");
         editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
         editor.value.start();
         editor.value.on("connectionCreated", (dataNodes) => {
            // console.log("Conexion creada:", assignValues);
            console.log(editor.value.getNodeFromId(dataNodes.input_id));
            assignValues(dataNodes);

            console.log(editor.value.getNodeFromId(dataNodes.input_id));
         });
         editor.value.on("connectionRemoved", (removeValues) => {
            console.log("connectionRemoved", removeValues);
         });

         editor.value.on("nodeDataChanged", (id) => {
            console.log("nodeDataChanged", id);
            console.log(cache);
            updateValues(id);
            const nodoActualiza = editor.value.getNodeFromId(id);
            console.log(nodoActualiza);
         });

         editor.value.on("nodeCreated", (id) => {
            console.log("nodeCreated", id);
            console.log(editor.value.getNodeFromId(id));

            let jsonNode = editor.value.getNodeFromId(id);

            console.log(jsonNode.name);

            switch (jsonNode.name) {
               case "Add":
               case "Sub":
                  propertyClassAdd(jsonNode);
                  break;
               case "Number":
                  break;
            }
            //     num1.value = editor.value.getNodeFromId(id).data.Number1;
            //     num2.value = editor.value.getNodeFromId(id).data.Number2;
            //     // const clase = editor.value.getNodeFromId(id).clase;
            //     // console.log(clase);
            //     // Operation.unix();
         });
         //  editor.value.addNode("github", 1, 3, 100, 50, "romb", {}, "<b>Hey</b>");

         editor.value.registerNode("Number", <Number editor={editor} />, {}, {});
         editor.value.registerNode("Add", <Operation title="Add" editor={editor} num1={num1.value} num2={num2.value} />, {}, {});

         // editor.value.registerNode("Sub", <Operation title="Sub" editor={editor} />, {}, {});
         //  editor.value.registerNode('Multiply', <Operation title="Multiply"/>, {}, {});
         //  editor.value.registerNode('Divide', <Operation title="Divide"/>, {}, {});
         //  editor.value.registerNode('Assignation', <Assignation />, {}, {});
         //  editor.value.registerNode('For', <For />, {}, {});
         //  editor.value.registerNode('If', <If />, {}, {});
         //  editor.value.registerNode('Else', <Else />, {}, {});
         //  editor.value.registerNode('Print', <Print />, {}, {});
      });

      const updateValues = (id) => {
         const input = editor.value.getNodeFromId(id);
         const {
            outputs: {
               output_1: {connections},
            },
         } = input;
         if (connections.length == 1) {
            // Ostia razon
            const {node, output} = connections[0];
            const expression = editor.value.getNodeFromId(node);

            console.log("****************");
            console.log(input);
            console.log(expression);

            if (output == "input_1") {
               cache[expression.id].refA1.innerText = input.data.Number;
               editor.value.updateNodeDataFromId(node, {Number1: parseInt(input.data.Number1), Number2: expression.data.Number2});
               //  number1.value = parseInt(input.data.number);
            } else if (output == "input_2") {
               console.log(expression.id);

               cache[expression.id].refA2.innerText = input.data.Number;
               //cache[input.id].refA1.innerText = output.data.Number;
               editor.value.updateNodeDataFromId(node, {Number1: expression.data.Number1, Number2: parseInt(input.data.number)});

               //  number2.value = parseInt(input.data.number);
            }

            // evaluateExpressions(expression.class);
         }
      };

      const setValues = (id, dataInputs) => {
         const input = editor.value.getNodeFromId(id);
         const {
            outputs: {
               output_1: {connections},
            },
         } = input;
         if (connections.length == 1) {
            const {node, output} = connections[0];
            const expression = editor.value.getNodeFromId(node);
            if (output == "input_1") {
               editor.value.updateNodeDataFromId(node, {Number1: parseInt(dataInputs[0]), Number2: expression.data.Number2});
               //  number1.value = parseInt(input.data.number);
            } else if (output == "input_2") {
               editor.value.updateNodeDataFromId(node, {Number1: expression.data.Number1, Number2: parseInt(dataInputs[1])});
               //  number2.value = parseInt(input.data.number);
            }
            // evaluateExpressions(expression.class);
         }
      };

      const propertyClassAdd = (jsonNode) => {
         const content = document.getElementById(`node-${jsonNode.id}`).querySelector(":scope > [class='drawflow_content_node']");
         const h2 = document.createElement("h2");

         h2.innerHTML = `Node ${jsonNode.id}`;

         content.appendChild(h2);

         let dataNode = document.createElement("div");

         let result = document.createElement("input");

         result.setAttribute("class", "form-control");
         result.setAttribute("type", "number");
         result.setAttribute("v-model", "result");
         result.setAttribute("disabled", "");

         dataNode.appendChild(result);

         let a1 = document.createElement("a");
         a1.innerHTML = "a1";

         let a2 = document.createElement("a");
         a2.innerHTML = "a2";

         let span = document.createElement("span");
         span.innerText = "Number 1: ";
         span.appendChild(a1);

         dataNode.appendChild(span);

         dataNode.appendChild(document.createElement("br"));

         span = document.createElement("span");
         span.innerText = "Number 2: ";

         span.appendChild(a2);

         dataNode.appendChild(span);

         content.appendChild(dataNode);

         cache[jsonNode.id] = {refA1: a1, refA2: a2};

         console.log(cache);

         //jsonNode.data["Unix"] = "Unix";

         //setValues(jsonNode.id, [50, 70]);
      };

      // this.$internalInstance.on('connectionCreated',(event) => {
      //   console.log(event)
      // })

      const generatePythonCode = (e) => {
         var exportdata = editor.value.export();
         console.log(exportdata);
      };

      const validateSemantic = (e) => {};

      return {listNodes, drag, drop, allowDrop, dialogVisible, dialogData, generatePythonCode, validateSemantic, internalInstance};
   },
   methods: {
      info(ev) {
         console.log(ev);
      },
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
