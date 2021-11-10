const size = {
   mobile: '425px',
   tablet: '768px',
   laptop: '1024px',
   desktop: '2560px',
};

const device = {
   mobile: `(max-width: ${size.mobile})`,
   tablet: `(min-width: ${size.tablet})`,
   laptop: `(min-width: ${size.laptop})`,
   desktop: `(min-width: ${size.desktop})`,
};

export default device;
