<?php
namespace src\module\discounts\logic;

use src\module\discounts\repository\DiscountRepository;
use tools\infrastructure\Collector;

class ListDiscounts{
    protected DiscountRepository $repo;

    public function __construct(){
        $this->repo = new DiscountRepository();
    }
    
    public function list():Collector{
        return $this->repo->listDiscounts();
    }
}