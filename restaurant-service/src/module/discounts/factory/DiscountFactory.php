<?php
namespace src\module\discounts\factory;

use src\module\discounts\objects\Discount;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class DiscountFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Discount{
        return new Discount(
            $this->uuid($record['discountId']),
            $record['title'],
            (string)$record['desc'],
            (float)$record['amount'],
            $record['start'],
            $record['end'] ?? null,
            $record['date'],
            $record['type'],
            (bool)$record['hide']
        );
    }
}