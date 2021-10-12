const { Kafka } = require("kafkajs");
const yargs = require("yargs");

async function consoleRun() {
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
  const group = argv.group ? argv.group : "ConsumerGroup";

  console.log(`Kafka Topic: ${topic}`);
  console.log(`Kafka Consumer Group: ${group}`);

  const consumer = new Consumer(group, topic);
  await consumer.runConsumer();
}

class Consumer {
  constructor(group, topic) {
    this.group = group;
    this.topic = topic;
  }

  async runConsumer() {
    const group = this.group;
    const topic = this.topic;
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
}

consoleRun();

module.exports = Consumer;
