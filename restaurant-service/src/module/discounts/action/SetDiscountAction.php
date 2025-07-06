<?php
namespace src\module\discounts\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\discounts\service\SetDiscountService;

class SetDiscountAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetDiscountService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('title'),
            $this->get('description'),
            $this->get('amount'),
            $this->get('start'),
            $this->get('end'),
            $this->get('type'),
            $this->get('hide')
        );
    }
}