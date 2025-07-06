<?php
namespace src\module\payment\factory;

use src\module\payment\objects\Payment;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class PaymentFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Payment{
        return new Payment(
            $this->uuid($record['id']),
            $this->uuid($record['orderId']),
            (float)$record['amount'],
            $record['created'],
            $record['status'],
            $record['email'] ?? null,
            $record['posReference'] ?? null
        );
    }
}