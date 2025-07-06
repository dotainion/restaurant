<?php
namespace src\module\order\logic;

use src\module\order\repository\OrderRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;

class ListOrders{
    protected OrderRepository $repo;

    public function __construct(){
        $this->repo = new OrderRepository();
    }
    
    public function byId(Id $id):Collector{
        return $this->list($id);
    }
    
    public function list(
        ?Id $id=null, 
        ?Id $createdById=null, 
        null|string|array $status=null, 
        ?bool $hide=null, 
        ?DateHelper $from=null, 
        ?DateHelper $to=null
    ):Collector{
        return $this->repo->listOrders([
            'id' => $id,
            'status' => $status,
            'createdById' => $createdById,
            'hide' => $hide,
            'from' => $from,
            'to' => $to
        ]);
    }
}