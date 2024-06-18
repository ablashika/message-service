import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EmailService } from '../email-service/email-service.service';
import { AppService } from './../app.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let emailService: EmailService;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            loginUser: jest.fn(),
            loginUserSms: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        {
          provide: AppService,
          useValue: {
            sendPasswordResetEmail: jest.fn(),
            merchantApproved: jest.fn(),
            merchantDeclined: jest.fn(),
            cashOut: jest.fn(),
            settlements: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    emailService = module.get<EmailService>(EmailService);
    appService = module.get<AppService>(AppService);
  });

  describe('createUser', () => {
    it('should create a user and send an email', async () => {
      const createUserDto = { email: 'test@example.com', userType: 'merchant' };

      await userController.createUser(createUserDto);

      expect(userService.createUser).toHaveBeenCalledWith('test@example.com', 'merchant');
      expect(emailService.sendMail).toHaveBeenCalledWith(
        'test@example.com',
        'Account Created Successfully',
        'Welcome, Merchant! Your account has been created successfully.'
      );
    });
  });

  describe('loginUser', () => {
    it('should login a user and send a message', async () => {
      const loginUserDto = { phoneNumber: '1234567890', message: 'Test message' };

      await userController.loginUser(loginUserDto);

      expect(userService.loginUser).toHaveBeenCalledWith('1234567890', 'Test message');
    });
  });
});