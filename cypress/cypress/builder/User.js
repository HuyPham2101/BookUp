import { build, fake } from "test-data-bot";

export const userBuilder = () =>
  build("User").fields({
    email: fake(f => f.internet.email()),
    userName: fake(f => f.name.firstName()),
    password: fake(f => f.internet.password())
  });
