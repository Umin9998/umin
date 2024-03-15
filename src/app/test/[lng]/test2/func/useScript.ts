// useScript.ts
import { useState, useEffect } from 'react';

type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

const useExternalScript = (src: string): ScriptStatus => {
  const [status, setStatus] = useState<ScriptStatus>(src ? 'loading' : 'idle');

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);

      const setAttributeFromEvent = (event: Event) => {
        script.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
      };

      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    } else {
      setStatus(script.getAttribute('data-status') as ScriptStatus);
    }

    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };

    script.addEventListener('load', setStateFromEvent);
    script.addEventListener('error', setStateFromEvent);

    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent);
        script.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src]);

  return status;
};

// A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.ts(2355) // type ScriptStatus = "idle" | "loading" | "ready" | "error"
// The TypeScript error you're encountering, "A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.ts(2355)," usually occurs when a function promises to return a value of a specific type but fails to do so in one or more of its code paths. This can happen if there's a conditional branch that doesn't end with a return statement or if the function exits without a return statement at all.
// However, in the context of the provided useExternalScripts hook where ScriptStatus is the return type, the issue seems to be a misunderstanding, as the hook itself looks correctly structured to always return a ScriptStatus value. The hook's logic does not directly return values based on conditional logic but rather sets state. The mistake or oversight might lie elsewhere in your implementation or in how you're interpreting the TypeScript error message.
// const useExternalScripts = (scripts: string[]): ScriptStatus => {
//   const [status, setStatus] = useState<ScriptStatus>('idle');

//   useEffect(() => {
//     setStatus('loading');
//     let loadedScripts = 0;

//     scripts.forEach((scriptUrl) => {
//       let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement;
//       if (!script) {
//         script = document.createElement('script');
//         script.src = scriptUrl;
//         script.async = true;
//         document.body.appendChild(script);

//         const onScriptLoad = () => {
//           loadedScripts += 1;
//           if (loadedScripts === scripts.length) {
//             setStatus('ready');
//           }
//         };

//         const onScriptError = () => {
//           console.error(`Error loading script: ${scriptUrl}`);
//           setStatus('error');
//         };

//         script.addEventListener('load', onScriptLoad);
//         script.addEventListener('error', onScriptError);

//         return () => {
//           script.removeEventListener('load', onScriptLoad);
//           script.removeEventListener('error', onScriptError);
//         };
//       } else {
//         // Script already exists in the document
//         loadedScripts += 1;
//         if (loadedScripts === scripts.length) {
//           setStatus('ready');
//         }
//       }
//     });
//   }, [scripts]);
// };

//  The useExternalScripts hook is usually designed to load an array of scripts sequentially. However, the current implementation loads them in parallel but only sets the status to ready once all scripts are loaded. Ensure that the loading order doesn't affect the dependencies between the scripts. If strict sequential loading is necessary (where one script must fully load before starting to load the next), you may need to adjust the loading mechanism to wait for each script to load before proceeding to the next.
const useExternalScripts = (scripts: string[]): ScriptStatus => {
  const [status, setStatus] = useState<ScriptStatus>('idle');

  useEffect(() => {
    if (scripts.length === 0) {
      // If no scripts are provided, set the status to idle
      setStatus('idle');
      // Immediate Return for Empty Scripts Array: This handles a potential edge case where no scripts are passed to the hook, setting the status to 'idle'.
      return;
    }

    setStatus('loading');
    let loadedScripts = 0;

    scripts.forEach((scriptUrl) => {
      let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.src = scriptUrl;
        // The scripts are loaded with async=true, which means they are fetched in parallel with the HTML parsing and executed as soon as they are available. This is generally fine for script files that do not depend on each other or on the DOM being fully loaded. If your Blockly initialization code depends on DOM elements, ensure it runs after the DOM is fully ready.
        script.async = true;
        document.body.appendChild(script);

        const onScriptLoad = () => {
          loadedScripts += 1;
          if (loadedScripts === scripts.length) {
            setStatus('ready');
          }
        };

        const onScriptError = () => {
          console.error(`Error loading script: ${scriptUrl}`);
          setStatus('error');
        };

        script.addEventListener('load', onScriptLoad);
        // Streamlined Error Handling: Simplified the error handling in the event listeners to directly set the status to 'error' without logging, assuming consumers of the hook might handle logging or user feedback based on the status.
        script.addEventListener('error', () => setStatus('error'));

        return () => {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptError);
        };
      } else {
        // Ensuring Script Tags Are Unique: The code checks if the script already exists before attempting to add it, which prevents duplicate script loading but also counts already loaded scripts towards the 'ready' status.
        // If the script is already in the document, consider it loaded
        loadedScripts += 1;
        if (loadedScripts === scripts.length) {
          setStatus('ready');
        }
      }
    });
  }, [scripts]);

  return status;
};

