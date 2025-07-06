<?php
namespace src\module\order\objects;

use src\module\user\objects\User;
use tools\infrastructure\Assert;
use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Order  implements IObjects{
    protected Id $id;
    protected Id $createdById;
    protected DateHelper $created;
    protected ?DateHelper $completedOn=null;
    protected string $status;
    protected string $orderNumber;
    protected string $preference;
    protected ?string $tableNumber;
    protected ?string $note;
    protected bool $hide;
    protected ?User $user=null;
    protected Collector $products;
    protected Collector $discounts;

    public function __construct(
        string $id,
        string $createdById,
        string $orderNumber,
        string $created,
        string $status,
        ?string $completedOn=null,
        string $preference,
        ?string $tableNumber,
        ?string $note,
        bool $hide=false
    ){
        OrderStatus::assertIsValid($status);
        Assert::inArray($preference, ['dine-in', 'to-go', 'delivery'], 'Invalid preferences.');
        $this->id = new Id($id);
        $this->createdById = new Id($createdById);
        $this->created = new DateHelper($created);
        $this->completedOn = empty($completedOn) ? null : new DateHelper($completedOn);
        $this->orderNumber = $orderNumber;
        $this->tableNumber = $tableNumber;
        $this->note = $note;
        $this->status = $status;
        $this->preference = $preference;
        $this->hide = $hide;
        $this->products = new Collector();
        $this->discounts = new Collector();
    }

    public function id():IId{
        return $this->id;
    }

    public function createdById():IId{
        return $this->createdById;
    }
    
    public function created():DateHelper{
        return $this->created;
    }
    
    public function completedOn():?DateHelper{
        return $this->completedOn;
    }

    public function tableNumber():?string{
        return $this->tableNumber;
    }

    public function note():?string{
        return $this->note;
    }

    public function status():string{
        return $this->status;
    }

    public function preference():string{
        return $this->preference;
    }

    public function orderNumber():string{
        return $this->orderNumber;
    }

    public function hide():bool{
        return $this->hide;
    }
    
    public function products():Collector{
        return $this->products;
    }
    
    public function discounts():Collector{
        return $this->discounts;
    }

    public function user():?User{
        return $this->user;
    }

    public function price():Price{
        return new Price($this);
    }

    public function setUser(User $user):void{
        $this->user = $user;
    }
}