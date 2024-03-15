"use client";

import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import {
  useExternalScript,
  useExternalScripts,
  useExternalScriptsInOrder,
  useExternalScriptsInOrderStrict,
  useSequentialScriptLoader,
} from "../../func/useScript"; // Adjust the path as needed
import { Container, statusColor } from "./blockly.styled";

//import './toolbox.xml'; // Your Blockly toolbox definition

declare var Blockly: any;
declare var ContinuousToolbox: any;
declare var ContinuousFlyout: any;
declare var ContinuousMetrics: any;

// @ts-ignore
// https://github.com/google/blockly-samples/tree/master/plugins/continuous-toolbox
//import { ContinuousToolbox, ContinuousFlyout, ContinuousMetrics } from '@blockly/continuous-toolbox'; // not working

const blocklyVersion = "blockly";

const scripts = [
  `/p003_polyade/lib/${blocklyVersion}/blockly_compressed.js`,
  `/p003_polyade/lib/${blocklyVersion}/blocks_compressed.js`,
  `/p003_polyade/lib/${blocklyVersion}/javascript_compressed.js`,
  `/p003_polyade/lib/${blocklyVersion}/python_compressed.js`,
  `/p003_polyade/lib/${blocklyVersion}/msg/en.js`,
  `/p003_polyade/lib/${blocklyVersion}/plugin/continuous-toolbox/index.js`, // from npm install @blockly/continuous-toolbox --save -> node_modules/@blockly/continuous-toolbox
];

// import '@/app/base/(p003_polyade)/polyade/lib/blockly/blockly_compressed.js';
// import '@/app/base/(p003_polyade)/polyade/lib/blockly/blocks_compressed.js';
// import '@/app/base/(p003_polyade)/polyade/lib/blockly/javascript_compressed.js';
// import '@/app/base/(p003_polyade)/polyade/lib/blockly/msg/en.js';
// import '@/app/base/(p003_polyade)/polyade/lib/blockly/plugin/continuous-toolbox/index.js';

