<?php
namespace src\module\order\logic;

use src\module\order\repository\ProductOrderRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListProductOrder{
    protected ProductOrderRepository $repo;

    public function __construct(){
        $this->repo = new ProductOrderRepository();
    }
    
    public function list(?Id $id=null, ?bool $hide=null):Collector{
        return $this->repo->listProductOrder([
            'id' => $id,
            'hide' => $hide
        ]);
    }
    
    public function byOrderIdArray(array $orderIdArray):Collector{
        if(empty($orderIdArray)){
            return new Collector();
        }
        return $this->repo->listProductOrder([
            'orderId' => $orderIdArray,
        ]);
    }
}