import { connect } from "@dagger.io/dagger"

connect(async (client) =>
{
    // Get reference to the local project
    const source = client.host().directory(".", { exclude: [
            "node_modules/",
            "infrastructure",
            ".github",
            "docs"
        ]
    });

    // Get Node image
    const node = client.container().from("node:18-bullseye")

    // Mount cloned repository into Node image
    const runner = node
      .withDirectory("/home/node/app", source)
      .withWorkdir("/home/node/app");

    // Install packages
   const build =  await runner
        .withExec(["yarn", "install"])
        .withExec(["yarn", "build"])
        .withEnvVariable("NODE_ENV", "test")
        .withExec(["yarn", "test"])
        .stdout();

   console.log(build);
   console.log("Successfully");

}, { LogOutput: process.stdout })
