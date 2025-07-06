<?php
namespace src\module\order\factory;

use src\module\order\objects\Order;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class OrderFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Order{
        return new Order(
            $this->uuid($record['id']),
            $this->uuid($record['createdById']),
            $record['orderNumber'],
            $record['created'],
            $record['status'],
            $record['completedOn'] ?? null,
            (string)$record['preference'],
            $record['tableNo'] ?? null,
            $record['note'] ?? null,
            (bool)$record['hide'] ?? false
        );
    }
}