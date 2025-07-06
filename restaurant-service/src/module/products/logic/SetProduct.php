<?php
namespace src\module\products\logic;

use src\module\products\objects\Product;
use src\module\products\repository\ProductRepository;

class SetProduct{
    protected ProductRepository $repo;

    public function __construct(){
        $this->repo = new ProductRepository();
    }
    
    public function set(Product $product):void{
        $collector = $this->repo->listProducts([
            'id' => $product->id()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($product);
            return;
        }
        $this->repo->edit($product);
    }
}