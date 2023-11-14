import { connect } from "@dagger.io/dagger"

connect(async (client) =>
{
    // Get Node image
    const containerNode = await client.container().from("node:18-bullseye");

    // Get reference to the local project
    const source = await client
        .host()
        .directory(".", {
            exclude: [
                "node_modules/",
                "infrastructure",
                ".github",
                "docs"
            ]
        });

    const nodeCache = client.cacheVolume("node");

    // Mount cloned repository into Node image
    const runner = containerNode
        .withDirectory("/home/node/app", source)
        .withWorkdir("/home/node/app")
        .withMountedCache("/home/node/app/node_modules", nodeCache);

    // Install pnpm package manager and packages
    const install = runner
        .withExec(["npm", "install", "-g", "pnpm"])
        .withExec(["pnpm", "install"]);

    // Build and Test
    const test = await install
        .withExec(["pnpm", "build"])
        .withEnvVariable("NODE_ENV", "test")
        .withExec(["pnpm", "test"])
        .directory("coverage/")
        .export("./coverage");

    console.log(test);
    console.log("Successfully");

}, { LogOutput: process.stdout })
