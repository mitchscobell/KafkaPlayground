# KafkaPlayground

## Reference
https://www.youtube.com/watch?v=R873BlNVUB4&ab_channel=HusseinNasser

## Dependencies 
Docker
NodeJs
kafkajs

### Setting up zookeeper container
``` bash
docker run --name zookeeper -p 2181:2181 zookeeper
```

### Stopping zookeeper
```
docker stop zookeeper kafka
docker rm zookeeper kafka
```

### Setting up Kafka container
Get the local host name or use IP address
``` bash
scutil --get LocalHostName
```

Put local host name into the docker run command
```
docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=<localhostname>:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<localhostname>:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -d confluentinc/cp-kafka 
```

## Usage

First create the topic
```
node topic.js
```

Second post a message by sending to the producer
```
node producer.js <message here!>
```

Last consume the messages by subscribing!
```
node consumer.js
# or provide topic and/or consumer group
node consumer.js --topic testtopic --group group  
```

PRO TIP: Run two consumers to see which partition zookeeper sends the messages to!