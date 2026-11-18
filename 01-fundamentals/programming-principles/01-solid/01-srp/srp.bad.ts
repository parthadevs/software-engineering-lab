// A user service handles user registation, database access, email sending, 
// PDF generation and logging.

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UserService {
  public register(user: User): void {
    // input ialidation
    if (!user.email.includes("@")) {
      throw new Error("invalid email format");
    }
    if (user.password.length < 8) {
      throw new Error("password must be at least 8 characters");
    }

    // database persistence
    console.log(`connecting to PostgreSQL`);
    console.log(`INSERT INTO users (id, name, email) VALUES ('${user.id}', '${user.name}', '${user.email}')`);

    // email notification
    console.log(`connecting to SMTP server`);
    console.log(`sending welcome email to ${user.email}...`);

    // audit logging
    const timestamp = new Date().toISOString();
    console.log(`[AUDIT ${timestamp}] User registered: ${user.id}`);
  }
}

// usage
const registration = new UserService();
registration.register({
  id: "u-101",
  name: "Partha Sarker",
  email: "dev.parthasarker@gmail.com",
  password: "password123",
});


// Here all responsibility in same class so 4 separate reason to cahange this class
// But SRP said a class or module should only reason to change.
// That's menes this class not maintain SOLID Principles (SRP). 