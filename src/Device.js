const size = {
  mobile: "767px",
  tablet: "768px",
  pc: "1024px",
};

export const device = {
  mobile: `all and (max-width: ${size.mobile})`,
  tablet: `all and (min-width: ${size.tablet}) and (max-width: 1023px)`,
  pc: `all and (min-width: ${size.pc})`,
};

// 사용법 ex) @media ${device.desktop} { max-width: 800px }
