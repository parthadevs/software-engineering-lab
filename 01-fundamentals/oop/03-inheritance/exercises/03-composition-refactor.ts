export interface User {
  readonly id: string;
  readonly email: string;
}

// Bad way becouse subclass overrides one method; 
// breaks if the parent adds methods or changes internals
class BadUserRepository {
  async findById(id: string): Promise<User | null> {
    return { id, email: `${id}@example.com` }; // DB call
  }
}

class BadCachedUserRepository extends BadUserRepository {
  readonly #cache = new Map<string, User>();

  override async findById(id: string): Promise<User | null> {
    const hit = this.#cache.get(id);
    if (hit) return hit;
    const user = await super.findById(id);
    if (user) this.#cache.set(id, user);
    return user;
  }
}

// Good way
export interface UserRepository {
  findById(id: string): Promise<User | null>;
}

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    return { id, email: `${id}@example.com` }; // prisma.user.findUnique(...)
  }
}

export class CachedUserRepository implements UserRepository {
  readonly #cache = new Map<string, User>();
  private readonly inner: UserRepository
  
  constructor(inner : UserRepository) {
    this.inner = inner;
  }

  async findById(id: string): Promise<User | null> {
    const hit = this.#cache.get(id);
    if (hit) return hit;

    const user = await this.inner.findById(id);
    if (user) this.#cache.set(id, user);
    return user;
  }
}

async function main(): Promise<void> {
  const repo: UserRepository = new CachedUserRepository(new PrismaUserRepository());
  console.log(await repo.findById('u1'));
  console.log(await repo.findById('u1')); // served from cache
}

void main();
void BadCachedUserRepository;