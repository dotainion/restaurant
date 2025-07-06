<?php
namespace src\module\order\factory;

use src\module\order\objects\ProductOrder;
use src\module\products\factory\ProductFactory;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class ProductOrderFactory extends Collector{
    use Factory;

    protected ProductFactory $factory;

    public function __construct(){
        $this->factory = new ProductFactory();
    }

    public function mapResult($record):ProductOrder{
        $link = new ProductOrder(
            $this->uuid($record['linkId'] ?? $record['id']),
            $this->uuid($record['productId']),
            $this->uuid($record['orderId']),
            (float)$record['amount'],
            $record['note'] ?? null,
            (bool)$record['hide'] ?? false,
            (int)$record['quantity'] ?? 0
        );
        if(isset($record['name']) && isset($record['price'])){
            $link->setProduct($this->factory->mapResult($record));
        }
        return $link;
    }
}