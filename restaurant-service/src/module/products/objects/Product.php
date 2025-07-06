<?php
namespace src\module\products\objects;

use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Product  implements IObjects{
    protected Id $id;
    protected string $name;
    protected float $price;
    protected string $description;
    protected string $category;
    protected string $imageRef;
    protected DateHelper $created;
    protected bool $hide;

    public function __construct(
        string $id, 
        string $name, 
        float $price, 
        string $description, 
        string $category, 
        string $imageRef,
        string $created,
        bool $hide
    ){
        $this->id = new Id($id);
        $this->name = $name;
        $this->price = $price;
        $this->description = $description;
        $this->category = $category;
        $this->imageRef = $imageRef;
        $this->created = new DateHelper($created);
        $this->hide = $hide;
    }

    public function id():IId{
        return $this->id;
    }
    
    public function name():string{
        return $this->name;
    }
    
    public function price():float{
        return $this->price;
    }

    public function description():string{
        return $this->description;
    }
    
    public function category():string{
        return $this->category;
    }
    
    public function imageRef():string{
        return $this->imageRef;
    }
    
    public function created():DateHelper{
        return $this->created;
    }
    
    public function hide():bool{
        return $this->hide;
    }
}