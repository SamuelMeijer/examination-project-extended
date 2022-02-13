module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '78e9bbaeace255c6fb0d33169ad245da'),
  },
});
