"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const Particle = () => {
  const customInit = useCallback(async (engine:  Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {
    // Можно оставить пустым
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="particles"
      init={customInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: true }, // важно для встраивания в секцию
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff", // светло-розовый (мягкий, не яркий)
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.3, // чуть прозрачнее
            width: 1,      // тоньше линии
          },
          collisions: {
            enable: true,
          },
          move: {
            enable: true,
            direction: "none", // убираем направленное движение — естественнее
            outModes: {
              default: "bounce",
            },
            random: true,
            straight: false,
            speed: 0.8, // чуть медленнее
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 90, // немного меньше частиц — чище
          },
          opacity: {
            value: 0.6,
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: 0.2,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 }, // чуть мельче
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Particle;