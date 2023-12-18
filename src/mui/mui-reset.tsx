import React from 'react';
import { LinkProps, createTheme } from '@mui/material';
import {
  NavLink as RouterLink,
  NavLinkProps as RouterLinkProps,
} from 'react-router-dom';

import colors from './colors';
import {
  getContainedButtonStyles,
  getOutlinedButtonStyles,
} from './utils/button-styles';

const fontFamily = "'Inter', sans-serif";

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  return (
    <RouterLink
      ref={ref}
      to={href}
      className={({ isActive, isPending }) =>
        isPending ? 'pending' : isActive ? 'active' : ''
      }
      end
      {...other}
    />
  );
});

const theme = createTheme({
  /* ---------- PALETTE ---------- */
  palette: {
    primary: {
      main: colors.primary,
      900: colors['primary-900'],
      800: colors['primary-800'],
      700: colors['primary-700'],
      600: colors['primary-600'],
      400: colors['primary-400'],
      300: colors['primary-300'],
      200: colors['primary-200'],
      100: colors['primary-100'],
      50: colors['primary-50'],
    },
    secondary: {
      main: colors.secondary,
      900: colors['secondary-900'],
      800: colors['secondary-800'],
      700: colors['secondary-700'],
      600: colors['secondary-600'],
      400: colors['secondary-400'],
      300: colors['secondary-300'],
      200: colors['secondary-200'],
      100: colors['secondary-100'],
      50: colors['secondary-50'],
    },
    info: {
      main: colors.info,
      900: colors['info-900'],
      400: colors['info-400'],
      300: colors['info-300'],
      200: colors['info-200'],
      100: colors['info-100'],
      50: colors['info-50'],
    },
    warning: {
      main: colors.warning,
      900: colors['warning-900'],
      800: colors['warning-800'],
      700: colors['warning-700'],
      600: colors['warning-600'],
      400: colors['warning-400'],
      300: colors['warning-300'],
      200: colors['warning-200'],
      100: colors['warning-100'],
      50: colors['warning-50'],
    },
  },

  /* ---------- TYPOGRAPHY ---------- */
  typography: {
    fontFamily,

    allVariants: {
      color: colors.info,
      fontFamily,
    },

    h1: {
      fontSize: '32px',
      fontWeight: '500',
      lineHeight: '40px',
    },
    h2: {
      fontSize: '28px',
      fontWeight: '500',
      lineHeight: '40px',
    },
    h3: {
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '32px',
    },

    body1: {
      fontSize: '18px',
    },
    body2: {
      fontSize: '16px',
    },
    caption: {
      fontSize: '14px',
    },
  },

  /* ---------- COMPONENTS ---------- */
  components: {
    /* ---------- BUTTON ---------- */
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },

    MuiIconButton: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },

    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },

      variants: [
        {
          props: { size: 'small' },
          style: {
            height: '30px',
            padding: '0 10px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '400',
          },
        },
      ],

      styleOverrides: {
        containedPrimary: getContainedButtonStyles('primary'),
        containedSecondary: getContainedButtonStyles('secondary'),
        containedWarning: getContainedButtonStyles('warning'),
        containedInfo: getContainedButtonStyles('info'),

        outlinedPrimary: getOutlinedButtonStyles('primary'),
        outlinedSecondary: getOutlinedButtonStyles('secondary'),
        outlinedWarning: getOutlinedButtonStyles('warning'),
        outlinedInfo: getOutlinedButtonStyles('info'),

        // TODO: change if there is separate style for text
        textPrimary: getOutlinedButtonStyles('primary'),
        textSecondary: getOutlinedButtonStyles('secondary'),
        textWarning: getOutlinedButtonStyles('warning'),
        textInfo: getOutlinedButtonStyles('info'),

        sizeSmall: {
          height: '36px',
          borderRadius: '6px',
          padding: '0 18px',
          fontSize: '14px',
        },
        sizeMedium: {
          height: '42px',
          borderRadius: '8px',
          padding: '0 24px',
          fontSize: '16px',
        },
        sizeLarge: {
          height: '48px',
          borderRadius: '8px',
          padding: '0 30px',
          fontSize: '18px',
          fontWeight: '400',
        },

        root: {
          boxShadow: 'none',
          border: '1px solid',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',

          ':hover': {
            boxShadow: 'none',
          },

          ':focus': {
            outline: '2px solid',
          },
        },
      },
    },

    /* ---------- TEXT FIELD ---------- */
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input, & input::placeholder': {
            fontSize: '16px',
            lineHeight: '16px',
          },

          '.MuiInputBase-sizeSmall': {
            '& input, & input::placeholder': {
              fontSize: '14px',
              lineHeight: '14px',
            },
          },

          '.MuiInputBase-root:not(.MuiInputBase-sizeSmall) input': {
            padding: '12px 14px',
          },

          '& fieldset': {
            borderRadius: '12px',
            borderColor: colors.stroke2,
            transition: 'border .2s',
          },

          '&:hover .MuiInputBase-root:not(.Mui-focused) fieldset': {
            borderColor: `${colors['primary-200']} !important`,
          },
        },
      },
    },

    /* ---------- TYPOGRAPHY COMPONENT ---------- */
    MuiTypography: {
      defaultProps: {
        fontFamily,
        color: colors.info,
      },
    },

    /* ---------- PAPER ---------- */
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0px 4px 18px rgba(221.05, 226.87, 232.69, 0.56)',
        },

        elevation2: {
          boxShadow: '0px 6px 24px rgba(221.05, 226.87, 232.69, 0.70)',
        },

        elevation3: {
          boxShadow: '0px 16px 40px rgba(181.22, 193.67, 206.13, 0.50)',
        },

        root: {
          borderRadius: '10px',

          '&.MuiPopover-paper': {
            borderRadius: '12px',
            border: `1px solid ${colors.stroke2}`,
          },
        },
      },
    },

    /* ---------- LIST ---------- */
    MuiList: {
      styleOverrides: {
        root: {
          padding: '12px 8px',
          minWidth: '250px',
        },
      },
    },

    /* ---------- MENU ITEM ---------- */
    MuiMenuItem: {
      defaultProps: {
        disableTouchRipple: true,
      },

      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '16px',

          '&:hover': {
            backgroundColor: colors.stroke,
          },

          '.MuiCheckbox-root, .MuiRadio-root': {
            padding: 0,
          },
        },
      },
    },

    /* ---------- TOOLTIP ---------- */
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: '10px',
          borderRadius: '6px',
          backgroundColor: colors.info,
          fontSize: '14px',
          fontWeight: '400',
        },

        arrow: {
          '&:before': {
            borderRadius: '2px',
            backgroundColor: colors.info,
          },
        },
      },
    },

    /* ---------- DIALOG ---------- */
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
          minWidth: '450px',
          minHeight: '200px',
        },

        root: {
          '.MuiBackdrop-root': {
            backgroundColor: '#58585A90',
          },
        },
      },
    },

    /* ---------- DIALOG TITLE ---------- */
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '24px',
          fontWeight: '600',
        },
      },
    },

    /* ---------- LINK ---------- */
    MuiLink: {
      defaultProps: {
        color: colors.info,
        component: LinkBehavior,
      } as LinkProps,

      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all .1s',

          '&.active': {
            // fontWeight: '600',
          },

          '&.nav-link': {
            fontSize: '16px',

            '&.active, :hover': {
              // fontWeight: '600',
              color: colors.primary,

              '& svg, & path, & g': {
                stroke: colors.primary,
                opacity: 1,
              },
            },
          },
        },
      },
    },

    /* ---------- SKELETON ---------- */
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: '#F1F5F9',
        },
      },
    },

    /* ---------- CHIP ---------- */
    MuiChip: {
      styleOverrides: {
        sizeSmall: {
          height: '26px',
        },

        root: {
          '&.MuiChip-colorDefault': {
            borderColor: '#CCE4FF',
            backgroundColor: '#FFF',
          },
        },
      },
    },

    /* ---------- ACCORDION ---------- */
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',

          '&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded': {
            minHeight: '0',
          },

          '::before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },

    /* ---------- BREADCRUMBS ---------- */
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          '& .MuiBreadcrumbs-separator': {
            fontSize: '27px !important',
            margin: '0 15px',
            paddingBottom: '4px',
          },
        },
      },
    },

    /* ---------- TABLE ---------- */
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: 'inherit',
          overflow: 'hidden',
          height: '100%',
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#F2F4F7',
        },
      },
    },

    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: '12px !important',
        },

        root: {
          padding: '16px 6px',
          borderColor: colors.stroke,

          ':first-of-type': {
            paddingLeft: '16px',
          },

          ':last-of-type': {
            paddingRight: '16px',
          },
        },
      },
    },

    /* ---------- LINEAR PROGRESS ---------- */
    MuiLinearProgress: {
      styleOverrides: {
        bar: {
          borderRadius: '34px',
        },

        root: {
          height: '8px',
          borderRadius: '34px',
        },
      },
    },
  },
});

export default theme;
