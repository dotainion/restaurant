<?php
namespace src\module\order\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\order\service\SetOrderDiscountService;

class SetOrderDiscountAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetOrderDiscountService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('discountId'),
            $this->get('productId'),
            $this->get('orderId'),
            $this->get('amount'),
            $this->get('type'),
            $this->get('note'),
            $this->get('hide')
        );
    }
}