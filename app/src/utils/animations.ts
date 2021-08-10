import {arrToObj} from './formatters';

export const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

export const scale = {
  from: {
    scale: 0.6,
  },
  to: {
    scale: 1,
  },
};

export const composeAnimations = (...args) => {
  const from = args.map(({from}) => from);
  const to = args.map(({to}) => to);
  return {
    from: arrToObj(from),
    to: arrToObj(to),
  };
};

export const reveseAnimation = animation => ({
  from: animation.to,
  to: animation.from,
});
