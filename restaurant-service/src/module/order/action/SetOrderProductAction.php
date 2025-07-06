<?php
namespace src\module\order\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\order\service\SetOrderProductService;

class SetOrderProductAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetOrderProductService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('orderId'),
            $this->get('productId'),
            $this->get('price'),
            $this->get('note'),
            $this->get('quantity'),
            $this->get('hide')
        );
    }
}