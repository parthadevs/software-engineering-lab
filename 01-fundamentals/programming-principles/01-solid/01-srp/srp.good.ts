
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// only input validation
class UserValidator {
  public validate(user: User): void {
    if (!user.email.includes("@")) {
      throw new Error("invalid email format");
    }
    if (user.password.length < 8) {
      throw new Error("password must be at least 8 characters");
    }
  }
}

// only database persistence
class UserRepository {
  public save(user: User): void {
    console.log(`connecting to postgreSQL`);
    console.log(`INSERT INTO users (id, name, email) VALUES ('${user.id}', '${user.name}', '${user.email}')`);
  }
}

// only email notification
class EmailService {
  public sendWelcomeEmail(email: string): void {
    console.log(`connecting to SMTP server.`);
    console.log(`sending welcome email to ${email}`);
  }
}

// only audit logging
class AuditLogger {
  public logRegistration(userId: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[AUDIT ${timestamp}] User registered: ${userId}`);
  }
}

class UserRegistrationService {
  constructor(
    private readonly validator: UserValidator,
    private readonly repository: UserRepository,
    private readonly emailService: EmailService,
    private readonly logger: AuditLogger
  ) {}

  public register(user: User): void {
    this.validator.validate(user);
    this.repository.save(user);
    this.emailService.sendWelcomeEmail(user.email);
    this.logger.logRegistration(user.id);
  }
}

// usage
const registrationService = new UserRegistrationService(
  new UserValidator(),
  new UserRepository(),
  new EmailService(),
  new AuditLogger()
);

registrationService.register({
  id: "u-101",
  name: "Partha Sarker",
  email: "dev.parthasarker@gmail.com",
  password: "password123",
});

// here all responsibility are separate so it need to change spicific service no 
// need to change entire code. and this code follow SOLID principles (SRP).