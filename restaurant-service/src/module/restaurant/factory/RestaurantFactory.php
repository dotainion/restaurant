<?php
namespace src\module\restaurant\factory;

use src\module\restaurant\objects\Restaurant;
use src\module\user\factory\AddressFactory;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class RestaurantFactory extends Collector{
    protected AddressFactory $factory;

    use Factory;

    public function __construct(){
        $this->factory = new AddressFactory();
    }

    public function mapResult($record):Restaurant{
        $restaurant = new Restaurant(
            $this->uuid($record['restaurantId']),
            (string)$record['name'],
            (string)$record['tagline'],
            (string)$record['logoRef'],
            (bool)$record['isActive'],
            (string)$record['phone'],
            (string)$record['email'],
            isset($record['addressId']) ? $this->uuid($record['addressId']) : null,
            (string)$record['cuisine'],
            (string)$record['category'],
            (string)$record['created'],
            (string)$record['rating'],
            (string)$record['openingHours'],
            (float)$record['priceRange']
        );

        if(isset($record['id'])){
            $restaurant->setAddress($this->factory->mapResult($record));
        }
        return $restaurant;
    }
}