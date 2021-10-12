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
    .command(
      "--group",
      "parse user consumer group",
      function (yargs, helpOrVersionSet) {
        return yargs.option("g", {
          alias: "g",
          default: "ConsumerGroup",
        });
      }
    )
    .help().argv;

  console.log(argv);

  const topic = argv.topic ? argv.topic : "KafkaTopic";
  const group = argv.group ? argv.group : "Consumer Group";

  console.log(`Kafka Topic: ${topic}`);
  console.log(`Kafka Consumer Group: ${group}`);

  try {
    const kafka = new Kafka({
      clientId: "kafkaplayground",
      brokers: ["192.168.1.233:9092"],
    });

    const consumer = kafka.consumer({
      groupId: group,
    });

    console.log("Connecting...");
    await consumer.connect();
    console.log("Connected!");

    await consumer.subscribe({
      topic: topic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received Message: ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (ex) {
    console.error(ex);
  } finally {
  }
}
