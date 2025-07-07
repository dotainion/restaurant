<?php
namespace src\module\restaurant\factory;

use src\module\restaurant\objects\RestaurantLink;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class RestaurantLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):RestaurantLink{
        return new RestaurantLink(
            $this->uuid($record['userId']),
            $this->uuid($record['restaurantId'])
        );
    }
}