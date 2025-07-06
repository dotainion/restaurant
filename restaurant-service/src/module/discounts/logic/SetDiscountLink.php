<?php
namespace src\module\discounts\logic;

use src\module\discounts\objects\DiscountLink;
use src\module\discounts\repository\DiscountLinkRepository;

class SetDiscountLink{
    protected DiscountLinkRepository $repo;

    public function __construct(){
        $this->repo = new DiscountLinkRepository();
    }
    
    public function set(DiscountLink $link):void{
        $collector = $this->repo->listDiscountLinks([
            'productId' => $link->productId(),
            'discountId' => $link->discountId(),
        ]);
        if($collector->hasItem() && !$link->hide()){
            return;
        }
        if($link->hide()){
            $this->repo->remove($link);
            return;
        }
        $this->repo->create($link);
    }
}