<?php
namespace src\module\order\objects;

use src\module\products\objects\Product;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class ProductOrder implements IObjects{
    protected Id $id;
    protected Id $productId;
    protected Id $orderId;
    protected float $price;
    protected ?string $note = null;
    protected bool $hide = false;
    protected int $quantity = 0;
    protected ?Product $product = null;

    public function __construct(
        string $id, 
        string $productId, 
        string $orderId, 
        float $price, 
        ?string $note, 
        bool $hide=false, 
        int $quantity=0
    ){
        $this->id = new Id($id);
        $this->productId = new Id($productId);
        $this->orderId = new Id($orderId);
        $this->price = $price;
        $this->note = $note;
        $this->hide = $hide;
        $this->quantity = $quantity;
    }

    public function id():IId{
        return $this->id;
    }
    
    public function productId():IId{
        return $this->productId;
    }
    
    public function orderId():IId{
        return $this->orderId;
    }
    
    public function price():float{
        return $this->price;
    }

    public function note():?string{
        return $this->note;
    }
    
    public function product():?Product{
        return $this->product;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function quantity():int{
        return $this->quantity;
    }
    
    public function setProduct(Product $product):void{
        $this->product = $product;
    }
}