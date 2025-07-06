<?php
namespace src\module\discounts\objects;

use src\module\order\objects\DiscountType;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Discount  implements IObjects{
    protected Id $id;
    protected string $title;
    protected string $description;
    protected string $amount;
    protected DateHelper $start;
    protected ?DateHelper $end;
    protected DateHelper $created;
    protected string $type;
    protected bool $hide;

    public function __construct(
        string $id, 
        string $title, 
        string $description, 
        float $amount, 
        string $start, 
        ?string $end, 
        string $created, 
        string $type, 
        bool $hide
    ){
        DiscountType::assertIsValid($type);
        $this->id = new Id($id);
        $this->title = $title;
        $this->description = $description;
        $this->amount = $amount;
        $this->start = new DateHelper($start);
        $this->end = empty($end) ? null : new DateHelper($end);
        $this->created = new DateHelper($created);
        $this->type = $type;
        $this->hide = $hide;
    }

    public function id():IId{
        return $this->id;
    }
    
    public function title():string{
        return $this->title;
    }
    
    public function description():string{
        return $this->description;
    }

    public function amount():float{
        return $this->amount;
    }
    
    public function start():DateHelper{
        return $this->start;
    }
    
    public function end():?DateHelper{
        return $this->end;
    }
    
    public function created():DateHelper{
        return $this->created;
    }
    
    public function type():string{
        return $this->type;
    }
    
    public function hide():bool{
        return $this->hide;
    }
    
    public function started():bool{
        return (new DateHelper())->new()->expired($this->start()->toString());
    }
    
    public function expired():bool{
        if(!$this->end()){
            return false;
        }
        return (new DateHelper())->new()->expired($this->end()->toString());
    }
}