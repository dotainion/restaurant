<?php
namespace src\module\payment\objects;

use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Payment  implements IObjects{
    protected IId $id;
    protected IId $orderId;
    protected float $amount;
    protected DateHelper $created;
    protected string $status;
    protected ?string $email;
    protected ?string $posReference;

    public function __construct(
        string $id,
        string $orderId,
        float $amount,
        string $created,
        string $status,
        ?string $email,
        ?string $posReference
    ){
        PaymentStatus::assertIsValid($status);
        !empty($email) && Assert::validEmail($email);
        $this->id = new Id($id);
        $this->orderId = new Id($orderId);
        $this->amount = $amount;
        $this->created = new DateHelper($created);
        $this->status = $status;
        $this->email = $email;
        $this->posReference = $posReference;
    }

    public function id():IId{
        return $this->id;
    }
    
    public function orderId():IId{
        return $this->orderId;
    }
    
    public function amount():float{
        return $this->amount;
    }

    public function created():DateHelper{
        return $this->created;
    }

    public function status():string{
        return $this->status;
    }

    public function email():?string{
        return $this->email;
    }

    public function posReference():?string{
        return $this->posReference;
    }
}