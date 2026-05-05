import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
} satisfies IconProps;

export const DashboardIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M4 13.5h6.5V20H4zM13.5 4H20v16h-6.5zM4 4h6.5v6.5H4zM13.5 13.5H20V20h-6.5z" />
  </svg>
);

export const AnalyticsIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M4 19V5" />
    <path d="M4 19h16" />
    <path d="M8 16l3.2-4 3 2 4.8-6" />
    <path d="M17.8 8H19v1.2" />
  </svg>
);

export const PatientsIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M16 21v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
    <circle cx="9.5" cy="8" r="3.5" />
    <path d="M20 21v-1.2a3.5 3.5 0 0 0-2.6-3.4" />
    <path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4" />
  </svg>
);

export const BellIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

export const HospitalIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M5 21V6.5A1.5 1.5 0 0 1 6.5 5H11v16" />
    <path d="M13 21V3h4.5A1.5 1.5 0 0 1 19 4.5V21" />
    <path d="M8 9h2" />
    <path d="M8 13h2" />
    <path d="M15 8h2" />
    <path d="M15 12h2" />
    <path d="M10 21h4" />
  </svg>
);

export const LogoutIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="m6 6 12 12" />
    <path d="M18 6 6 18" />
  </svg>
);

export const PeopleIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M17.5 11a3 3 0 1 0 0-6" />
    <path d="M18 19a4.5 4.5 0 0 0-3.4-4.3" />
  </svg>
);

export const PulseIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M3 12h4l2-5 4 10 2-5h6" />
  </svg>
);

export const AlertIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M12 3l9 16H3z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

export const RecoveryIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M8 12a4 4 0 1 0 4-4" />
    <path d="M8 4v4h4" />
    <path d="M16 12a4 4 0 1 0-4 4" />
    <path d="M16 20v-4h-4" />
  </svg>
);

export const GridIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  </svg>
);

export const ListIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M8 6h12" />
    <path d="M8 12h12" />
    <path d="M8 18h12" />
    <path d="M4 6h.01" />
    <path d="M4 12h.01" />
    <path d="M4 18h.01" />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const HeartIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M12 20s-7-4.6-7-10.2A4.3 4.3 0 0 1 9.3 5c1 0 2 .4 2.7 1.2A3.8 3.8 0 0 1 14.7 5 4.3 4.3 0 0 1 19 9.8C19 15.4 12 20 12 20Z" />
  </svg>
);

export const PressureIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M14 5a7 7 0 1 0 5 2" />
    <path d="m14 5 5 2-2 5" />
    <path d="M12 9v4l2 2" />
  </svg>
);

export const ThermometerIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M14 14.8V6a2 2 0 1 0-4 0v8.8a4 4 0 1 0 4 0Z" />
    <path d="M12 11v6" />
  </svg>
);
