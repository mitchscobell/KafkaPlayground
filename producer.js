const { Kafka } = require("kafkajs");
const yargs = require("yargs");

run();

async function run() {
  const argv = yargs
    .command(
      "--message",
      "parse user message",
      function (yargs, helpOrVersionSet) {
        return yargs.option("message", {
          alias: "m",
        });
      }
    )
    .command("--topic", "parse user topic", function (yargs, helpOrVersionSet) {
      return yargs.option("t", {
        alias: "t",
        default: "KafkaTopic",
      });
    })
    .help().argv;

  console.log(argv);

  const topic = argv.topic ? argv.topic : "KafkaTopic";
  const message = argv.message ? argv.message : "";

  console.log(`Kafka Topic: ${topic}`);

  if (!message) {
    console.log("No Message Entered!");
    return;
  } else {
    console.log(`Kafka Message: ${message}`);
    producerRun(message, topic);
  }
}

async function producerRun(message, topic) {
  try {
    const kafka = new Kafka({
      clientId: "kafkaplayground",
      brokers: ["192.168.1.233:9092"],
    });

    const producer = kafka.producer();
    console.log("Connecting...");
    await producer.connect();
    console.log("Connected!");

    // if message is uppercase, partition 0, else partition 1
    const partition = message[0] < "a" ? 0 : 1;

    console.log(`Partition: ${partition}`);
    
    const result = await producer.send({
      topic: topic,
      messages: [
        {
          value: message,
          partition: partition,
        },
      ],
    });

    console.log(`Sent successfully! \n${JSON.stringify(result)}`);

    await producer.disconnect();
  } catch (ex) {
    console.error(ex);
  } finally {
    process.exit(0);
  }
}
