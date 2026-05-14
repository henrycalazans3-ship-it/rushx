const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 API Gateway running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n📝 Available services:`);
  console.log(`   - User Service: ${process.env.USER_SERVICE_URL}`);
  console.log(`   - Order Service: ${process.env.ORDER_SERVICE_URL}`);
  console.log(`   - Payment Service: ${process.env.PAYMENT_SERVICE_URL}`);
  console.log(`   - Tracking Service: ${process.env.TRACKING_SERVICE_URL}\n`);
});
