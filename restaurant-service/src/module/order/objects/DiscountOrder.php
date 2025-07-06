<?php
namespace src\module\order\objects;

use src\module\discounts\objects\Discount;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class DiscountOrder implements IObjects{
    protected Id $id;
    protected Id $discountId;
    protected ?Id $productId = null;
    protected Id $orderId;
    protected float $amount;
    protected string $type;
    protected bool $hide;
    protected string $note;
    protected ?Discount $discount = null;

    public function __construct(
        string $id,
        string $discountId,
        ?string $productId,
        string $orderId,
        float $amount,
        string $type,
        string $note,
        bool $hide
    ){
        DiscountType::assertIsValid($type);
        $this->id = new Id($id);
        $this->discountId = new Id($discountId);
        $this->orderId = new Id($orderId);
        $this->productId = empty($productId) ? null : new Id($productId);
        $this->amount = $amount;
        $this->type = $type;
        $this->note = $note;
        $this->hide = $hide;
    }

    public function id():IId{
        return $this->id;
    }
    
    public function discountId():IId{
        return $this->discountId;
    }
    
    public function orderId():IId{
        return $this->orderId;
    }
    
    public function productId():?IId{
        return $this->productId;
    }

    public function amount():float{
        return $this->amount;
    }
    
    public function type():string{
        return $this->type;
    }

    public function note():string{
        return $this->note;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function discount():?Discount{
        return $this->discount;
    }
    
    public function setDiscount(Discount $discount):void{
        $this->discount = $discount;
    }
}