<?php
namespace src\module\order\logic;

use src\module\order\objects\ProductOrder;
use src\module\order\repository\ProductOrderRepository;

class SetProductOrder{
    protected ProductOrderRepository $repo;

    public function __construct(){
        $this->repo = new ProductOrderRepository();
    }
    
    public function set(ProductOrder $link):void{
        $collector = $this->repo->listProductOrder([
            'id' => $link->id()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($link);
            return;
        }
        $this->repo->edit($link);
    }
}