<?php
namespace src\module\order\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\order\service\SetOrderService;

class SetOrderAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetOrderService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('status'),
            $this->get('createdById'),
            $this->get('preference'),
            $this->get('tableNumber'),
            $this->get('note'),
            $this->get('hide')
        );
    }
}