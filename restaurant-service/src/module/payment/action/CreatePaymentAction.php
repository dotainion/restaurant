<?php
namespace src\module\payment\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\payment\service\CreatePaymentService;

class CreatePaymentAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CreatePaymentService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('orderId'),
            $this->get('email'),
            $this->get('posReference')
        );
    }
}