<?php
namespace src\module\products\logic;

use src\module\products\repository\ProductRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListProduct{
    protected ProductRepository $repo;

    public function __construct(){
        $this->repo = new ProductRepository();
    }
    
    public function list(?Id $id=null, ?string $name=null, ?string $category=null):Collector{
        return $this->repo->listProducts([
            'id' => $id,
            'name' => $name,
            'category' => $category,
        ]);
    }
}