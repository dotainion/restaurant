<?php
namespace src\module\discounts\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\discounts\service\ListDiscountsService;

class ListDiscountsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListDiscountsService();
    }

    public function execute(){
        return $this->service->process();
    }
}