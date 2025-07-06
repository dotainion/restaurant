<?php
namespace src\module\products\factory;

use src\module\products\objects\Product;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class ProductFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Product{
        return new Product(
            $this->uuid($record['id']),
            $record['name'],
            (float)$record['price'],
            (string)$record['description'],
            (string)$record['category'],
            $record['imageRef'] ?? '',
            $record['created'],
            (bool)$record['hide'] ?? ''
        );
    }
}