<?php
namespace src\module\order\logic;

use src\module\order\objects\DiscountOrder;
use src\module\order\repository\DiscountOrderRepository;

class SetDiscountOrder{
    protected DiscountOrderRepository $repo;

    public function __construct(){
        $this->repo = new DiscountOrderRepository();
    }
    
    public function set(DiscountOrder $link):void{
        $collector = $this->repo->listDiscountLinks([
            'id' => $link->id()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($link);
            return;
        }
        $this->repo->edit($link);
    }
}