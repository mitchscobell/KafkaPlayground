const { Kafka } = require("kafkajs");
const yargs = require("yargs");

run();

async function run() {
  const argv = yargs
    .command("--topic", "parse user topic", function (yargs, helpOrVersionSet) {
      return yargs.option("topic", {
        alias: "t",
        default: "KafkaTopic",
      });
    })
    .help().argv;

  console.log(argv);

  const topic = argv.topic ? argv.topic : "KafkaTopic";

  console.log(`Kafka Topic: ${topic}`);

  try {
    const kafka = new Kafka({
      clientId: "kafkaplayground",
      brokers: ["192.168.1.233:9092"],
    });

    const admin = kafka.admin();
    console.log("Connecting...");
    await admin.connect();
    console.log("Connected!");

    await admin.createTopics({
      topics: [
        {
          topic: topic,
          numPartitions: 2,
        },
      ],
    });

    console.log("Created Successfully!");
    await admin.disconnect();
  } catch (ex) {
    console.error(ex);
  } finally {
    process.exit(0);
  }
}
