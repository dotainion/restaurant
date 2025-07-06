<?php
namespace src\module\order\factory;

use src\module\discounts\factory\DiscountFactory;
use src\module\order\objects\DiscountOrder;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class DiscountOrderFactory extends Collector{
    use Factory;

    protected DiscountFactory $factory;

    public function __construct(){
        $this->factory = new DiscountFactory();
    }

    public function mapResult($record):DiscountOrder{
        $link = new DiscountOrder(
            $this->uuid($record['linkId'] ?? $record['id']),
            $this->uuid($record['discountId']),
            isset($record['productId']) ? $this->uuid($record['productId']) : null,
            $this->uuid($record['orderId']),
            (float)$record['price'],
            (string)$record['type'],
            (string)$record['note'],
            (bool)$record['hide']
        );
        if(isset($record['amount'])){
            $link->setDiscount($this->factory->mapResult($record));
        }
        return $link;
    }
}