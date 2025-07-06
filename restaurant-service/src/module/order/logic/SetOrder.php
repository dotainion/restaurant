<?php
namespace src\module\order\logic;

use src\module\order\objects\Order;
use src\module\order\repository\OrderRepository;

class SetOrder{
    protected OrderRepository $repo;

    public function __construct(){
        $this->repo = new OrderRepository();
    }
    
    public function set(Order $order):void{
        $collector = $this->repo->listOrders([
            'id' => $order->id()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($order);
            return;
        }
        $this->repo->edit($order);
    }
}