const BlocklyTest = ({ blocklyDivRef, workspaceRef, size }: any) => {
  //const status = useExternalScript('/p003_polyade/lib/blockly/blockly_compressed.js');
  // The useExternalScripts hook is usually designed to load an array of scripts sequentially. It will only load the next script once the previous one has finished loading.
  // This is useful when you have dependencies between scripts, or when you want to ensure scripts are loaded in a specific order.
  // However, the current implementation loads them in parallel but only sets the status to ready once all scripts are loaded.
  // Ensure that the loading order doesn't affect the dependencies between the scripts.
  // If strict sequential loading is necessary (where one script must fully load before starting to load the next), you may need to adjust the loading mechanism to wait for each script to load before proceeding to the next.
  // If you need to load scripts in a specific order, you can use multiple useExternalScript hooks or modify the useExternalScripts hook to load scripts sequentially.
  // const status = useExternalScriptsInOrder([
  //   '/p003_polyade/lib/blockly/blockly_compressed.js',
  //   '/p003_polyade/lib/blockly/blocks_compressed.js',
  //   '/p003_polyade/lib/blockly/javascript_compressed.js',
  //   '/p003_polyade/lib/blockly/msg/en.js'
  // ]);

  const status = useSequentialScriptLoader(scripts, 1); // Adjust the delay as needed
  //const status = 'ready';

  //const [toolboxXML, setToolboxXML] = useState<Document | null>(null);
  const [toolboxXML, setToolboxXML] = useState<Element | null>(null);

  //const blocklyDivRef = useRef<HTMLDivElement>(null);
  //const workspaceRef = useRef<Blockly.WorkspaceSvg>();

  const [dynamicContent, setDynamicContent] = useState("");
  //const [continuous_toolbox_ready, setContinuousToolboxReady] = useState(false);
  //const [continuousToolbox, setContinuousToolbox] = useState();
  //const [continuousFlyout, setContinuousFlyout] = useState();
  //const [continuousMetrics, setContinuousMetrics] = useState();

  useEffect(() => {
    fetch("/p003_polyade/toolbox/toolbox.xml")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        // Here, we ensure we're extracting the <xml> element Blockly expects
        const toolboxElement = xmlDoc.getElementsByTagName("xml")[0];
        if (toolboxElement) {
          setToolboxXML(toolboxElement);
        } else {
          console.error("Toolbox XML is missing <xml> element");
        }
      })
      .catch((error) => console.error("Error loading the toolbox XML:", error));

    // Dynamically import the module
    import("./DynamicModuleTest").then((module) => {
      // Use the imported module's exports
      const varText = module.dynamicVar;
      const funcText = module.dynamicFunction();
      const classText = module.DynamicClass.sayHello();

      setDynamicContent(`${varText}, ${funcText}, ${classText}`);

      console.log("Dynamic module:", module);
      console.log("Dynamic module exports:", varText, funcText, classText);
    });

    // X
    // Dynamically import the module
    // import('@/app/base/(p003_polyade)/polyade/lib/blockly/plugin/continuous-toolbox/index.js').then((module: any) => {
    //   // Use the imported module's exports
    //   console.log('Dynamic module:', module);
    //   const { ContinuousToolbox, ContinuousFlyout, ContinuousMetrics } = module;
    //   console.log('ContinuousToolbox:', ContinuousToolbox);
    //   console.log('ContinuousFlyout:', ContinuousFlyout);
    //   console.log('ContinuousMetrics:', ContinuousMetrics);
    //   setContinuousToolbox(new ContinuousToolbox());
    //   setContinuousFlyout(new ContinuousFlyout());
    //   setContinuousMetrics(new ContinuousMetrics());
    //   setContinuousToolboxReady(true);
    // });
  }, []);

  useEffect(() => {
    //if (!blocklyDivRef.current) return;

    // if status === 'ready', all scripts are loaded, you can run your code here
    if (status === "ready" && toolboxXML && typeof Blockly !== "undefined") {
      const options = {
        /* Blockly options */
        // plugins: {
        //   toolbox: ContinuousToolbox,
        //   flyoutsVerticalToolbox: ContinuousFlyout,
        //   metricsManager: ContinuousMetrics
        // },
        //toolbox: document.getElementById('toolbox')
        //toolbox
        // Ensure Blockly.inject receives a DOM element for the toolbox
        toolbox: toolboxXML,
        //toolbox: document.getElementById('toolbox'),
        //media: './node_modules/blockly/media/',
        renderer: "zelos",
        theme: Blockly.Themes.Zelos,
        plugins: {
          toolbox: ContinuousToolbox,
          flyoutsVerticalToolbox: ContinuousFlyout,
          metricsManager: ContinuousMetrics,
        },
      };

      // X
      // const loadBlockly = async() => {
      //   const { ContinuousToolbox, ContinuousFlyout, ContinuousMetrics } = await import('@/app/base/(p003_polyade)/polyade/lib/blockly/plugin/continuous-toolbox/index.js');
      // }
      //loadBlockly();

      // Convert the XML definition into a DOM element
      //const toolbox = document.getElementById('toolbox');

      // Ensure the Blockly types are available for TypeScript
      // Now that Blockly and its extensions are loaded, initialize Blockly workspace
      console.log("injecting blocklyDiv...", toolboxXML);
      // const workspace = Blockly.inject('blocklyDiv', options);
      const workspace = Blockly.inject(blocklyDivRef.current, options);

      workspaceRef.current = workspace;

      // Further Blockly initialization code...
      // Setup Blockly to generate JavaScript code
      // Function declarations are not allowed inside blocks in strict mode when targeting 'ES3' or 'ES5'. Modules are automatically in strict mode.
      // Modules are automatically in strict mode," typically occurs in TypeScript or JavaScript when you try to declare a function within a block (like an if statement, for example) while targeting ES3 or ES5, where such declarations are not allowed due to strict mode constraints.
      // In ECMAScript 6 (ES6) and later, block-scoped functions are allowed and work as expected due to the introduction of block scoping with let and const. However, when transpiling to ES5 or ES3, this can cause issues because those environments do not support block-scoped function declarations in the same way.
      //function updateWorkspaceCode() {
      const updateWorkspaceCode = () => {
        if (Blockly.JavaScript) {
          //const code = Blockly.JavaScript.workspaceToCode(workspace);
          const code = Blockly.Python.workspaceToCode(workspace);
          console.log(code); // For demonstration, log the generated code to the console
          // You can display this code in the UI or use it in other ways as needed
        } else {
          console.error("Blockly.JavaScript generator not available");
        }
      };

      // Listen for Blockly events that indicate a potential toolbox close action
      // const onWorkspaceChange = (event) => {
      //   // Check for events that should trigger a workspace refresh.
      //   // This is a simplistic approach; your actual implementation may vary
      //   // depending on the specific actions that lead to the scrollbar issue.
      //   if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT || event.type === Blockly.Events.CLICK) {
      //     // Call render after a short delay to ensure it happens after the toolbox has closed
      //     // Delay Usage: The setTimeout is used to add a slight delay before calling render(), ensuring that any animations or UI updates related to the toolbox closing are completed. This delay might need adjustment based on your application's specifics.
      //     setTimeout(() => {
      //       workspace.render();
      //     }, 100); // Adjust delay as necessary
      //   }
      // };

      // Listen for changes that may indicate the need to adjust scrollbars
      const adjustScrollbars = () => {
        // Attempt to directly manipulate or refresh the scrollbar state
        // This example assumes a method like `resizeContents` exists and is effective.
        // You may need to explore Blockly's API for the correct method based on your version.
        if (workspace) {
          workspace.resizeContents(); // Adjust this method as necessary
        }
      };

      const hideScrollbar = () => {
        const scrollbars = document.querySelectorAll(".blocklyScrollbar");
        scrollbars.forEach((scrollbar) => {
          (scrollbar as any).style.display = "none"; // Hide scrollbar
        });
      };

      // Setup event listener to handle workspace changes
      //const onWorkspaceChange = (event: Blockly.Events.Abstract) => {
      const onWorkspaceChange = (event: any) => {
        console.log("Event:", event);
        // Assuming closing the toolbox triggers a UI event, adjust according to your needs
        //if (event.type === Blockly.Events.UI) {
        if (event.type === "toolbox_item_select") {
          // //const uiEvent = event as Blockly.Events.Ui;
          // const uiEvent = event as any;
          // if (uiEvent.element === 'category' && !uiEvent.newValue) {
          //   // Toolbox category was deselected, implying it was closed. Adjust logic as needed.
          //   setTimeout(() => {
          //     //workspaceRef.current?.render();
          //     workspace.render();
          //   }, 100); // Short delay to ensure the UI has finished updating
          // }
          //
          // if (event.isUiEvent) {
          //   setTimeout(() => {
          //     //hideScrollbar();
          //     //adjustScrollbars();
          //     //workspace.render();
          //   }, 100);
          // }
        }
      };

      // Listen for changes in the workspace and update the generated code
      workspace.addChangeListener(updateWorkspaceCode);

      // Add the event listener to the workspace
      workspace.addChangeListener(onWorkspaceChange);
      //workspaceRef.current.addChangeListener(onWorkspaceChange);

      // Call once initially to display the starting code if needed
      updateWorkspaceCode();
    } else if (status === "error") {
      // Handle the error case
      console.error("Error loading scripts");
    }

    // Clean up workspace on component unmount
    // if (workspaceRef.current) {
    //   workspaceRef.current.dispose();
    // }
  }, [status, toolboxXML]);

  if (status === "loading") return <div>Loading scripts...</div>;
  if (status === "error") return <div>Error loading scripts.</div>;
  console.log(blocklyDivRef);
  return (
    <>
      {/* {status === 'loading' && <p>Loading Blockly...</p>} */}
      {status === "ready" && (
        // <BlocklyDivWrapper>
        <Container size={size.height}>
          <BlocklyDiv ref={blocklyDivRef} size={size} />
        </Container>

        // {/* <div id="blocklyDiv" style={{ height: '480px', width: '600px' }}></div> */}
        // {/* Your Blockly toolbox definition here */}
        // {/* Blockly workspace will be injected here */}
        // </BlocklyDivWrapper>
      )}
    </>
  );
};

export default BlocklyTest;

const BlocklyDiv = styled.div<any>`
  width: ${(props) => props.size.width};
  height: ${(props) => props.size.height};
  background-color: ${statusColor};
  width: 100%;
`;

const BlocklyDivWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  border-radius: 0 0 10px 10px;
`;

// const Container = styled.div`
//   background-color: #e9ebfe;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 100%;
//   margin: 2rem;
//   padding: 2rem;
// `;
