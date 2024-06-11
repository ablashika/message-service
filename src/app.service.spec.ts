// import { Test, TestingModule } from '@nestjs/testing';
// import { AppService } from './app.service';

// describe('AppService', () => {
//   let appService: AppService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AppService],
//     }).compile();

//     appService = module.get<AppService>(AppService);
//   });

//   describe('sendPasswordResetEmail', () => {
//     it('should send a password reset email', async () => {
//       // Mock email and reset link
//       const email = 'example@example.com';
//       const resetLink = 'https://example.com/reset-password';

//       // Call the sendPasswordResetEmail method with mock data
//       const result = await appService.sendPasswordResetEmail(email, resetLink);

//       // Assert that the result is as expected
//       expect(result).toEqual({ status: 'Password reset email sent' });
//     });
//   });
// });