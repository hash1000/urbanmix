import colors from '../colors';

type ButtonType = 'primary' | 'secondary' | 'warning' | 'info';

export const getContainedButtonStyles = (type: ButtonType) => {
  return {
    borderColor: colors[`${type}-50`],

    ':hover': {
      backgroundColor: colors[`${type}-600`],
    },

    ':active': {
      backgroundColor: colors[`${type}-700`],
    },

    ':focus': {
      outlineColor: colors[`${type}-200`],
    },

    '&.Mui-disabled': {
      backgroundColor: colors[`${type}-200`],
      color: 'white',
    },
  };
};

export const getOutlinedButtonStyles = (type: ButtonType) => {
  return {
    borderColor: colors[`${type}-200`],

    ':hover': {
      color: colors[`${type}-600`],
      borderColor: colors[`${type}-400`],
      backgroundColor: 'white',
    },

    ':active': {
      borderColor: colors[`${type}-400`],
    },

    ':focus': {
      outlineColor: colors[`${type}-200`],
      color: colors[type],
    },

    '&.Mui-disabled': {
      borderColor: colors[`${type}-200`],
      color: colors[`${type}-200`],
    },
  };
};
