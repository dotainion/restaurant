<?php
namespace src\module\order\service;

use src\infrastructure\Service;
use src\module\order\logic\ListOrders;
use src\module\order\logic\OrderRequirements;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;

class ListOrdersService extends Service{
    protected ListOrders $order;
    protected OrderRequirements $requirements;

    public function __construct(){
        parent::__construct();
        $this->order = new ListOrders();
        $this->requirements = new OrderRequirements();
    }
    
    public function process($id, $status, $createdById, $hide, $from, $to){
        $id = (new Id())->isValid($id) ? new Id($id) : null;
        $createdById = (new Id())->isValid($createdById) ? new Id($createdById) : null;
        $name = empty($name) ? null : $name;
        $status = empty($status) ? null : $status;
        $hide = (bool)$hide;
        $from = (new DateHelper())->isValid($from) ? new DateHelper($from) : null;
        $to = (new DateHelper())->isValid($to) ? new DateHelper($to) : null;

        $collector = $this->order->list($id, $createdById, $status, $hide, $from, $to);
        $this->requirements->appendToCollector($collector);

        $this->setOutput($collector);
        return $this;
    }
}