const Topic = require("./topic");
run();

async function run() {

    console.log('started');

    const run = new Topic("MyTopic");
    await run.topicRun();

    process.exit(0);
}