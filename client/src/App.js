import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import Foreground from './Foreground';

const App = () => {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadSlim(engine)
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          "background": {
            "color": {
              "value": "#d3d3d3"
            }
          },
          "particles": {
            "number": {
              "value": 180,
              "density": {
                "enable": true,
                "area": 800
              }
            },
            "color": {
              "value": [
                "#ECB22E",
                "#EC822E"
              ]
            },
            "shape": {
              "type": "circle"
            },
            "opacity": {
              "value": 0.9
            },
            "size": {
              "value": { "min": 1, "max": 8 }
            },
            "links": {
              "enable": true,
              "distance": 150,
              "color": "#808080",
              "opacity": 0.3,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 2,
              "direction": "none",
              "random": false,
              "straight": false,
              "outModes": "out"
            }
          },
          "interactivity": {
            "events": {
              "onHover": {
                "enable": true,
                "mode": "grab"
              },
              "onClick": {
                "enable": true,
                "mode": "push"
              }
            },
            "modes": {
              "grab": {
                "distance": 120,
                "links": {
                  "opacity": 0.7
                }
              },
              "push": {
                "quantity": 5
              }
            }
          }
        }}
      />
      <Foreground />
      
    </>
  );
};
export default App;