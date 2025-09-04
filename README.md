
%% UML Component Diagram (Mermaid) – Region 단위 내부 구성
flowchart TB
  subgraph APIGW["API Gateway"]
    I1["REST /gRPC API\n+ Auth Filter\n+ Rate Limit\n+ Circuit Breaker"]
  end

  subgraph Services["Microservices"]
    Search["SearchService\n(Ports: SearchAPI)\nUses: ES, Cache"]
    Reserve["ReservationService\n(Ports: BookingAPI)\nUses: DB, Broker"]
    Payment["PaymentService\n(Ports: PaymentAPI)\nUses: DB, Outbox"]
    Auth["AuthService\n(Ports: AuthAPI)\nUses: OAuth/IdP"]
    Partner["PartnerIntegration\n(Ports: PartnerAPI)\nUses: Broker, Adapters"]
  end

  subgraph Data["Data/Infra Components"]
    ES["ElasticSearch Index"]
    Cache["Redis Cache"]
    DB["RDBMS (Master/Replica)\nCQRS ReadModel"]
    Broker["Kafka/RabbitMQ\n(Topics/Queues)"]
    Outbox["Outbox Table\n(Exactly-once-like)"]
  end

  I1 --> Search
  I1 --> Reserve
  I1 --> Payment
  I1 --> Auth
  I1 --> Partner

  Search --> ES
  Search --> Cache
  Reserve --> DB
  Reserve --> Broker
  Payment --> DB
  Payment --> Outbox
  Partner --> Broker
