<?php
namespace src\module\order\logic;

use src\module\order\repository\DiscountOrderRepository;
use tools\infrastructure\Collector;

class ListDiscountOrder{
    protected DiscountOrderRepository $repo;

    public function __construct(){
        $this->repo = new DiscountOrderRepository();
    }
    
    public function byOrderIdArray(array $orderIdArray):Collector{
        if(empty($orderIdArray)){
            return new Collector();
        }
        return $this->repo->listDiscountLinks([
            'orderId' => $orderIdArray,
        ]);
    }
}