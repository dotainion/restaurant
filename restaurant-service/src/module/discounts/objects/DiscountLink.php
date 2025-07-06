<?php
namespace src\module\discounts\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IId;

class DiscountLink{
    protected Id $productId;
    protected Id $discountId;
    protected bool $hide;

    public function __construct(string $productId, string $discountId, bool $hide){
        $this->productId = new Id($productId);
        $this->discountId = new Id($discountId);
        $this->hide = $hide;
    }

    public function productId():IId{
        return $this->productId;
    }
    
    public function discountId():IId{
        return $this->discountId;
    }
    
    public function hide():bool{
        return $this->hide;
    }
}