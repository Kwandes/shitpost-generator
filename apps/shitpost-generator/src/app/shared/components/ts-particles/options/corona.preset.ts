export const coronaPreset = {
  fullScreen: {
    enable: true,
    zIndex: 1,
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'bubble',
        parallax: {
          enable: false,
          force: 60,
          smooth: 10,
        },
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 50,
        duration: 2,
        opacity: 1,
        size: 40,
        speed: 3,
      },
      grab: {
        distance: 400,
        lineLinked: {
          opacity: 1,
        },
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    lineLinked: {
      color: '#323031',
      distance: 150,
      enable: false,
      opacity: 0.4,
      width: 1,
    },
    move: {
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
      bounce: false,
      direction: 'none',
      enable: true,
      out_mode: 'bounce',
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 170,
    },
    opacity: {
      animation: {
        enable: false,
        minimumValue: 0.1,
        speed: 1,
        sync: false,
      },
      random: false,
      value: 1,
    },
    shape: {
      character: {
        fill: false,
        font: 'Verdana',
        style: '',
        value: '*',
        weight: '400',
      },
      image: {
        height: 32,
        replace_color: true,
        src: 'https://particles.js.org/images/sars-cov-2.png',
        width: 32,
      },
      polygon: {
        nb_sides: 5,
      },
      stroke: {
        color: '#000000',
        width: 0,
      },
      type: 'image',
    },
    size: {
      animation: {
        enable: false,
        minimumValue: 0.1,
        speed: 40,
        sync: false,
      },
      random: false,
      value: 1,
    },
  },
  polygon: {
    draw: {
      enable: false,
      lineColor: '#ffffff',
      lineWidth: 0.5,
    },
    move: {
      radius: 10,
    },
    scale: 1,
    type: 'none',
    url: '',
  },
  retina_detect: true,
};
