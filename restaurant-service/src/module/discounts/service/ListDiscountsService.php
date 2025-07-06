<?php
namespace src\module\discounts\service;

use src\infrastructure\Service;
use src\module\discounts\logic\ListDiscounts;

class ListDiscountsService extends Service{
    protected ListDiscounts $discount;

    public function __construct(){
        parent::__construct();
        $this->discount = new ListDiscounts();
    }
    
    public function process(){
        $collector = $this->discount->list();
        $collector->assertHasItem('No products.');

        $this->setOutput($collector);
        return $this;
    }
}