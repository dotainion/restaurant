<?php
namespace src\module\restaurant\objects;

use src\module\user\objects\Address;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Restaurant  implements IObjects{
    protected Id $id;
    protected string $name;
    protected string $tagline;
    protected string $logoRef;
    protected bool $isActive;
    protected string $phone;
    protected string $email;
    protected ?Id $addressId;
    protected ?Address $address = null;
    protected string $cuisine;
    protected string $category;
    protected DateHelper $created;
    protected string $rating;
    protected string $openingHours;
    protected float $priceRange;

    public function __construct(
        string $id,
        string $name,
        string $tagline,
        string $logoRef,
        bool $isActive,
        string $phone,
        string $email,
        ?string $addressId,
        string $cuisine,
        string $category,
        string $created,
        string $rating,
        string $openingHours,
        float $priceRange
    ){
        $this->id = new Id($id);
        $this->name = $name;
        $this->tagline = $tagline;
        $this->logoRef = $logoRef;
        $this->isActive = $isActive;
        $this->phone = $phone;
        $this->email = $email;
        $this->addressId = empty($addressId) ? null : new Id($addressId);
        $this->cuisine = $cuisine;
        $this->category = $category;
        $this->created = new DateHelper($created);
        $this->rating = $rating;
        $this->openingHours = $openingHours;
        $this->priceRange = $priceRange;
    }

    public function id():IId{
        return $this->id;
    }
    
    public function name():string{
        return $this->name;
    }

    public function tagline():string{
        return $this->tagline;
    }

    public function logoRef():string{
        return $this->logoRef;
    }

    public function isActive():bool{
        return $this->isActive;
    }

    public function phone():string{
        return $this->phone;
    }

    public function email():string{
        return $this->email;
    }

    public function addressId():?IId{
        return $this->addressId;
    }

    public function address():?Address{
        return $this->address;
    }

    public function cuisine():string{
        return $this->cuisine;
    }

    public function category():string{
        return $this->category;
    }

    public function created():DateHelper{
        return $this->created;
    }

    public function rating():string{
        return $this->rating;
    }

    public function openingHours():string{
        return $this->openingHours;
    }

    public function priceRange():float{
        return $this->priceRange;
    }

    public function logo():string{
        return '';
    }

    public function setAddress(Address $address):void{
        $this->address = $address;
    }
}