const useExternalScriptsInOrder = (scripts: string[]): ScriptStatus => {
  const [status, setStatus] = useState<ScriptStatus>('idle');
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);

  useEffect(() => {
    // Exit early if no scripts are provided or all scripts have been loaded
    if (scripts.length === 0 || currentScriptIndex >= scripts.length) {
      setStatus('ready');
      return;
    }

    setStatus('loading');

    const loadScript = (scriptUrl: string) => {
      let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          // Move to the next script
          const nextScriptIndex = currentScriptIndex + 1;
          setCurrentScriptIndex(nextScriptIndex);
          if (nextScriptIndex >= scripts.length) {
            setStatus('ready'); // All scripts loaded
          }
        };

        script.onerror = () => {
          console.error(`Error loading script: ${scriptUrl}`);
          setStatus('error');
        };
      } else {
        // Script is already in the document; assume it's loaded
        const nextScriptIndex = currentScriptIndex + 1;
        setCurrentScriptIndex(nextScriptIndex);
        if (nextScriptIndex >= scripts.length) {
          setStatus('ready'); // All scripts accounted for
        }
      }
    };

    loadScript(scripts[currentScriptIndex]);
  }, [scripts, currentScriptIndex]);

  return status;
};

const useExternalScriptsInOrderStrict = (scripts: string[]): ScriptStatus => {
  const [status, setStatus] = useState<ScriptStatus>('idle');

  useEffect(() => {
    const loadScript = async (scriptUrl: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if the script is already loaded
        let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement;
        if (!script) {
          script = document.createElement('script');
          script.src = scriptUrl;
          script.async = true;
          document.body.appendChild(script);

          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Script load error for ${scriptUrl}`));
        } else {
          // If script is already in the document, assume it's loaded
          resolve();
        }
      });
    };

    const loadScriptsSequentially = async () => {
      setStatus('loading');
      for (const scriptUrl of scripts) {
        try {
          await loadScript(scriptUrl);
        } catch (error) {
          console.error(error);
          setStatus('error');
          return;
        }
      }
      setStatus('ready');
    };

    if (scripts.length > 0) {
      loadScriptsSequentially();
    } else {
      setStatus('idle'); // No scripts to load
    }
  }, [scripts]);

  return status;
};

const useExternalScriptsInOrderStrict2 = (scripts: string[]): ScriptStatus => {
  const [status, setStatus] = useState<ScriptStatus>('idle');

  useEffect(() => {
    const loadScript = async (scriptUrl: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement;
        if (!script) {
          script = document.createElement('script');
          script.src = scriptUrl;
          script.async = true;
          document.body.appendChild(script);

          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load the script: ${scriptUrl}`));
        } else {
          // If the script is already in the document, assume it's loaded.
          resolve();
        }
      });
    };

    const loadScriptsSequentially = async () => {
      setStatus('loading');
      for (const scriptUrl of scripts) {
        try {
          await loadScript(scriptUrl);
        } catch (error) {
          console.error(error);
          setStatus('error');
          return;
        }
      }
      setStatus('ready');
    };

    loadScriptsSequentially();
  }, [scripts]);

  return status;
};

const loadScriptSequential = (src: string): Promise<ScriptStatus> => {
  return new Promise((resolve, reject) => {
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => resolve('ready');
      script.onerror = () => reject('error');
    } else {
      resolve('ready');
    }
  });
};

const useSequentialScriptLoader = (scripts: string[], delay: number = 0) => {
  const [currentScript, setCurrentScript] = useState<number>(0);
  const [status, setStatus] = useState<ScriptStatus>('idle');

  useEffect(() => {
    const loadNextScript = async () => {
      if (currentScript >= scripts.length) {
        setStatus('ready');
        return;
      }

      setStatus('loading');
      try {
        await loadScriptSequential(scripts[currentScript]);
        setTimeout(() => {
          setCurrentScript((prevScript) => prevScript + 1);
        }, delay);
      } catch (error) {
        setStatus('error');
      }
    };

    loadNextScript();
  }, [currentScript, scripts, delay]);

  return status;
};

export default useSequentialScriptLoader;

export {
  useExternalScript,
  useExternalScripts,
  useExternalScriptsInOrder,
  useExternalScriptsInOrderStrict,
  //useExternalScriptsInOrderStrict2,
  useSequentialScriptLoader
};
