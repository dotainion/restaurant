<?php
namespace src\module\discounts\logic;

use src\module\discounts\objects\Discount;
use src\module\discounts\repository\DiscountRepository;

class SetDiscount{
    protected DiscountRepository $repo;

    public function __construct(){
        $this->repo = new DiscountRepository();
    }
    
    public function set(Discount $discount):void{
        $collector = $this->repo->listDiscounts([
            'id' => $discount->id()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($discount);
            return;
        }
        $this->repo->edit($discount);
    }
}