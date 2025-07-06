<?php
namespace src\module\discounts\factory;

use src\module\discounts\objects\DiscountLink;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class DiscountLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):DiscountLink{
        return new DiscountLink(
            $this->uuid($record['productId']),
            $this->uuid($record['discountId']),
            (bool)$record['hide']
        );
    }
}