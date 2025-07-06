<?php
namespace src\module\reservation\objects;

use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Reservation  implements IObjects{
    protected Id $id;
    protected Id $createdById;
    protected string $status;
    protected string $name;
    protected ?string $number;
    protected ?string $email;
    protected DateHelper $created;
    protected DateHelper $date;
    protected int $people;
    protected ?string $note;

    public function __construct(
        string $id,
        string $createdById,
        string $status,
        string $name,
        string $created,
        string $date,
        ?string $number,
        ?string $email,
        int $people,
        ?string $note
    ){
        Assert::inArray($status, ['pending', 'arrived', 'canceled'], 'Invalid reservation status.');
        Assert::minNumber($people, 1, 'Must be at least 1 person.');
        $this->id = new Id($id);
        $this->createdById = new Id($createdById);
        $this->created = new DateHelper($created);
        $this->date = new DateHelper($date);
        $this->status = $status;
        $this->name = $name;
        $this->number = $number;
        $this->email = $email;
        $this->people = $people;
        $this->note = $note;
    }

    public function id():IId{
        return $this->id;
    }

    public function createdById():IId{
        return $this->createdById;
    }
    
    public function status():string{
        return $this->status;
    }
    
    public function name():string{
        return $this->name;
    }
    
    public function number():?string{
        return $this->number;
    }
    
    public function email():?string{
        return $this->email;
    }

    public function created():DateHelper{
        return $this->created;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function people():int{
        return $this->people;
    }
    
    public function note():?string{
        return $this->note;
    }
}